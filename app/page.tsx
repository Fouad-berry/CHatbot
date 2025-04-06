import ChatBox from "@/components/Chatbot/Chatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Chat avec LLM 🚀</h1>
      <ChatBox />
    </main>
  );
}
