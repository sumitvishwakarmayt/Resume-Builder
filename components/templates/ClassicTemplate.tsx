
import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="p-10 font-serif text-gray-800 bg-white">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-400 pb-4 mb-6">
        <h1 className="text-5xl font-bold tracking-wider">{personalInfo.name}</h1>
        <p className="text-xl mt-2">{personalInfo.title}</p>
      </div>

      {/* Contact Info */}
      <div className="text-center text-sm mb-8">
        <span>{personalInfo.email}</span>
        <span className="mx-2">|</span>
        <span>{personalInfo.phone}</span>
        <span className="mx-2">|</span>
        <span>{personalInfo.location}</span>
        <span className="mx-2">|</span>
        <span>{personalInfo.website}</span>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Summary</h2>
        <p className="text-md leading-relaxed">{summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <p className="text-sm font-light">{exp.startDate} - {exp.endDate}</p>
            </div>
            <p className="text-md italic">{exp.company}</p>
            <ul className="list-disc list-inside mt-2 text-sm space-y-1 pl-2">
              {exp.description.split('\n').map((item, index) => item.trim() && <li key={index}>{item.replace(/•\s*/, '')}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">{edu.institution}</h3>
              <p className="text-sm font-light">{edu.startDate} - {edu.endDate}</p>
            </div>
            <p className="text-md italic">{edu.degree}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
        <p className="text-md leading-relaxed">
          {skills.join(' • ')}
        </p>
      </div>
    </div>
  );
};

export default ClassicTemplate;
