import React from 'react';
import { Award, Trophy, Star } from 'lucide-react';

export default function AchievementsSection({ achievements }) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200 mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Honors & Recognition</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Academic Achievements & Awards
          </h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            National exam rankings and prestigious institutional recognitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-amber-50/40 via-white to-slate-50/80 rounded-2xl p-6 border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  {item.year && (
                    <span className="px-3 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs font-bold border border-amber-200">
                      {item.year}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-amber-100 flex items-center gap-1.5 text-xs font-medium text-amber-700">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Verified Official Academic Honor</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
