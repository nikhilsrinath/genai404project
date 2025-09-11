import React, { useState } from 'react';
import { Mic, MessageSquare, Send, X, Bot, User, Home, Calendar, BarChart3, Heart } from 'lucide-react';
import { getAIResponse } from '../gemini';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Soul Wellness</h1>
          </div>
          
          
        </div>
      </div>
    </nav>
  );
};

const AiBot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const userName = 'Friend';

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const prompt = `You are Soul AI, an empathetic mental health assistant for Indian youth. Respond in a supportive, non-judgmental way, using Indian cultural references (e.g., exams, Diwali, family gatherings) to make responses relatable. Keep responses concise and under 100 words. User message: ${message}`;
      const response = await getAIResponse(prompt);
      setChatHistory([...chatHistory, { user: message, ai: response }]);
      setMessage('');
    } catch (error) {
      setChatHistory([...chatHistory, { user: message, ai: 'Sorry, I couldn’t process that. Try again?' }]);
    }
    setLoading(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleMicClick = () => {
    alert('Voice chat is coming soon! For now, try typing your thoughts.');
  };

  // If chat is open, show only the chat interface
  if (isChatOpen) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 pt-20 px-4 pb-12">
          {/* Chat Header */}
          <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Soul AI</h1>
                <p className="text-sm text-gray-600">Your wellness companion</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {chatHistory.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="text-white" size={32} />
                </div>
                <p className="text-gray-600 mb-2">Hello {userName}! I'm here to listen.</p>
                <p className="text-sm text-gray-500">Share what's on your mind today</p>
              </div>
            )}
            
            {chatHistory.map((chat, index) => (
              <div key={index} className="space-y-3">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-2xl rounded-br-none max-w-xs shadow-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <User size={16} />
                      <span className="text-sm font-medium">You</span>
                    </div>
                    <p className="text-sm">{chat.user}</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-bl-none max-w-xs shadow-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot size={16} className="text-purple-500" />
                      <span className="text-sm font-medium text-purple-600">Soul AI</span>
                    </div>
                    <p className="text-sm text-gray-700">{chat.ai}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none max-w-xs shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-2xl px-4 py-2 shadow-lg">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Type your message here..."
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !message.trim()}
                className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            Not a substitute for professional help. Contact Vandrevala Foundation at 1860-266-2345 for support.
          </p>
        </div>
      </>
    );
  }

  // Main landing page when chat is closed
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 pt-20 p-4 pb-8">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:rotate-12 transition-transform duration-500">
              <Bot className="text-white" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Soul AI
            </h1>
            <p className="text-xl text-gray-600 mb-2">Your Personal Wellness Companion</p>
            <p className="text-gray-500">Always here to listen, always here to help</p>
          </div>

          {/* Welcome Message */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-xl animate-fade-in-up mx-auto max-w-2xl" style={{animationDelay: '0.2s'}}>
            <p className="text-lg text-gray-700 text-center">
              Welcome back, <span className="font-semibold text-purple-600">{userName}</span>! 
              How would you like to connect today?
            </p>
          </div>

          {/* Interactive Options Grid - Now in a row */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            {/* Voice Chat Option */}
            <div
              onClick={handleMicClick}
              className="flex-1 max-w-md group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-purple-200"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mic className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Voice Chat</h3>
              <p className="text-gray-600 text-sm text-center">Talk freely and let me listen</p>
              <div className="mt-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-1 text-xs text-purple-600 font-medium text-center mx-auto w-fit">
                Coming Soon
              </div>
            </div>

            {/* Text Chat Option */}
            <div
              onClick={toggleChat}
              className="flex-1 max-w-md group bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">Text Chat</h3>
              <p className="text-white/80 text-sm text-center">Type your thoughts and feelings</p>
              <div className="mt-4 bg-white/20 rounded-full px-4 py-1 text-xs text-white font-medium text-center mx-auto w-fit">
                Available Now
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-up mx-auto max-w-4xl" style={{animationDelay: '0.6s'}}>
            {[
              { icon: '🔒', title: 'Private', desc: 'Your conversations stay confidential' },
              { icon: '🌙', title: '24/7', desc: 'Always available when you need' },
              { icon: '❤️', title: 'Caring', desc: 'Non-judgmental support always' }
            ].map((feature, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center group hover:bg-white transition-all duration-300">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Footer Disclaimer */}
          <div className="animate-fade-in-up text-center" style={{animationDelay: '0.8s'}}>
            <p className="text-xs text-gray-500">
              Not a substitute for professional help. Contact Vandrevala Foundation at 1860-266-2345 for support.
            </p>
          </div>
        </div>

        {/* Floating Animation */}
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
};

export default AiBot;