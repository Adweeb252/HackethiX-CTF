const Flag = () => {
  const api = {
    title: "Event Details",
    date: "2024-10-06",
    location: "Virtual",
    participants: [
      {
        name: "Alice",
        role: "Contestant",
      },
      {
        name: "Bob",
        role: "Judge",
      },
    ],
    metadata: {
      description:
        "This is a CTF challenge event for testing cybersecurity skills.",
      j$0n_h34d3r: "ctf{Savory_Surprise}",
    },
  };
  // const api = "CTF{h1dd3n_1n_pl41n_s1ght}";

  return (
    // <div>
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <pre>{JSON.stringify(api, null, 2)}</pre>
    </div>
  );
};

export default Flag;
