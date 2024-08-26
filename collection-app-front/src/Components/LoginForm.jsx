import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm({ setUser }) {
  const API_URL = "https://collectionapi-5w1t.onrender.com";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };

    const allUsers = await getAllUsers();
    const usersArr = allUsers.users;

    let userFound = false;

    for (let i = 0; i < usersArr.length; i++) {
      if (usersArr[i].username === username) {
        userFound = true;

        if (usersArr[i].password === password) {
          setUser(usersArr[i]);
          navigate("/home");
          return;
        } else {
          alert("Incorrect username or password.");
          return;
        }
      }
    }

    if (!userFound) {
      alert("Incorrect username or password.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
      <h3>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")}>Sign up!</button>
      </h3>
    </div>
  );
}

export default LoginForm;
