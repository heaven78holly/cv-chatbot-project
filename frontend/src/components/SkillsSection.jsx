import React from 'react';
import { Cpu, Code, Layers, Wrench, HeartHandshake } from 'lucide-react';

const categoryIcons = {
  office_productivity_tools: Layers,
  programming_and_tech: Code,
  core_business_interests: HeartHandshake,
  programming_languages: Code,
  frameworks_and_libraries: Layers,
  tools_and_platforms: Wrench,
  soft_skills: HeartHandshake,
};

const categoryLabels = {
  office_productivity_tools: 'Office & Productivity Tools',
  programming_and_tech: 'Programming & Technologies',
  core_business_interests: 'Core Business Interests',
  programming_languages: 'Programming Languages',
  frameworks_and_libraries: 'Frameworks & Libraries',
  tools_and_platforms: 'Tools & Platforms',
  soft_skills: 'Core Competencies & Soft Skills',
};

export default function SkillsSection({ skills }) {
  if (!skills || Object.keys(skills).length === 0) return null;

  return (
    <section id="skills" className="py-16 border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Skills & Technologies
          </h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            Technical proficiencies, frameworks, tools, and professional strengths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([categoryKey, skillList]) => {
            const Icon = categoryIcons[categoryKey] || Cpu;
            const label = categoryLabels[categoryKey] || categoryKey.replace(/_/g, ' ').toUpperCase();

            return (
              <div
                key={categoryKey}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">
                    {label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(skillList) ? (
                    skillList.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-colors shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-600 text-sm">{skillList}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
