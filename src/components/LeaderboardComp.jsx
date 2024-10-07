const LeaderboardComp = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-gray-300 p-5 mb-6">Leaderboard</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full bg-gray-900">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Thon ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                <td className="px-6 py-4 text-white">{index + 1}</td>
                <td className="px-6 py-4 text-white">{user.name}</td>
                <td className="px-6 py-4 text-white">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardComp;
