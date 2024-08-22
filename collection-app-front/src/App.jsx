import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ItemAddForm from "./Components/ItemAddForm";
import TopTitle from "./Components/TopTitle";
import Filters from "./Components/Filters";
import ItemList from "./Components/ItemList";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import WelcomeUser from "./Components/WelcomeUser";
import LogoutButton from "./Components/LogoutButton";
import DeleteAccountButton from "./Components/DeleteAccountButton";

import axios from "axios";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchUserItems = async () => {
      if (user) {
        try {
          // Fetch the user's owned item IDs
          const response = await axios.get(
            `http://localhost:3003/users/${user._id}`
          );
          const userItems = response.data.user.owns; // Array of item IDs
          console.log(userItems);

          // Fetch each item by its ID and flatten the result into a single array
          const itemDetails = [];
          for (let i = 0; i < userItems.length; i++) {
            //console.log(`userItems[${i}]= ${userItems[i]}`);
            const res = await axios.get(
              `http://localhost:3003/items/${userItems[i]}`
            );
            const itemObj = res.data; //?
            console.log(`object for the item: `);
            console.log(itemObj);
            itemDetails.push(itemObj);
          }

          // Log the flat array of item objects
          //console.log("Flattened itemDetails array:", itemDetails);

          // Set the items state with the flattened array
          setItems(itemDetails);
        } catch (error) {
          console.error("Error fetching user items:", error);
        }
      }
    };

    fetchUserItems();
  }, [user]);

  const handleLogout = () => {
    setUser(null); // Clear user state
  };

  const handleDeleteAccount = async () => {
    console.log("deleting account");
    //first delete all items
    //console.log(items);
    for (let i = 0; i < items.length; i++) {
      let id = items[i]._id;
      //console.log(id);
      await axios.delete(`http://localhost:3003/items/${id}`);
    }
    setItems([]);
    //console.log(user._id);
    await axios.delete(`http://localhost:3003/users/${user._id}`);
    handleLogout();
  };

  return (
    <Router>
      <div>
        <TopTitle />
        <Routes>
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route
            path="/home"
            element={
              user ? (
                <>
                  <LogoutButton handleLogout={handleLogout} />
                  <DeleteAccountButton
                    handleDeleteAccount={handleDeleteAccount}
                  />
                  <WelcomeUser username={user.username} />
                  <ItemAddForm
                    setItems={setItems}
                    items={items}
                    userId={user._id}
                  />
                  <Filters />
                  <ItemList items={items} setItems={setItems} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
