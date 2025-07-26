'use client';

import { useState } from 'react';
import { Loader2, Send, } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface Message {
  type: 'user' | 'ai';
  text: string;
}

const AiAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', text: 'Hello! How can I assist you with your finances today?' },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // --- Mock AI Response for Demo ---
    setTimeout(() => {
      let aiResponse = '';
      const lowerText = userMessage.text.toLowerCase();

      if (lowerText.includes('loan')) {
        aiResponse =
          "Based on your current income and expenses, taking a ₹50 lakh loan could significantly impact your monthly budget. An EMI for ₹50 lakh at 8.5% for 20 years would be approximately ₹43,391. This would increase your current monthly outgo by X%.";
      } else if (lowerText.includes('sip')) {
        aiResponse =
          "Increasing your monthly SIP for ABC Fund by ₹5,000 would have a substantial positive impact on your long-term wealth. Your projected corpus over 20 years could increase from ₹1.5 Cr to ₹2.1 Cr.";
      } else if (lowerText.includes('tax')) {
        aiResponse =
          "For tax savings, consider exploring options under Section 80C like ELSS mutual funds or PPF. Also, review your HRA and home loan interest deductions.";
      } else {
        aiResponse =
          "I'm still learning, but I can help with common financial queries like loan affordability, investment suggestions, or tax tips. What's on your mind?";
      }

      setMessages((prev) => [...prev, { type: 'ai', text: aiResponse }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4 shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 p-3 rounded-xl shadow-sm ${
                msg.type === 'user'
                  ? 'bg-slate-900 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
              {msg.type === 'ai' && msg.text.toLowerCase().includes('loan') && (
                <div className="mt-2 flex gap-2">
                  <Button variant="secondary" className="text-xs py-1 px-2">See EMI Calculator</Button>
                  <Button variant="secondary" className="text-xs py-1 px-2">Explore Loan Options</Button>
                </div>
              )}
              {msg.type === 'ai' && msg.text.toLowerCase().includes('sip') && (
                <div className="mt-2 flex gap-2">
                  <Button variant="secondary" className="text-xs py-1 px-2">Adjust SIP</Button>
                  <Button variant="secondary" className="text-xs py-1 px-2">Explore Other Funds</Button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && <Loader2 className="h-8 w-8 animate-spin" />}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your question or voice command..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSendMessage} className="p-3">
          <Send size={20} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <Button variant="secondary" className="text-sm py-1 px-3" onClick={() => setInput('Tax Savings Tips')}>Tax Savings Tips</Button>
        <Button variant="secondary" className="text-sm py-1 px-3" onClick={() => setInput('Improve Credit Score')}>Improve Credit Score</Button>
        <Button variant="secondary" className="text-sm py-1 px-3" onClick={() => setInput('Suggest Mutual Funds')}>Suggest Mutual Funds</Button>
      </div>
    </div>
  );
};

export default AiAgent;
