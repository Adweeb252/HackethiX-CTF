import LeaderboardComp from "../components/LeaderboardComp";
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch leaderboard data from Firestore
  useEffect(() => {
    const leaderboardRef = collection(db, "leaderboard");
    const q = query(leaderboardRef, orderBy("score", "desc")); // Order by score in descending order

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

    return () => unsubscribe(); // Unsubscribe from the Firestore snapshot listener when the component unmounts
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-gray-600">
      <LeaderboardComp data={leaderboard} />
    </div>
  );
}

export default Leaderboard;
