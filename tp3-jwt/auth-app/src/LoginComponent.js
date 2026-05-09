import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post("/api/login?name=" + name)
      .then(res => {
        if (res.data.response === true) {
          navigate("/home");
        } else {
          setError("Login failed ❌");
        }
      })
      .catch(err => {
        console.log(err);
        setError("Server error ❌");
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
    </div>
  );
};

export default LoginComponent;