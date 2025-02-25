import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./chatbox.css";

// const socket = io("http://localhost:5000");

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([
    { id: 1, name: "Alice", phone: "+1234567890" },
    { id: 2, name: "Bob", phone: "+1987654321" },
  ]);

  // useEffect(() => {
  //   socket.on("newMessage", (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   return () => socket.off("newMessage");
  // }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      await axios.post("http://localhost:5000/send-message", {
        phone: selectedChat.phone,
        message: newMessage,
      });
      setMessages((prev) => [...prev, { sender: "You", text: newMessage }]);
      setNewMessage("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  return (
    <div className="whatsapp-container">
      <div className="chat-sidebar">
        <h3>Chats</h3>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChat?.id === chat.id ? "chat-active" : ""}`}
            onClick={() => setSelectedChat(chat)}
          >
            {chat.name}
          </div>
        ))}
      </div>

      <div className="chat-window">
        <div className="chat-header">
          {selectedChat ? selectedChat.name : "Select a chat"}
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
