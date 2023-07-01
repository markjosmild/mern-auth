import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const logoutUser = async () => {
    try {
      await axios.post("/logout");
      // Additional code if needed after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error if necessary
    }
  };
  return (
    <header className="bg-gray-900 py-4">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-semibold">
            MARKJS
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white">
                Home
              </Link>
            </li>

            {user && user.username ? (
              <li>
                <Link to="/login" className="text-white" onClick={logoutUser}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/register" className="text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
