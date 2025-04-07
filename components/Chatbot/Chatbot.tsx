"use client";

import { useState } from "react";
import axios from "axios";
import '@/app/globals.css';
import { ArrowUp } from "lucide-react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
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
            <span className={`inline-block p-2 rounded ${msg.sender === "bot" ? "BotContainer text-white" : "SenderContainer text-white"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <input
          className="flex-1 rounded p-2 InputContainer"
          placeholder="Poser une question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition 
            ${input.trim() 
              ? "bg-white hover:bg-white text-black cursor-pointer" 
              : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </div>
  );
}
