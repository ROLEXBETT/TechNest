import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import "../css/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! I'm the TechNest Assistant. Need help with a laptop issue or a purchase?", sender: "bot" }
  ]);
  
  const chatEndRef = useRef(null);

  // Knowledge Base derived from your spreadsheet
  const knowledgeBase = [
    { keys: ["ram", "memory", "slow"], response: "RAM upgrades can speed up multitasking. Ensure your motherboard supports the extra capacity and speed (MHz)." },
    { keys: ["ssd", "storage", "hard drive"], response: "Consider upgrading to an SSD for faster boot times or using cloud storage to free up local space." },
    { keys: ["battery", "charge", "power"], response: "Check your AC adapter and port for debris. If it drains fast, try lowering brightness or replacing the cell." },
    { keys: ["screen", "display", "monitor", "flickering"], response: "Try updating your graphics drivers. If it persists in the BIOS, it's likely a hardware loose connection." },
    { keys: ["wifi", "internet", "connection"], response: "Toggle Airplane mode or restart your router. Ensure the physical Wi-Fi switch on your laptop is ON." },
    { keys: ["blue screen", "bsod", "crash"], response: "BSODs are often driver-related. Note the 'Stop Code' provided to identify the specific fault." },
    { keys: ["buy", "purchase", "suggest", "recommend"], response: "For office work, aim for 16GB RAM and an i5/Ryzen 5. For gaming, look for a dedicated RTX GPU." },
    { keys: ["liquid", "spill", "water"], response: "Turn it off immediately! Unplug the battery and leave it upside down to dry for at least 48 hours." }
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    const lowerInput = input.toLowerCase();
    let botResponse = "I'm not sure about that. Try asking about RAM, battery, or laptop recommendations!";

    for (const item of knowledgeBase) {
      if (item.keys.some(key => lowerInput.includes(key))) {
        botResponse = item.response;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    }, 500);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Robot Icon - Positioned Left */}
      <div className={`chatbot-launcher ${isOpen ? 'hidden' : ''}`} onClick={() => setIsOpen(true)}>
        <FaRobot size={32} />
      </div>

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <span><FaRobot className="me-2" /> TechNest AI</span>
            <FaTimes onClick={() => setIsOpen(false)} style={{cursor: 'pointer'}} />
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.sender}`}>{m.text}</div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}><FaPaperPlane /></button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;