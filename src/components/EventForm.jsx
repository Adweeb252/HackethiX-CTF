import { useState, useContext } from "react";
import Leaderboard from "../pages/Leaderboard";
import { FormDataContext } from "../Context/formContext";

const EventForm = () => {
  const { setFormData } = useContext(FormDataContext);
  const [eventId, setEventId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [flag, setFlag] = useState("");
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

  // const handleFlagChange = (index, value) => {
  //   const updatedFlags = [...flags];
  //   updatedFlags[index] = value;
  //   setFlags(updatedFlags);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validFlag = flags.find((f) => f.flag === flag);

    if (!validFlag) {
      alert("Invalid flag. Please try again.");
      return; // Stop the form submission if the flag is invalid
    }
    const newFormData = {
      eventId,
      teamName,
      flag,
    };
    setFormData(newFormData); // Store the submitted data
    setEventId(""); // Clear the form fields after submission
    setTeamName("");
    setFlag("");
    console.log("Form Data Submitted:", newFormData);
  };

  return (
    <div className="max-w-lg mx-auto p-5    ">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-300">
        Submission Page
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div>
          <label
            htmlFor="eventId"
            className="block text-white font-medium mb-2"
          >
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
          <label
            htmlFor="teamName"
            className="block text-white font-medium mb-2"
          >
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
          <label className="block text-white font-medium mb-2">Flag</label>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Flag"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
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
