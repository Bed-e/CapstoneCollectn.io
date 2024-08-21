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
import axios from "axios";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchUserItems = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:3003/users/${user._id}`
          );
          const userItems = response.data.user.owns;

          const itemDetails = await Promise.all(
            userItems.map(async (id) => {
              const itemResponse = await axios.get(
                `http://localhost:3003/items/${id}`
              );
              return itemResponse.data;
            })
          );
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
    setItems([]); // Optionally clear items state
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
                  <WelcomeUser username={user.username} />
                  <ItemAddForm
                    setItems={setItems}
                    items={items}
                    userId={user._id}
                  />
                  <Filters />
                  <ItemList items={items} />
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
