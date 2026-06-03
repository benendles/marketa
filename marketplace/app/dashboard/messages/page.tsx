"use client";

import { useState } from "react";
import { mockConversations, mockUsers } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";

const me = mockUsers[1];

const demoMessages = [
  { id: "m1", content: "Hi! Is the camera still available?", senderId: "u2", createdAt: "2024-02-08T13:00:00Z" },
  { id: "m2", content: "Yes it is! Feel free to ask any questions.", senderId: "u1", createdAt: "2024-02-08T13:05:00Z" },
  { id: "m3", content: "Great. Can we meet this weekend for pickup?", senderId: "u2", createdAt: "2024-02-08T14:00:00Z" },
  { id: "m4", content: "Sure, I can do Saturday morning. Does 10am work?", senderId: "u1", createdAt: "2024-02-08T14:32:00Z" },
];

export default function MessagesPage() {
  const [activeConvo, setActiveConvo] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(demoMessages);

  const other = activeConvo.participants.find((p) => p.id !== me.id)!;

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, {
      id: `m${Date.now()}`,
      content: newMessage.trim(),
      senderId: me.id,
      createdAt: new Date().toISOString(),
    }]);
    setNewMessage("");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ height: "calc(100vh - 12rem)" }}>
      <div className="flex h-full">
        {/* Conversation list */}
        <div className="w-64 border-r border-slate-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((convo) => {
              const otherUser = convo.participants.find((p) => p.id !== me.id)!;
              const isActive = convo.id === activeConvo.id;
              return (
                <button
                  key={convo.id}
                  onClick={() => setActiveConvo(convo)}
                  className={`w-full text-left flex items-start gap-3 p-3 border-b border-slate-100 transition ${isActive ? "bg-indigo-50" : "hover:bg-slate-50"}`}
                >
                  <div className="relative flex-shrink-0">
                    <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-full" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium truncate ${isActive ? "text-indigo-700" : "text-slate-900"}`}>
                        {otherUser.name}
                      </p>
                      {convo.unreadCount > 0 && (
                        <span className="bg-indigo-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                          {convo.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {convo.lastMessage?.content}
                    </p>
                    {convo.listing && (
                      <p className="text-xs text-indigo-500 truncate mt-0.5">
                        📦 {convo.listing.title}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-200">
            <div className="relative">
              <img src={other.avatar} alt={other.name} className="w-9 h-9 rounded-full" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">{other.name}</p>
              <p className="text-xs text-emerald-600">Online</p>
            </div>
            {activeConvo.listing && (
              <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-xs text-slate-600">
                <img src={activeConvo.listing.images[0]} alt="" className="w-6 h-6 rounded object-cover" />
                {activeConvo.listing.title}
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => {
              const isMine = msg.senderId === me.id;
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : ""}`}>
                  {!isMine && (
                    <img src={other.avatar} alt={other.name} className="w-7 h-7 rounded-full flex-shrink-0" />
                  )}
                  <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${isMine ? "bg-indigo-600 text-white rounded-br-sm" : "bg-slate-100 text-slate-900 rounded-bl-sm"}`}>
                    {msg.content}
                  </div>
                  <span className="text-xs text-slate-400">{formatRelativeTime(msg.createdAt)}</span>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-slate-200 flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            />
            <button
              type="button"
              className="px-3 py-2.5 text-slate-400 hover:text-slate-600 transition text-lg"
              title="Attach file"
            >
              📎
            </button>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              Send →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
