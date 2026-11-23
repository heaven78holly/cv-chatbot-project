import React from 'react';
import { Mail, MapPin, Globe, MessageSquare, ArrowDown, UserCheck } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export default function HeroSection({ personal, onOpenChat }) {
  if (!personal) return null;

  return (
    <section id="about" className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
          
          {/* Main Info */}
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open to Opportunities
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              {personal.name}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-blue-600">
              {personal.title}
            </p>

            {personal.location && (
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{personal.location}</span>
              </div>
            )}

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl pt-2">
              {personal.about}
            </p>

            {/* Social & Contact Quick Links */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Email</span>
                </a>
              )}
              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
              )}
              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-700 text-xs sm:text-sm font-medium transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {personal.website && (
                <a
                  href={personal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>Website</span>
                </a>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask AI About My Background</span>
              </button>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-sm transition-all"
              >
                <span>View Experience</span>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Profile Card / Avatar Graphic */}
          <div className="w-full md:w-auto flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-1 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <UserCheck className="w-10 h-10" />
                </div>
                <span className="font-semibold text-slate-800 text-sm">{personal.name}</span>
                <span className="text-xs text-slate-500 mt-1 line-clamp-1">{personal.title}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
