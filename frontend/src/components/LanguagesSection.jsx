import React from 'react';
import { Languages, Globe2, CheckCircle2 } from 'lucide-react';

export default function LanguagesSection({ languages }) {
  if (!languages || languages.length === 0) return null;

  return (
    <section id="languages" className="py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-3">
            <Languages className="w-3.5 h-3.5 text-blue-600" />
            <span>Multilingual Competencies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Language Proficiencies
          </h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            Native and international language capabilities with certified proficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {languages.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Globe2 className="w-5 h-5" />
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1.5">
                  {item.language}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.proficiency}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified in CV</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
