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
import LogoutButton from "./Components/LogoutButton";
import DeleteAccountButton from "./Components/DeleteAccountButton";
import WelcomeUser from "./Components/WelcomeUser";
import SearchBar from "./Components/SearchBar";
import AddItemButton from "./Components/AddItemButton";
import ColorPicker from "./Components/ColorPicker";

import axios from "axios";

import "./App.css";
const apiURL = "https://collectionapi-5w1t.onrender.com";

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [sortKey, setSortKey] = useState("alphabetical");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [color1, setColor1] = useState("#DFDFDF"); // Default color1
  const [color2, setColor2] = useState("#ffffff"); // Default color2

  useEffect(() => {
    // Apply the colors as CSS variables
    document.documentElement.style.setProperty("--primary-color", color1);
    document.documentElement.style.setProperty("--secondary-color", color2);

    const fetchUserItems = async () => {
      if (user) {
        try {
          // Fetch the user's owned item IDs
          const response = await axios.get(`${apiURL}/users/${user._id}`);
          const userItems = response.data.user.owns; // Array of item IDs
          //console.log(userItems);

          const itemDetails = [];
          for (let i = 0; i < userItems.length; i++) {
            //console.log(`userItems[${i}]= ${userItems[i]}`);
            const res = await axios.get(`${apiURL}/items/${userItems[i]}`);
            const itemObj = res.data.item; //?
            // console.log(`object for the item: `);
            // console.log(itemObj);
            itemDetails.push(itemObj);
          }

          // Log the  array of item objects
          //console.log("Flattened itemDetails array:", itemDetails);

          setItems(itemDetails);
        } catch (error) {
          console.error("Error fetching user items:", error);
        }
      }
    };

    fetchUserItems();
  }, [user, color1, color2]);

  const handleLogout = () => {
    setUser(null); // Clear user state
  };
  const handleColor1Change = (newColor1) => {
    setColor1(newColor1);
    // Update CSS variables
    document.documentElement.style.setProperty("--primary-color", newColor1);
    // You can add more variables as needed
  };

  const handleColor2Change = (newColor2) => {
    setColor2(newColor2);
    // Update CSS variables
    document.documentElement.style.setProperty("--secondary-color", newColor2);
    // You can add more variables as needed
  };

  const handleDeleteAccount = async () => {
    //console.log("deleting account");
    //first delete all items
    //console.log(items);
    for (let i = 0; i < items.length; i++) {
      let id = items[i]._id;
      //console.log(id);
      await axios.delete(`${apiURL}/items/${id}`);
    }
    setItems([]);
    //console.log(user._id);
    await axios.delete(`${apiURL}/users/${user._id}`);
    handleLogout();
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              <div className="LoginForm">
                <div className="container">
                  <LoginForm setUser={setUser} />
                </div>
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="SignupForm">
                <div className="container">
                  <SignupForm setUser={setUser} />
                </div>
              </div>
            }
          />
          <Route
            path="/home"
            element={
              user ? (
                <div className="Home">
                  <div className="top-items-container">
                    <div className="top-left-items">
                      <WelcomeUser username={user.username} />
                      <ColorPicker
                        handleColor1Change={handleColor1Change}
                        handleColor2Change={handleColor2Change}
                      />
                    </div>

                    <div className="TopButtons">
                      <LogoutButton handleLogout={handleLogout} />
                      <DeleteAccountButton
                        handleDeleteAccount={handleDeleteAccount}
                      />
                    </div>

                    <div className="TopTitleContainer">
                      <TopTitle />
                      <AddItemButton
                        setShowForm={setShowForm}
                        showForm={showForm}
                      />
                    </div>

                    <SearchBar
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />

                    <div className="Filters">
                      <Filters setSortKey={setSortKey} />
                    </div>
                  </div>

                  {showForm && (
                    <div className="AddNewItemForm">
                      <ItemAddForm
                        setShowForm={setShowForm}
                        setItems={setItems}
                        items={items}
                        userId={user._id}
                      />
                    </div>
                  )}
                  <div className="ItemList">
                    <ItemList
                      sortKey={sortKey}
                      items={items}
                      setItems={setItems}
                      user={user}
                      showForm={showForm}
                      setShowForm={setShowForm}
                      searchTerm={searchTerm}
                    />
                  </div>
                </div>
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
