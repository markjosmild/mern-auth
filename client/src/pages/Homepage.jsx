import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Homepage() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Home Page</h1>
      <p className="text-white text-lg">
        Welcome to the home page{" "}
        {user && user.username ? user.username : "Visitor"}!
      </p>
    </div>
  );
}

export default Homepage;
