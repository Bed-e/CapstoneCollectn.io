import { React, useState } from "react";
import axios from "axios";

function SignupForm({ setView, setUser }) {
  const API_URL = "http://localhost:3003";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
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
    console.log(allUsers);

    // Variable to track if a match is found
    //console.log(`hello, userexists=${userExists}`);
    // Iterate through allUsers array

    for (let i = 0; i < allUsers.users.length; i++) {
      //   console.log(
      //     `checking if allUsers[${i}].username === username: ${allUsers.users[i].username} = ${username}?`
      //   );
      if (allUsers.users[i].username === username) {
        userExists = true;
        console.log(`userExists updated! userexists= ${userExists}`);
        break; // Exit the loop early if a match is found
      }
    }

    if (userExists) {
      alert("Username already exists. Please choose another one.");
    } else if (username.trim() === "" || password.trim() === "") {
      alert("username or password may not be blank");
    } else {
      const userData = { username, password };
      try {
        const newUser = await createUser(userData);
        console.log("User created:", newUser);

        const id = newUser.user._id;

        // Redirect or update the UI accordingly
        //
        //
        //
        setUser(id);
        setView("home");
        ///
        //
        //
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <h3>
        Already have an account?
        <button onClick={() => setView("login")}>Log in!</button>
      </h3>
    </div>
  );
}

export default SignupForm;
