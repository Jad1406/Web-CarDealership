import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your car assistant. How can I help you with your car today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponse = async (message) => {
    try {
      const response = await fetch('http://localhost:9000/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return "Sorry, I'm having trouble connecting to the car knowledge base.";
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    const botResponse = await getResponse(userMessage.text);
    setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    setIsTyping(false);
  };

  const quickReplies = [
    "Maintenance schedule",
    "Tire care tips",
    "Electric vs gas cars",
    "Buying a new car",
    "Maintenance schedule",
    "Tire care tips",
    "Electric vs gas cars",
    "Buying a new car",
    "Tell me about BMW",
    "Best Toyota models",
    "Tesla charging tips"
  ];

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    const fakeEvent = { preventDefault: () => {} };
    sendMessage(fakeEvent);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button 
          onClick={toggleChat}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all duration-300"
        >
          <span className="text-xl mr-2">🚗</span>
          <span>Car Assistant</span>
        </button>
      ) : (
        <div className="w-80 h-[500px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center">
              <span className="mr-2">🚗</span> 
              Car Assistant
            </h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 text-xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick replies */}
          {messages.length === 1 && (
            <div className="p-2 bg-gray-100 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-white hover:bg-gray-200 text-gray-800 font-medium px-3 py-1 rounded-full border border-gray-300 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input form */}
          <form 
            onSubmit={sendMessage}
            className="p-3 border-t border-gray-200 bg-white flex"
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask about cars..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;