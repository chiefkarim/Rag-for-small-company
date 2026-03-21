import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, User, Bot, Loader2 } from 'lucide-react';
import { useChatStore } from '../stores/chatStore';
import { Markdown } from './Markdown';
import { useChatStream } from '../hooks/useChatStream';

export const ChatModule: React.FC = () => {
  const { messages, clearChat } = useChatStore();
  const { sendMessage, isLoading } = useChatStream();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    setInput('');
    await sendMessage(currentInput);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto rounded-[2rem] border border-border/50 bg-card overflow-hidden shadow-2xl shadow-primary/5">
      <div className="px-8 py-6 border-b border-border/50 flex justify-between items-center bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-serif italic text-lg text-foreground">AI Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 text-muted-foreground/40 hover:text-red-500 transition-colors"
          title="Clear chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-[0.98]"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center animate-bounce duration-[3000ms]">
              <Bot className="w-10 h-10 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-serif italic text-foreground mb-2">Greetings</p>
              <p className="text-sm text-muted-foreground font-light max-w-xs mx-auto">
                How can I assist your team's knowledge discovery today?
              </p>
            </div>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-4 ${
              m.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
              m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-primary'
            }`}>
              {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`flex flex-col space-y-2 max-w-[80%] ${
              m.role === 'user' ? 'items-end' : ''
            }`}>
              <div className={`p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                m.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-background text-foreground rounded-tl-none border border-border/50'
              }`}>
                {m.role === 'user' ? (
                  m.content
                ) : (
                  m.content ? <Markdown content={m.content} /> : (isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />)
                )}
              </div>
              <span className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em] font-medium px-2">
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-secondary/20 border-t border-border/50">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Type your message..."
            className="w-full bg-background border border-border/50 rounded-2xl py-5 pl-6 pr-16 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-light shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-3 bottom-3 px-5 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0 transition-all"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  );
};
