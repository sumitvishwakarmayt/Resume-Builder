
import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="p-12 font-sans bg-white text-gray-900" style={{ minHeight: '29.7cm' }}>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-6xl font-extralight tracking-tighter">{personalInfo.name}</h1>
        <p className="text-2xl text-gray-500 font-light mt-1">{personalInfo.title}</p>
        <div className="flex space-x-6 text-sm text-gray-600 mt-4">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.website}</span>
        </div>
      </div>
      
      {/* Main content with a subtle line separator */}
      <div className="grid grid-cols-12 gap-10">
        {/* Left Column for Section Titles */}
        <div className="col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-10 mt-1">Summary</h2>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-10">Experience</h2>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500" style={{ marginTop: `${experience.length * 90}px` }}>Education</h2>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500" style={{ marginTop: `${education.length * 60 + 30}px` }}>Skills</h2>
        </div>

        {/* Right Column for Content */}
        <div className="col-span-9">
          <section className="mb-10">
            <p className="text-md leading-relaxed">{summary}</p>
          </section>

          <section className="mb-10">
            {experience.map(exp => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="text-sm text-gray-500">{exp.startDate} — {exp.endDate}</p>
                </div>
                <p className="text-md text-gray-600">{exp.title}</p>
                 <ul className="mt-2 text-sm space-y-1 text-gray-700">
                    {exp.description.split('\n').map((item, index) => item.trim() && <li key={index}>{item.replace(/•\s*/, '– ')}</li>)}
                 </ul>
              </div>
            ))}
          </section>

          <section className="mb-10">
            {education.map(edu => (
              <div key={edu.id} className="mb-4">
                 <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold">{edu.institution}</h3>
                    <p className="text-sm text-gray-500">{edu.startDate} — {edu.endDate}</p>
                </div>
                <p className="text-md text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </section>

          <section>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;
