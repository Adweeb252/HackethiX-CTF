import LeaderboardComp from "../components/LeaderboardComp";
import { FormDataContext } from "../Context/formContext";
import React, { useState, useEffect, useContext } from "react";
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
  // const leaderboardData = [
  //   { id: 1000, name: "Team 1", points: 150 },
  //   { id: 1001, name: "Team 2", points: 130 },
  //   { id: 1002, name: "Team 3", points: 130 },
  //   { id: 1003, name: "Team 4", points: 120 },
  //   { id: 1004, name: "Team 5", points: 120 },
  //   { id: 1005, name: "Team 6", points: 120 },
  // ];
  const { formData } = useContext(FormDataContext);
  const [leaderboard, setLeaderboard] = useState(() => {
    // Load leaderboard from local storage
    const storedLeaderboard = localStorage.getItem("leaderboard");
    return storedLeaderboard ? JSON.parse(storedLeaderboard) : [];
  });
  const [startTime] = useState(Date.now());

  // Update local storage whenever the leaderboard changes
  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  // Function to calculate decaying multiplier as time passes
  const getMultiplier = () => {
    const timePassed = Date.now() - startTime;
    const decayConstant = 0.000256; // You can adjust this constant to make the decay faster/slower
    return 1 / (1 + decayConstant * timePassed);
  };
  useEffect(() => {
    if (formData) {
      console.log("Form data received in Leaderboard:", formData);
      // Add logic here to update the leaderboard with formData
    } else {
      console.log("No form data received yet.");
    }
    if (formData) {
      const { eventId, teamName, flag } = formData;
      const flagIndex = flags.findIndex((f) => f.flag === flag);
      if (flagIndex === -1) {
        return;
      }

      const flagScore = flags[flagIndex].score;
      const multiplier = getMultiplier();

      setLeaderboard((prev) => {
        const teamIndex = prev.findIndex((t) => t.teamName === teamName);

        if (teamIndex >= 0) {
          // Team already exists
          const team = prev[teamIndex];

          // Check if the flag has already been submitted
          if (team.flagsSubmitted[flagIndex].submitted) {
            return prev; // Don't update the leaderboard
          }
          // Update team score and mark flag as submitted
          team.score += flagScore * multiplier;
          team.flagsFound += 1;
          team.flagsSubmitted[flagIndex] = {
            submitted: true,
            submissionTime: Date.now(), // Mark submission time
          };
        } else {
          // New team, add them to the leaderboard
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
            submissionTime: Date.now(), // Mark submission time
          };
          prev.push(newTeam);
        }

        // Sort leaderboard by score, then by flags found
        return [...prev].sort((a, b) => {
          if (b.score === a.score) {
            return b.flagsFound - a.flagsFound;
          }
          return b.score - a.score;
        });
      });
    }
  }, [formData]);
  return (
    <div className="h-[100vh] w-[100vw] bg-gray-600">
      <LeaderboardComp data={leaderboard} />
    </div>
  );
}

export default Leaderboard;
