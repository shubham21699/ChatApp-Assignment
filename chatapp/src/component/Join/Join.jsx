import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

let user;

const Join = () => {
  const [name, setName] = useState("");
  //   user = name;

  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
  };

  return (
    <div className="JoinPage">
      <Fade top>
        <div className="JoinContainer">
          <h1>Welcome</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your Name"
            id="joinInput"
          />
          <Link
            onClick={(e) => (!name ? e.preventDefault() : null)}
            to="/chat"
            // target="_blank"
          >
            <button onClick={sendUser} className="submit-btn">
              Start Chatting
            </button>
          </Link>
        </div>
      </Fade>
    </div>
  );
};

export default Join;
export { user };
