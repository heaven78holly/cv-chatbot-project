import React from 'react';
import { MessageSquare, Briefcase, GraduationCap, Code2, Mail, Sparkles } from 'lucide-react';

export default function Navbar({ personal, onOpenChat }) {
  const name = personal?.name || "My Portfolio";

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#about" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            {name.charAt(0) === '[' ? 'CV' : name.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
              {name}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
          <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          <a href="#education" className="hover:text-blue-600 transition-colors">Education</a>
          <a href="#achievements" className="hover:text-blue-600 transition-colors">Achievements</a>
          <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
          <a href="#languages" className="hover:text-blue-600 transition-colors">Languages</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </nav>

        {/* Action Button: Chat with AI */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenChat}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium transition-all border border-blue-200 hover:border-blue-300 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Ask AI Chatbot</span>
          </button>
        </div>
      </div>
    </header>
  );
}
