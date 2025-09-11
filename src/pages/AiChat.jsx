import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { getAIResponse } from '../gemini';

const AiChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      // Culturally sensitive prompt for Indian youth
      const prompt = `You are Soul AI, an empathetic mental health assistant for Indian youth. Respond in a supportive, non-judgmental way, using Indian cultural references (e.g., exams, Diwali, family gatherings) to make responses relatable. Keep responses concise and under 100 words. User message: ${message}`;
      const response = await getAIResponse(prompt);
      setChatHistory([...chatHistory, { user: message, ai: response }]);
      setMessage('');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setChatHistory([...chatHistory, { user: message, ai: 'Sorry, I couldn’t process that. Try again?' }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 flex flex-col">
      <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">Soul AI Chat</h1>
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4">
        <div className="overflow-y-auto max-h-[60vh] mb-4">
          {chatHistory.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              Start by sharing how you feel! I'm here to listen.
            </p>
          )}
          {chatHistory.map((chat, index) => (
            <div key={index} className="mb-3">
              <p className="text-sm text-gray-600"><strong>You:</strong> {chat.user}</p>
              <p className="text-sm text-gray-800 bg-gray-100 p-3 rounded-lg"><strong>Soul AI:</strong> {chat.ai}</p>
            </div>
          ))}
          {loading && <p className="text-sm text-gray-500 text-center">Thinking...</p>}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="How are you feeling today?"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Not a substitute for professional help. Contact Vandrevala Foundation at 1860-266-2345 for support.
      </p>
    </div>
  );
};

export default AiChat;