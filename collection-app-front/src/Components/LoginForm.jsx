import { useState, React } from "react";
import axios from "axios";

function LoginForm({ setView, setUser }) {
  const API_URL = "http://localhost:3003";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    console.log(loginData);
    // Handle the login logic here

    // If successful, setUser and change view to "home"

    const allUsers = await getAllUsers();
    const usersArr = allUsers.users;
    console.log(usersArr);
    //loop through usersArr and check if usersArr[i].username matches username
    //if there are no matches, alert incorrect username or password
    //if there is a match in the username, check if usersArr[i].password is the same as password
    //if the password is wrong, alert incorrec username or password
    //if the password is also a match, setUser with the id of the correct user, which can be found with usersArr[i]._id where i is the index of the matching user
    // Initialize a variable to track if a user is found
    let userFound = false;

    // Loop through the users array
    for (let i = 0; i < usersArr.length; i++) {
      if (usersArr[i].username === username) {
        userFound = true;

        // Check if the password matches
        if (usersArr[i].password === password) {
          // If username and password match, log in the user
          const userId = usersArr[i]._id;
          setUser(userId);
          setView("home"); // Navigate to the home view
          return; // Exit the function as the user is logged in
        } else {
          // If the password is incorrect
          alert("Incorrect username or password.");
          return;
        }
      }
    }

    // If no user with the entered username is found
    if (!userFound) {
      alert("Incorrect username or password.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
      <h3>
        Don't have an account?{" "}
        <button onClick={() => setView("signup")}>Sign up!</button>
      </h3>
    </div>
  );
}

export default LoginForm;
