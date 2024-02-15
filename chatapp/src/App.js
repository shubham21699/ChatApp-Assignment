import "./App.css";
import socketIO from "socket.io-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./component/Join/Join.jsx";
import Chat from "./component/Chat/Chat.jsx";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
