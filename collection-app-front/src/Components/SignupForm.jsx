import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupForm({ setUser }) {
  const API_URL = "https://collectionapi-5w1t.onrender.com";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate(); // Use the useNavigate hook
  let userExists = false;

  const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  };

  const createUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  };

  const handleSignUp = async (e) => {
    if (password !== password2) {
      alert("Passwords must match");
      return;
    }
    e.preventDefault();
    const allUsers = await getAllUsers();

    for (let i = 0; i < allUsers.users.length; i++) {
      if (allUsers.users[i].username.trim() === username.trim()) {
        userExists = true;
        break;
      }
    }

    if (userExists) {
      alert("Username already exists. Please choose another one.");
    } else if (username.trim() === "" || password.trim() === "") {
      alert("Username or password may not be blank");
    } else {
      const userData = { username, password };
      try {
        const newUser = await createUser(userData);
        //console.log("User created:", newUser);

        setUser(newUser.user); // Update the user state
        navigate("/home"); // Navigate to the home route
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="passwordWarning">
          note: do <strong>not</strong> use a password that you use on other
          sites.
          <br />
          Passwords on this site are <strong>exposed</strong>
        </p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <h3>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>Log in!</button>
      </h3>
    </div>
  );
}

export default SignupForm;
