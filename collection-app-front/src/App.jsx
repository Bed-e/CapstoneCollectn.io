import { useState } from "react";
import TopTitle from "./Components/TopTitle";
import Filters from "./Components/Filters";
import ItemList from "./Components/ItemList";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [view, setView] = useState("signup");

  return (
    <div>
      <TopTitle />
      {view === "login" && <LoginForm setView={setView} setUser={setUser} />}
      {view === "signup" && <SignupForm setView={setView} setUser={setUser} />}
      {view === "home" && (
        <>
          <Filters />
          <ItemList items={items} />
        </>
      )}
    </div>
  );
}

export default App;
