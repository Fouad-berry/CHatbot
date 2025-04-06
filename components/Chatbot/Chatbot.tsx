"use client";

import { useState } from "react";
import axios from "axios";
import '@/app/globals.css';

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  const sendMessage = async () => {
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      { content: input }
    );

    const botMessage = { sender: "bot", text: data.response };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-3 ChatbotContainer">
      <div className="h-96 overflow-y-auto border rounded-xl p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === "bot" ? "text-left" : "text-right"}`}>
            <span className={`inline-block p-2 rounded ${msg.sender === "bot" ? "bg-gray-100" : "bg-blue-500 text-white"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2 InputContainer"
          placeholder="Écrire un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="bg-blue-500 text-white rounded px-4 py-2 SendButton" onClick={sendMessage}>
          Envoyer
        </button>
      </div>
    </div>
  );
}
