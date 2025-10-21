import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const CorporateTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="p-10 font-sans text-gray-800 bg-white" style={{ minHeight: '1122.5px' }}>
      {/* Header */}
      <div className="text-left pb-4 mb-6">
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">{personalInfo.name}</h1>
        <p className="text-xl text-slate-600 mt-2 border-b-2 border-slate-300 pb-4">{personalInfo.title}</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Small Column (Contact/Skills) */}
        <div className="col-span-4 space-y-8">
            <div>
                <h2 className="font-serif text-lg font-bold uppercase tracking-wider text-slate-700 pb-1 mb-3 border-b border-slate-300">Contact</h2>
                <ul className="text-sm space-y-1 text-slate-600">
                    <li>{personalInfo.email}</li>
                    <li>{personalInfo.phone}</li>
                    <li>{personalInfo.location}</li>
                    <li>{personalInfo.website}</li>
                </ul>
            </div>
            <div>
                <h2 className="font-serif text-lg font-bold uppercase tracking-wider text-slate-700 pb-1 mb-3 border-b border-slate-300">Skills</h2>
                <ul className="text-sm space-y-1 text-slate-600">
                    {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
            </div>
            <div>
                <h2 className="font-serif text-lg font-bold uppercase tracking-wider text-slate-700 pb-1 mb-3 border-b border-slate-300">Education</h2>
                {education.map(edu => (
                <div key={edu.id} className="mb-3">
                    <h3 className="text-md font-semibold text-slate-800">{edu.degree}</h3>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
                    <p className="text-xs text-slate-500">{edu.startDate} - {edu.endDate}</p>
                </div>
                ))}
            </div>
        </div>

        {/* Right Main Column (Summary/Experience) */}
        <div className="col-span-8">
            <section className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-slate-800 pb-2 mb-3 border-b-2 border-slate-300">Summary</h2>
                <p className="text-md leading-relaxed text-slate-700">{summary}</p>
            </section>
            
            <section>
                <h2 className="font-serif text-2xl font-bold text-slate-800 pb-2 mb-3 border-b-2 border-slate-300">Experience</h2>
                {experience.map(exp => (
                <div key={exp.id} className="mb-6">
                    <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-semibold text-slate-800">{exp.title}</h3>
                    <p className="text-sm font-light text-slate-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-lg italic text-slate-600">{exp.company}</p>
                    <ul className="mt-2 text-sm space-y-1 pl-4 text-slate-700">
                    {exp.description.split('\n').map((item, index) => item.trim() && <li key={index} className="list-item list-disc">{item.replace(/•\s*/, '')}</li>)}
                    </ul>
                </div>
                ))}
            </section>
        </div>
      </div>
    </div>
  );
};

export default CorporateTemplate;
