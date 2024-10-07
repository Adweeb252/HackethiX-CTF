import { useState } from "react";

const EventForm = () => {
  const [eventId, setEventId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [flags, setFlags] = useState(Array(10).fill(""));

  const handleFlagChange = (index, value) => {
    const updatedFlags = [...flags];
    updatedFlags[index] = value;
    setFlags(updatedFlags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      eventId,
      teamName,
      flags,
    };
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-lg mx-auto p-5    ">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-300">Submission Page</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div>
          <label htmlFor="eventId" className="block text-white font-medium mb-2">
            Thon ID
          </label>
          <input
            type="text"
            id="eventId"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="teamName" className="block text-white font-medium mb-2">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Flags</label>
          {flags.map((flag, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                placeholder={`Flag ${index + 1}`}
                value={flag}
                onChange={(e) => handleFlagChange(index, e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                required
              />
            </div>
          ))}
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
