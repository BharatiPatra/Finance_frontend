'use client';

import { useState, ReactElement } from 'react';
import { Target, DollarSign, Info, User, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button"
import { SectionTitle } from '../../components/common/helper';

interface Strategy {
  name: string;
  icon: ReactElement;
  summary: string;
  roi: string;
  risk: string;
  aiInsight: string;
}

interface Performer {
  id: number;
  name: string;
  roi: string;
  risk: string;
  followers: string;
  desc: string;
}

interface Chatroom {
  id: number;
  name: string;
  members: number;
  lastMessage: string;
}

interface ChatMessage {
  type: 'user' | 'community';
  sender: string;
  text: string;
}

const SocialCopyInvesting = () => {
  const [activeTab, setActiveTab] = useState<'strategies' | 'performers' | 'chatrooms'>('strategies');

  const dummyStrategies: Strategy[] = [
    {
      name: 'Long-Term Value Investing',
      icon: <Target size={24} />,
      summary: 'Focuses on undervalued companies for long-term growth.',
      roi: 'Avg. 12-15% annually',
      risk: 'Moderate',
      aiInsight: 'This strategy has historically performed well during economic downturns.',
    },
    {
      name: 'High-Dividend Yield Portfolio',
      icon: <DollarSign size={24} />,
      summary: 'Invests in companies with consistent dividend payouts.',
      roi: 'Avg. 8-10% (Income + Growth)',
      risk: 'Low to Moderate',
      aiInsight: 'Ideal for stable income generation, but less capital appreciation.',
    },
  ];

  const dummyPerformers: Performer[] = [
    {
      id: 1,
      name: 'InvestGuru',
      roi: '+45% (2 Years)',
      risk: '4/10 (Moderate)',
      followers: '1.2K',
      desc: 'Focuses on mid-cap IT stocks and balanced mutual funds.',
    },
    {
      id: 2,
      name: 'GrowthSeeker',
      roi: '+30% (1 Year)',
      risk: '7/10 (High)',
      followers: '800',
      desc: 'Aggressive growth in tech and emerging sectors.',
    },
  ];

  const dummyChatrooms: Chatroom[] = [
    {
      id: 1,
      name: 'Indian Equity Discussion',
      members: 250,
      lastMessage: 'Any thoughts on XYZ share?',
    },
    {
      id: 2,
      name: 'Mutual Fund SIP Strategies',
      members: 120,
      lastMessage: 'ELSS funds are great for tax saving.',
    },
  ];

  const dummyChatMessages: ChatMessage[] = [
    {
      type: 'user',
      sender: 'You',
      text: 'Hi everyone, any good resources for beginner investors?',
    },
    {
      type: 'community',
      sender: 'InvestMentor',
      text: 'Check out Zerodha Varsity, it has great modules for beginners!',
    },
    {
      type: 'community',
      sender: 'GrowthSeeker',
      text: 'Yeah, also follow some financial news channels for market updates.',
    },
  ];

  return (
    <div className="p-6">
      <SectionTitle>Social & Copy Investing</SectionTitle>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'strategies'
              ? 'border-b-2 border-slate-900 text-slate-900'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('strategies')}
        >
          Discover Strategies
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'performers'
              ? 'border-b-2 border-slate-900 text-slate-900'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('performers')}
        >
          Top Performers
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'chatrooms'
              ? 'border-b-2 border-slate-900 text-slate-900'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('chatrooms')}
        >
          Chatrooms
        </button>
      </div>

      {activeTab === 'strategies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyStrategies.map((strategy) => (
            <Card key={strategy.name}>
              <div className="flex items-center mb-3">
                {strategy.icon}
                <h3 className="ml-3 text-xl font-semibold text-gray-800">{strategy.name}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">{strategy.summary}</p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-medium">Typical ROI:</span> {strategy.roi}
              </p>
              <p className="text-gray-700 text-sm mb-3">
                <span className="font-medium">Risk Level:</span> {strategy.risk}
              </p>
              <p className="text-blue-700 text-xs flex items-center bg-blue-50 p-2 rounded-md">
                <Info size={14} className="mr-1" />
                <span className="font-medium">AI Insight:</span> {strategy.aiInsight}
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="text-sm py-1 px-3">
                  Learn More
                </Button>
                <Button variant="secondary" className="text-sm py-1 px-3">
                  Simulate Strategy
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'performers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyPerformers.map((performer) => (
            <Card key={performer.id}>
              <div className="flex items-center mb-3">
                <User size={40} className="rounded-full bg-gray-200 p-2 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{performer.name}</h3>
                  <p className="text-sm text-gray-600">{performer.followers} Followers</p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Overall ROI:</span>{' '}
                <span className="text-green-600 font-bold">{performer.roi}</span>
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-medium">Risk Score:</span> {performer.risk}
              </p>
              <p className="text-gray-600 text-sm mb-4">{performer.desc}</p>
              <div className="flex gap-2">
                <Button variant="outline" className="text-sm py-1 px-3">
                  Copy Portfolio
                </Button>
                <Button variant="outline" className="text-sm py-1 px-3">
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'chatrooms' && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Available Chatrooms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummyChatrooms.map((room) => (
              <Card key={room.id}>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{room.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{room.members} members online</p>
                {room.lastMessage && (
                  <p className="text-xs text-gray-500 italic mb-3">
                    Last: "{room.lastMessage}"
                  </p>
                )}
                <Button variant="outline" className="text-sm py-1 px-3">
                  Join Room
                </Button>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">Sample Chat (Indian Equity Discussion)</h3>
          <Card className="h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-50 rounded-lg">
              {dummyChatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <span className="font-semibold text-xs">{msg.sender}:</span> {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Button>
                <Send size={18} />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SocialCopyInvesting;
