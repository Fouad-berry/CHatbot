import ChatBox from "@/components/Chatbot/Chatbot";
import "./globals.css";

export default function Home() {
  return (
    <main className="min-h-screen p-10 container">
      <h1 className="text-3xl font-semibold text-center mb-8 Title">Chatbot</h1>
      <ChatBox />
    </main>
  );
}
