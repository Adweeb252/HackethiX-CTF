import LeaderboardComp from '../components/LeaderboardComp';

function Leaderboard() {
  const leaderboardData = [
    { id: 1000, name: "Team 1", points: 150 },
    { id: 1001, name: "Team 2", points: 130 },
    { id: 1002, name: "Team 3", points: 130 },
    { id: 1003, name: "Team 4", points: 120 },
    { id: 1004, name: "Team 5", points: 120 },
    { id: 1005, name: "Team 6", points: 120 },
  ];

  return (
    <div className='h-[100vh] w-[100vw] bg-gray-600'>
      <LeaderboardComp data={leaderboardData} />
    </div>
  );
}

export default Leaderboard;
