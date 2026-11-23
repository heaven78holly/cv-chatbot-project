import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Heart, Users } from 'lucide-react';

export default function ExperienceSection({ experience, education, volunteering }) {
  const hasExp = experience && experience.length > 0;
  const hasEdu = education && education.length > 0;
  const hasVol = volunteering && volunteering.length > 0;

  return (
    <div className="py-16 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Education */}
        {hasEdu && (
          <section id="education">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Education
              </h2>
              <p className="mt-2 text-slate-500 text-sm sm:text-base">
                Academic foundation and department at Boğaziçi University.
              </p>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 sm:pl-10 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-0 before:w-0.5 before:bg-slate-200 last:before:hidden"
                >
                  <div className="absolute left-0 top-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-indigo-100 text-indigo-600 border-2 border-white shadow-sm flex items-center justify-center">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className="text-lg font-bold text-slate-900">
                        {item.degree}
                      </h3>
                      {item.graduation_year && (
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full w-fit">
                          {item.graduation_year}
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-semibold text-slate-700 mb-2">
                      {item.institution}
                    </div>

                    {item.details && (
                      <p className="text-slate-600 text-sm leading-relaxed mt-2">
                        {item.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Organizational Experience */}
        {hasExp && (
          <section id="experience">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Organizational & Extracurricular Experience
              </h2>
              <p className="mt-2 text-slate-500 text-sm sm:text-base">
                Leadership, student initiatives, alumni event operations, and university sports.
              </p>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {experience.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 sm:pl-10 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-0 before:w-0.5 before:bg-slate-200 last:before:hidden"
                >
                  <div className="absolute left-0 top-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-blue-100 text-blue-600 border-2 border-white shadow-sm flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.role}
                        </h3>
                        {item.category && (
                          <span className="text-xs font-medium text-slate-400">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full w-fit">
                        <Calendar className="w-3 h-3" />
                        <span>{item.start_date} – {item.end_date}</span>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <span>{item.organization}</span>
                      {item.location && (
                        <span className="text-slate-400 font-normal flex items-center gap-1 text-xs">
                          • <MapPin className="w-3 h-3" /> {item.location}
                        </span>
                      )}
                    </div>

                    {item.description && item.description.length > 0 && (
                      <ul className="space-y-2 mt-3 text-slate-600 text-sm">
                        {item.description.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold mt-0.5">•</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Volunteering Experience */}
        {hasVol && (
          <section id="volunteering">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Volunteering & Community Service
              </h2>
              <p className="mt-2 text-slate-500 text-sm sm:text-base">
                Civic contributions and active participation in international sporting events.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {volunteering.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {item.role}
                      </h3>
                      <div className="text-xs font-semibold text-slate-500">
                        {item.organization}
                      </div>
                    </div>
                  </div>

                  {item.description && item.description.length > 0 && (
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">
                      {item.description.join(' ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
