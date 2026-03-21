import { useState } from "react";
import { chatWithReviews } from "../api/reviewApi";

export default function ChatWithReviews() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendQuestion = async () => {

    if (!question.trim()) return;

    const userMsg = { type: "user", text: question };
    setMessages(prev => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await chatWithReviews({
        product_url: "",
        question: question
      });

      const botMsg = {
        type: "bot",
        text: res.data.answer
      };

      setMessages(prev => [...prev, botMsg]);

    } catch (err) {
      console.error(err);
    }

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">

      <h2 className="text-2xl font-bold mb-4">
        Chat With Reviews AI
      </h2>

      <div className="border rounded p-4 h-96 overflow-y-auto bg-gray-50">

        {messages.map((msg, i) => (
          <div key={i}
            className={`mb-2 ${
              msg.type === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <span className={`inline-block px-3 py-2 rounded ${
              msg.type === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}>
              {msg.text}
            </span>
          </div>
        ))}

        {loading && <p>Thinking...</p>}

      </div>

      <div className="flex mt-4 gap-2">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask about product reviews..."
        />

        <button
          onClick={sendQuestion}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>

      </div>

    </div>
  );
}
