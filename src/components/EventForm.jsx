import { useState, useContext } from "react";
import { FormDataContext } from "../Context/formContext";
import { getFirestore,setDoc,collection, getDocs,getDoc, addDoc, updateDoc, query, where, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const EventForm = () => {
  const { setFormData } = useContext(FormDataContext);
  const [eventId, setEventId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [flag, setFlag] = useState("");
  const flags = [
    { flag: "flag1", score: 100 },
    { flag: "flag2", score: 100 },
    { flag: "flag3", score: 100 },
    { flag: "flag4", score: 100 },
    { flag: "flag5", score: 100 },
    { flag: "flag6", score: 100 },
    { flag: "flag7", score: 100 },
    { flag: "flag8", score: 100 },
    { flag: "flag9", score: 100 },
    { flag: "flag10", score: 300 },
  ];

  const getMultiplier = async () => {
    const db = getFirestore();
    const docRef = doc(db, "multiplierData", "timestamp");
  
    // Attempt to fetch the start timestamp from Firestore
    const docSnapshot = await getDoc(docRef);
    let startTime;
  
    // Debugging logs
    console.log('Document Snapshot Exists:', docSnapshot.exists());
  
    // If the document exists, fetch the start timestamp
    if (docSnapshot.exists()) {
      startTime = docSnapshot.data().startTimestamp;
      console.log('Fetched start timestamp:', startTime);
    } else {
      // If it doesn't exist, set the current time as start timestamp
      startTime = Date.now(); // Current time in milliseconds
      await setDoc(docRef, { startTimestamp: startTime });
      console.log('No document found. Set start timestamp to:', startTime);
    }
  
    // Calculate the time passed and the multiplier
    const timePassed = Date.now() - startTime;
    const maxMultiplier = 1.0; // Starting multiplier
    const decayRate = 0.0000001; // The rate at which the multiplier decreases
  
    // Calculate the multiplier with linear decay
    let multiplier = maxMultiplier - decayRate * timePassed;
  
    // Ensure the multiplier does not go below a minimum value
    return multiplier > 0 ? multiplier : 0.000001; // Ensures multiplier is at least 0.000001
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validFlag = flags.find((f) => f.flag === flag);
    if (!validFlag) {
      alert("Invalid flag. Please try again.");
      return;
    }

    const flagIndex = flags.findIndex((f) => f.flag === flag);
    const flagScore = validFlag.score;
    const multiplier = await getMultiplier();

    try {
      const leaderboardRef = collection(db, "leaderboard");
      const teamQuery = query(leaderboardRef, where("eventId", "==", eventId));
      const querySnapshot = await getDocs(teamQuery);

      if (!querySnapshot.empty) {
        const teamDoc = querySnapshot.docs[0];
        const teamData = teamDoc.data();
        const teamDocId = teamDoc.id;

        if (!Array.isArray(teamData.flagsSubmitted)) {
          teamData.flagsSubmitted = Array(flags.length).fill({
            submitted: false,
            submissionTime: null,
          });
        }

        if (teamData.flagsSubmitted[flagIndex]?.submitted) {
          alert("Flag already submitted for this team!");
          return;
        }

        const newScore = (teamData.score ?? 0) + flagScore * multiplier;
        teamData.flagsSubmitted[flagIndex] = {
          submitted: true,
          submissionTime: Date.now(),
        };

        const teamDocRef = doc(db, "leaderboard", teamDocId);
        await updateDoc(teamDocRef, {
          score: newScore,
          flagsFound: (teamData.flagsFound || 0) + 1,
          flagsSubmitted: teamData.flagsSubmitted,
        });

      } else {
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
        newTeam.flagsSubmitted[flagIndex] = {
          submitted: true,
          submissionTime: Date.now(),
        };

        await addDoc(leaderboardRef, newTeam);
      }

      setFormData({ eventId, teamName, flag });
      setEventId("");
      setTeamName("");
      setFlag("");
      alert("Submission successful!");

    } catch (error) {
      console.error("Error submitting data to Firestore:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-300">Submission Page</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div>
          <label htmlFor="eventId" className="block text-white font-medium mb-2">Event ID</label>
          <input
            type="text"
            id="eventId"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="teamName" className="block text-white font-medium mb-2">Team Name</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="flag" className="block text-white font-medium mb-2">Flag</label>
          <input
            type="text"
            id="flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <button type="submit" className="w-full p-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-blue-700">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
