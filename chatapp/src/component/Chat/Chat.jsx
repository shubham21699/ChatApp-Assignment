import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import Message from "../Messages/Message.jsx";
import ReactScrollToBottom from "react-scroll-to-bottom";
import Fade from "react-reveal/Fade";

const ENDPOINT = "http://localhost:3500/";
let socket;

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = ""; // Make it empty after sending the message
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    // This will be executed as soon as the socket is connected
    socket.on("connect", () => {
      console.log("connected");
      setId(socket.id);
      // alert("Connected");
    });

    // Sending data through emit
    socket.emit("joined", { user, id });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatRoom">
      <Fade top>
        <div className="chatContainer">
          <div className="chatHeader">
            <p>Chat Room</p>
            <a href="/">
              <i class="fa">&#x2715;</i>
            </a>
          </div>
          <ReactScrollToBottom className="chatBox">
            {messages.map((item, i) => (
              <Message
                user={item.id === id ? "" : item.user}
                message={item.message}
                claass={item.id === id ? "right" : "left"}
              />
            ))}
            {/* <Message message={"Hey what are you doing"} /> */}
          </ReactScrollToBottom>
          <div className="inputBox">
            <input
              type="text"
              id="chatInput"
              placeholder="Type your message here"
              onKeyPress={(event) => event.key === "Enter" ? sendMessage() : null}
            ></input>
            <button onClick={sendMessage} className="send-btn">
              Send
            </button>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Chat;
