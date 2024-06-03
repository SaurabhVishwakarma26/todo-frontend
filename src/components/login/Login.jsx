import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setError(true);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{color:"red"}}>Error in authentication. Please check credentials..</p>}
      <div className="LoginForm">
        <div>
          <label>User Name : </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password : </label>
          <input
            type="password"
            name="username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" name="login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
