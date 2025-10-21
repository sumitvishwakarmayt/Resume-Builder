import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="font-sans flex bg-white" style={{ minHeight: '1122.5px' }}>
      {/* Left Column (Sidebar) */}
      <div className="bg-slate-800 text-white w-1/3 p-8">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight">{personalInfo.name}</h1>
            <p className="text-lg text-slate-300 mt-2">{personalInfo.title}</p>
        </div>

        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-indigo-500 pb-1 mb-3">Contact</h2>
                <ul className="text-sm space-y-2 text-slate-300">
                    <li><span className="font-semibold">E:</span> {personalInfo.email}</li>
                    <li><span className="font-semibold">P:</span> {personalInfo.phone}</li>
                    <li><span className="font-semibold">A:</span> {personalInfo.location}</li>
                    <li><span className="font-semibold">W:</span> {personalInfo.website}</li>
                </ul>
            </div>
            <div>
                <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-indigo-500 pb-1 mb-3">Skills</h2>
                <ul className="text-sm list-disc list-inside space-y-1 text-slate-300">
                    {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
            </div>
            <div>
                <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-indigo-500 pb-1 mb-3">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3">
                        <h3 className="text-md font-bold">{edu.degree}</h3>
                        <p className="text-sm text-slate-400">{edu.institution}</p>
                        <p className="text-xs text-slate-400">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Right Column (Main Content) */}
      <div className="w-2/3 p-10 text-gray-800">
        <div className="mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-700 border-b-4 border-gray-300 pb-2 mb-4">Summary</h2>
          <p className="text-md leading-relaxed">{summary}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-700 border-b-4 border-gray-300 pb-2 mb-4">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="text-lg text-gray-600 font-medium">{exp.company}</p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1 text-gray-600">
                 {exp.description.split('\n').map((item, index) => item.trim() && <li key={index}>{item.replace(/•\s*/, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;