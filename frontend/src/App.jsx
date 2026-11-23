import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AchievementsSection from './components/AchievementsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import LanguagesSection from './components/LanguagesSection';
import ContactSection from './components/ContactSection';
import ChatWidget from './components/ChatWidget';
import { fetchCVData } from './services/api';
import { Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchCVData();
        setCvData(data);
      } catch (err) {
        console.error('Error fetching CV:', err);
        setError(err.message || 'Failed to load CV data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium text-sm">Loading Pınar Hale Kara's CV Portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 mb-1">Could Not Load CV Data</h2>
          <p className="text-sm text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { 
    personal, 
    education, 
    achievements, 
    experience, 
    volunteering, 
    projects, 
    skills, 
    languages, 
    frequently_asked_questions 
  } = cvData || {};

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar 
        personal={personal} 
        onOpenChat={() => setIsChatOpen(true)} 
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection 
          personal={personal} 
          onOpenChat={() => setIsChatOpen(true)} 
        />

        <ExperienceSection 
          education={education} 
          experience={experience} 
          volunteering={volunteering} 
        />

        <AchievementsSection 
          achievements={achievements} 
        />

        <ProjectsSection 
          projects={projects} 
        />
        
        <SkillsSection 
          skills={skills} 
        />

        <LanguagesSection 
          languages={languages} 
        />

        <ContactSection 
          personal={personal} 
          faqs={frequently_asked_questions} 
        />
      </main>

      {/* AI Chatbot Widget */}
      <ChatWidget
        personal={personal}
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p>© {new Date().getFullYear()} {personal?.name || 'Pınar Hale Kara'}. Management Information Systems, Boğaziçi University.</p>
          <p>
            <a href="#about" className="text-blue-600 hover:underline">Back to top</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
