import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// 🔹 Ganti link ini dengan URL ngrok kamu
const socket = io("https://felicitously-paleontographical-annabel.ngrok-free.dev");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💬 Mindbridge Chat</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "200px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {chat.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan..."
          style={{ width: "70%", marginRight: "10px" }}
        />
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}

export default App;
