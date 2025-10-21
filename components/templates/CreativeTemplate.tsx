import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="font-sans flex bg-white" style={{ minHeight: '1122.5px' }}>
      {/* Left Sidebar */}
      <div className="bg-teal-700 text-white w-1/3 p-8 flex flex-col">
        <div className="text-center mt-4">
          <div className="w-32 h-32 rounded-full bg-white mx-auto mb-4 border-4 border-teal-200 flex items-center justify-center text-teal-700">
            <span className="text-5xl font-bold">{personalInfo.name.charAt(0)}</span>
          </div>
          <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
          <p className="text-lg text-teal-200 mt-1">{personalInfo.title}</p>
        </div>

        <div className="mt-10 space-y-8">
          <div>
            <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-teal-400 pb-1 mb-3">Contact</h2>
            <ul className="text-sm space-y-3 text-teal-100">
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{personalInfo.email}</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{personalInfo.phone}</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{personalInfo.location}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-teal-400 pb-1 mb-3">Skills</h2>
            <div className="space-y-2 text-sm text-teal-100">
              {skills.slice(0, 6).map(skill => (
                <div key={skill}>
                  <p>{skill}</p>
                  <div className="bg-teal-500 rounded-full h-1.5"><div className="bg-teal-200 h-1.5 rounded-full" style={{ width: `${Math.floor(Math.random() * 41) + 60}%` }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-10 text-gray-800">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-teal-800 border-b-4 border-teal-200 pb-2 mb-4">Summary</h2>
          <p className="text-md leading-relaxed">{summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold text-teal-800 border-b-4 border-teal-200 pb-2 mb-4">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-6 relative pl-6">
              <div className="absolute left-0 h-full w-0.5 bg-teal-200"><div className="w-3 h-3 rounded-full bg-teal-700 absolute -left-[5px] top-1"></div></div>
              <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <p className="text-lg text-gray-700 font-medium">{exp.company}</p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1 text-gray-600">
                {exp.description.split('\n').map((item, index) => item.trim() && <li key={index}>{item.replace(/•\s*/, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-3xl font-bold text-teal-800 border-b-4 border-teal-200 pb-2 mb-4">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-4">
              <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              <h3 className="text-xl font-semibold">{edu.institution}</h3>
              <p className="text-lg text-gray-700">{edu.degree}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CreativeTemplate;
