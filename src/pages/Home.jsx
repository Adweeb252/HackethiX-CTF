import ReactTypingEffect from "react-typing-effect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Content from "../components/Content";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    document.cookie =
      "debug_info=Q1RGe1BlcHBlcm9uaV9Qb3B9; path=/;";
  },);

  const notifySuccess = () =>
    toast.success("🎉 Flag Unlocked!! CTF{Cheesy_Nachos}");

  function logFlag() {
    console.log("Looking for flags? CTF{Crispy_Crust}");
  }

  setInterval(logFlag, 60000);

  // async function callbackend() {
  //   const res = await fetch("http://localhost:8000/api/status", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CTF-Flag": "CTF{h34d3r_sp0tt3r}",
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // }

  // callbackend();

  const secretButton = () => {
    // Increment the clicks state by 1
    setClicks(prevClicks => prevClicks + 1);

    // Check if clicks have reached or exceeded 20
    if (clicks + 1 >= 20) {
      notifySuccess();
    }
  };
  return (
    <div className="h-screen w-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        pauseOnFocusLoss={false}
      />

      <nav className="navbar">
        <h2 className="text-3xl text-gray-400 font-bold p-3 px-16">Hackethix CTF Challenge</h2>
        <div className="flex gap-3 p-3">
        <button
          className="login"
          onClick={() => {
            navigate("/submit");
          }}
        >
          Submit
        </button>

        <button
          className="login"
          onClick={() => {
            navigate("/leaderboard");
          }}
        >
          Leaderboard
        </button>

        <button
          className="login"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        </div>
      </nav>

      <main>
        <section>
          <h1 style={{ fontSize: "56px", padding: "10px" }}>
            <ReactTypingEffect
              text={["Are you ready!!", "Find 10 Flags to win the game!!"]}
              speed={75}
              eraseSpeed={50}
              cursor={"_"}
              className="text-cyan-400 font-bold font-mono italic"
            />
          </h1>

          <img src="ctf.jpeg" alt="" style={{ width: "100%" }} />

          <button onClick={secretButton}>WELCOME PLAYER,</button>
        </section>
        <Content />
      </main>
      <footer>
        <div>
          <h4>Follow Us</h4>
          <a href="https://linktr.ee/nsut.hackethix" target="_blank">
            <p>LinkedIn</p>
            <p>Youtube</p>
          </a>
        </div>
        <div>
          
          <a href="https://www.youtube.com/watch?v=3nz_F9Of9Uo&list=PL6mdr-ubH9l7qmfk_IuL7jV3scj_cHc1p">
          <h4>Join Our 3-Day Bootcamp</h4></a>
        </div>
        <div>
          <p>&copy; 2024 Hackethix Platform. All rights reserved. CTF&#123;Spicy_Salsa&#125;</p>
        </div>
      </footer>
    </div>
  );
}
export default App;
