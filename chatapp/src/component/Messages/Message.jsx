import React from "react";
import "./Message.css";

const Message = ({ user, message, claass }) => {
  if (user && user.length > 0 && message && message.length > 0) {
    return (
      <div className={`messageBox ${claass}`}>{`${user}: ${message}`}</div>
    );
  } else if (message && message.length > 0) {
    return <div className={`messageBox ${claass} `}>{`You: ${message}`}</div>;
  }
};

export default Message;
