import LeaderboardComp from "../components/LeaderboardComp";
import { FormDataContext } from "../Context/formContext";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

function Leaderboard() {
  const [flags] = useState([
    { flag: "flag1", score: 100 },
    { flag: "flag2", score: 100 },
    { flag: "flag3", score: 100 },
    { flag: "flag4", score: 100 },
    { flag: "flag5", score: 100 },
    { flag: "flag6", score: 100 },
    { flag: "flag7", score: 100 },
    { flag: "flag8", score: 100 },
    { flag: "flag9", score: 100 },
    { flag: "flag10", score: 100 },
  ]);

  const { formData } = useContext(FormDataContext);
  const hasSubmitted = useRef(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [startTime] = useState(Date.now());

  const getMultiplier = () => {
    const timePassed = Date.now() - startTime;
    const decayConstant = 0.000256;
    const multiplier = 1 / (1 + decayConstant * timePassed);
    return isNaN(multiplier) ? 1 : multiplier;
  };

  useEffect(() => {
    const updateLeaderboard = async () => {
      if (hasSubmitted.current || !formData) return;

      hasSubmitted.current = true; // Mark as submitted

      const { eventId, teamName, flag } = formData;
      const flagIndex = flags.findIndex((f) => f.flag === flag);

      if (flagIndex === -1) {
        console.error("Invalid flag submitted:", flag);
        hasSubmitted.current = false; // Reset for the next submission
        return;
      }

      const flagScore = Number(flags[flagIndex]?.score ?? 0);
      if (isNaN(flagScore)) {
        console.error("Invalid flagScore:", flagScore);
        hasSubmitted.current = false; // Reset for the next submission
        return;
      }

      const multiplier = getMultiplier();

      // Query Firestore to check if the team already exists
      const leaderboardRef = collection(db, "leaderboard");
      const teamQuery = query(
        leaderboardRef,
        // where("eventId", "==", eventId),
        where("teamName", "==", teamName)
      );
      const querySnapshot = await getDocs(teamQuery);
      console.log(querySnapshot.empty);
      console.log(querySnapshot.docs[0].id);

      let teamExists = false;
      let teamDocId = null;

      if (!querySnapshot.empty) {
        teamExists = true;
        const teamDoc = querySnapshot.docs[0];
        teamDocId = teamDoc.id;
        const teamData = teamDoc.data();

        // If flagsSubmitted is not an array, initialize it
        if (!Array.isArray(teamData.flagsSubmitted)) {
          console.warn(
            `flagsSubmitted is not an array for team: ${teamName}, initializing it...`
          );
          teamData.flagsSubmitted = Array(flags.length).fill({
            submitted: false,
            submissionTime: null,
          });
        }

        // Check if the flag has already been submitted
        if (teamData.flagsSubmitted[flagIndex]?.submitted) {
          console.warn("Flag already submitted for team:", teamName);
          hasSubmitted.current = false; // Reset for the next submission
          return; // Prevent duplicate flag submission
        }

        // Update the team score and flag submission status
        const currentScore = Number(teamData.score ?? 0);
        teamData.score = currentScore + flagScore * multiplier;
        teamData.flagsFound = (teamData.flagsFound || 0) + 1;

        // Ensure flagsSubmitted array is correctly initialized and updated
        teamData.flagsSubmitted[flagIndex] = {
          submitted: true,
          submissionTime: Date.now(),
        };

        // Update team in Firestore
        const teamDocRef = doc(db, "leaderboard", teamDocId);
        await updateDoc(teamDocRef, {
          score: teamData.score,
          flagsFound: teamData.flagsFound,
          flagsSubmitted: teamData.flagsSubmitted,
        });

        console.log("Team updated successfully:", teamData);
      }

      // If the team doesn't exist, add them
      if (!teamExists) {
        const newTeam = {
          eventId,
          teamName,
          score: flagScore * multiplier,
          flagsFound: 1,
          flagsSubmitted: Array(flags.length).fill({
            submitted: false,
            submissionTime: null,
          }),
        };

        // Initialize flagsSubmitted for the new team
        newTeam.flagsSubmitted[flagIndex] = {
          submitted: true,
          submissionTime: Date.now(),
        };

        await addDoc(leaderboardRef, newTeam);
        console.log("New team added successfully:", newTeam);
      }

      // Reset hasSubmitted for the next submission
      hasSubmitted.current = false;
    };

    updateLeaderboard().catch((error) => {
      console.error("Error updating leaderboard:", error);
      hasSubmitted.current = false;
    });
  }, [formData, flags]);

  useEffect(() => {
    const leaderboardRef = collection(db, "leaderboard");
    const q = query(leaderboardRef, orderBy("score", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const leaderboardData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeaderboard(leaderboardData);
        console.log("Leaderboard updated:", leaderboardData);
      },
      (error) => {
        console.error("Error fetching leaderboard data:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-gray-600">
      <LeaderboardComp data={leaderboard} />
    </div>
  );
}

export default Leaderboard;
