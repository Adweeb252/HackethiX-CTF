import { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const notifySuccess = () =>
    toast.success("🎉 Flag Unlocked!! CTF{Tangy_Tacos}");

  const checkSQL = () => {
    if (email == "admin" && password == "' OR '1'='1") {
      notifySuccess();
    } else {
      console.log("No SQL Injection Detected");
      navigate("/");
    }
  };
  
  return (
    
    <div className="login-container">
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        pauseOnFocusLoss={false}
      />
      <h2>Login Form</h2>
      <form className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" id="login" onClick={checkSQL}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
