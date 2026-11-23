import React from 'react';
import { Mail, Phone, MapPin, Globe, HelpCircle } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export default function ContactSection({ personal, faqs }) {
  if (!personal) return null;

  return (
    <section id="contact" className="py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQs if provided */}
        {faqs && faqs.length > 0 && (
          <div className="mb-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-slate-500 text-sm">
                Quick answers regarding availability, relocation, and communication.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                        {faq.question}
                      </h4>
                      <p className="mt-1.5 text-slate-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            Interested in connecting or discussing an opportunity? Feel free to reach out directly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {personal.email && (
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400">Email</div>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
            )}


            {personal.location && (
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400">Location</div>
                  <span className="text-sm font-semibold text-slate-900">
                    {personal.location}
                  </span>
                </div>
              </div>
            )}

            {personal.linkedin && (
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400">LinkedIn</div>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    View LinkedIn Profile
                  </a>
                </div>
              </div>
            )}

            {personal.github && (
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400">GitHub</div>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    View GitHub Repositories
                  </a>
                </div>
              </div>
            )}

            {personal.website && (
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400">Personal Website</div>
                  <a
                    href={personal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {personal.website}
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
