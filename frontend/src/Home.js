import React, { useState} from "react";
import { Link } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function Home() {
  const loginData = localStorage.getItem("user") === "loggedIn";
  const [userLogin, setLogin] = useState(loginData);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default: Show all items

  const logoutUser = () => {
    localStorage.setItem("user", "loggedOut");
    setSelectedCategory("all");
    setLogin(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <div className="header">
        <div>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              fontSize: "25px",
              marginRight: "20px",
              color: "#0000000",
              fontWeight: "bold",
            }}
          >
            VJ College Store
          </Link>
        </div>
        {userLogin && (
          <div>
            <Link to="/addItem">
              <button>Add Item</button>
            </Link>
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
        {!userLogin && (
          <div>
            <Link
              to={"/register"}
              style={{
                textDecoration: "none",
                fontSize: "18px",
                marginRight: "20px",
                color: "#000000",
              }}
            >
              Register
            </Link>
            <Link
              to={"/login"}
              style={{
                textDecoration: "none",
                fontSize: "18px",
                color: "#000000",
              }}
            >
              Login
            </Link>
          </div>
        )}
        <div>
          <label htmlFor="category">Sort by Category: </label>
          <select
            id="category"
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={selectedCategory}
          >
            <option value="all">All</option>
            <option value="calci">Calci</option>
            <option value="apron">Clothing</option>
            <option value="drafter">Instruments</option>
            <option value="book">Books</option>
            <option value="laptop">Laptops</option>
            <option value="clock">Clocks</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>
      <div>
        <HomePage selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
