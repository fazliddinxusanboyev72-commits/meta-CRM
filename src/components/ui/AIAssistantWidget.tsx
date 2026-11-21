'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Assalomu alaykum! Men MetaITSchool AI ta'lim assistentiman 🚀. Dasturlash, kurslarimiz yoki vazifalar bo'yicha qanday yordam bera olaman?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: "Kechirasiz, javob olishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Server bilan bog'lanishda xatolik yuz berdi." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-purple via-primary-blue to-primary-cyan text-white shadow-glow hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-cyan"></span>
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[550px] max-h-[80vh] rounded-2xl border border-border bg-background-elevated shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 bg-background-panel border-b border-border/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-purple to-primary-cyan flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main flex items-center gap-1.5">
                  MetaAI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-primary-cyan" />
                </h4>
                <p className="text-[11px] text-status-success flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
                  Onlayn & Ta&apos;limga tayyor
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-text-secondary hover:text-text-main hover:bg-background-elevated transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-text-secondary hover:text-text-main hover:bg-background-elevated transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-primary-purple/20 border border-primary-purple/30 flex items-center justify-center text-primary-cyan flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-primary-purple to-primary-blue text-white rounded-br-xs'
                      : 'bg-background-panel border border-border text-text-main rounded-bl-xs'
                  }`}
                >
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-background-panel border border-border flex items-center justify-center text-text-secondary flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 items-center text-text-secondary text-xs">
                <div className="w-7 h-7 rounded-lg bg-primary-purple/20 border border-primary-purple/30 flex items-center justify-center text-primary-cyan flex-shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 bg-background-panel border border-border rounded-2xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-background-panel/50 border-t border-border/50 flex gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            <button
              onClick={() => {
                setInput('Qaysi kursni tanlashni maslahat berasiz?');
              }}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-background-elevated border border-border text-text-secondary hover:text-text-main hover:border-primary/40 transition-colors"
            >
              🎯 Kurs tanlash
            </button>
            <button
              onClick={() => {
                setInput('Next.js 14 App Router haqida gapirib bering');
              }}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-background-elevated border border-border text-text-secondary hover:text-text-main hover:border-primary/40 transition-colors"
            >
              ⚡️ Next.js 14
            </button>
            <button
              onClick={() => {
                setInput('Python va AI kursi narxi va davomiyligi qancha?');
              }}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-background-elevated border border-border text-text-secondary hover:text-text-main hover:border-primary/40 transition-colors"
            >
              💰 Kurs narxlari
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-background-panel border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Savolingizni yozing..."
              className="flex-1 bg-background-elevated border border-border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple"
            />
            <Button type="submit" size="sm" disabled={!input.trim() || isLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
