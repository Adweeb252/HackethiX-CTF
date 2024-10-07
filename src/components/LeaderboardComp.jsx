const LeaderboardComp = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-gray-300 p-5 mb-6">
        Leaderboard
      </h1>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full bg-gray-900">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Thon ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Flags Found
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((team, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
              >
                <td className="px-6 py-4 text-white">{index + 1}</td>
                <td className="px-6 py-4 text-white">{team.eventId}</td>
                <td className="px-6 py-4 text-white">{team.teamName}</td>
                <td className="px-6 py-4 text-white">
                  {team.score.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-white">{team.flagsFound}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardComp;
