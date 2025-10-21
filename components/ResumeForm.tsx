import React from 'react';
import { ResumeData, Experience, Education } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ResumeFormProps {
  resumeData: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
  onGenerateWithAI: (field: string, prompt: string) => void;
  aiLoadingField: string | null;
}

const AIGenerateButton: React.FC<{
  isLoading: boolean;
  onClick: () => void;
}> = ({ isLoading, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="absolute right-2 bottom-2.5 text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded hover:bg-sky-200 disabled:bg-slate-200 disabled:text-slate-500 transition-all flex items-center font-semibold"
    >
        {isLoading ? (
            <>
            <svg className="animate-spin -ml-1 mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
            </>
        ) : "✨ Generate with AI"}
    </button>
);

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <input 
          {...props} 
          className="p-2 bg-slate-50 border border-slate-300 rounded-md w-full focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow outline-none" 
        />
    </div>
);

const FormTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <textarea 
          {...props} 
          className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md resize-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow outline-none"
        />
    </div>
);


const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-3">{title}</h2>
        {children}
    </div>
);

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, onDataChange, onGenerateWithAI, aiLoadingField }) => {

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ personalInfo: { ...resumeData.personalInfo, [e.target.name]: e.target.value } });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange({ summary: e.target.value });
  };
  
  const handleExperienceChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newExperience = resumeData.experience.map(exp => 
      exp.id === id ? { ...exp, [e.target.name]: e.target.value } : exp
    );
    onDataChange({ experience: newExperience });
  };

  const addExperience = () => {
    const newExp: Experience = { id: uuidv4(), company: '', title: '', startDate: '', endDate: '', description: '' };
    onDataChange({ experience: [...resumeData.experience, newExp] });
  };
  
  const removeExperience = (id: string) => {
    onDataChange({ experience: resumeData.experience.filter(exp => exp.id !== id) });
  };
  
  const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newEducation = resumeData.education.map(edu => 
      edu.id === id ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    onDataChange({ education: newEducation });
  };

  const addEducation = () => {
    const newEdu: Education = { id: uuidv4(), institution: '', degree: '', startDate: '', endDate: '' };
    onDataChange({ education: [...resumeData.education, newEdu] });
  };

  const removeEducation = (id: string) => {
    onDataChange({ education: resumeData.education.filter(edu => edu.id !== id) });
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    onDataChange({ skills });
  };


  return (
    <form className="space-y-10">
      <Section title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <FormInput label="Full Name" name="name" value={resumeData.personalInfo.name} onChange={handlePersonalInfoChange} placeholder="Alex Doe" />
          <FormInput label="Job Title" name="title" value={resumeData.personalInfo.title} onChange={handlePersonalInfoChange} placeholder="Senior Frontend Developer" />
          <FormInput label="Email Address" type="email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="alex.doe@email.com" />
          <FormInput label="Phone Number" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="123-456-7890" />
          <FormInput label="Location" name="location" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} placeholder="San Francisco, CA" />
          <FormInput label="Website/Portfolio" name="website" value={resumeData.personalInfo.website} onChange={handlePersonalInfoChange} placeholder="alexdoe.dev" />
        </div>
      </Section>

      <Section title="Professional Summary">
        <div className="relative">
          <FormTextarea
            label="Your professional summary"
            rows={5}
            value={resumeData.summary}
            onChange={handleSummaryChange}
            placeholder="Write a brief summary of your career highlights..."
          />
          <AIGenerateButton 
            isLoading={aiLoadingField === 'summary'}
            onClick={() => onGenerateWithAI('summary', `Generate a professional summary for a ${resumeData.personalInfo.title} with skills in ${resumeData.skills.slice(0, 3).join(', ')}. Keep it concise and impactful.`)}
          />
        </div>
      </Section>

      <Section title="Work Experience">
         <div className="space-y-4">
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="p-6 border border-slate-200 rounded-lg space-y-4 bg-white relative transition-shadow hover:shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FormInput label="Job Title" name="title" value={exp.title} onChange={e => handleExperienceChange(exp.id, e)} placeholder="e.g. Software Engineer" />
                    <FormInput label="Company" name="company" value={exp.company} onChange={e => handleExperienceChange(exp.id, e)} placeholder="e.g. Tech Solutions Inc." />
                    <FormInput label="Start Date" name="startDate" value={exp.startDate} onChange={e => handleExperienceChange(exp.id, e)} placeholder="Jan 2020" />
                    <FormInput label="End Date" name="endDate" value={exp.endDate} onChange={e => handleExperienceChange(exp.id, e)} placeholder="Present" />
                </div>
                <div className="relative">
                  <FormTextarea
                    label="Description & Achievements"
                    rows={4}
                    name="description"
                    value={exp.description}
                    onChange={e => handleExperienceChange(exp.id, e)}
                    placeholder="Describe your responsibilities and achievements in bullet points..."
                  />
                  <AIGenerateButton
                    isLoading={aiLoadingField === `experience-${exp.id}`}
                    onClick={() => onGenerateWithAI(`experience-${exp.id}`, `Generate 3-4 bullet points for a ${exp.title} at ${exp.company}. Focus on achievements and quantifiable results.`)}
                  />
                </div>
                <button type="button" onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors" aria-label="Remove Experience">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg>
                </button>
              </div>
            ))}
            <button type="button" onClick={addExperience} className="flex items-center justify-center w-full text-center px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                Add Experience
            </button>
        </div>
      </Section>
      
      <Section title="Education">
        <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="p-6 border border-slate-200 rounded-lg space-y-4 bg-white relative transition-shadow hover:shadow-md">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FormInput label="Institution" name="institution" value={edu.institution} onChange={e => handleEducationChange(edu.id, e)} placeholder="University of Technology" />
                    <FormInput label="Degree / Field of Study" name="degree" value={edu.degree} onChange={e => handleEducationChange(edu.id, e)} placeholder="B.S. in Computer Science" />
                    <FormInput label="Start Date" name="startDate" value={edu.startDate} onChange={e => handleEducationChange(edu.id, e)} placeholder="Sep 2012" />
                    <FormInput label="End Date" name="endDate" value={edu.endDate} onChange={e => handleEducationChange(edu.id, e)} placeholder="May 2016" />
                </div>
                <button type="button" onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors" aria-label="Remove Education">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg>
                </button>
              </div>
            ))}
            <button type="button" onClick={addEducation} className="flex items-center justify-center w-full text-center px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                Add Education
            </button>
        </div>
      </Section>
      
      <Section title="Skills">
        <FormInput
          label="Skills (comma separated)"
          value={resumeData.skills.join(', ')}
          onChange={handleSkillsChange}
          placeholder="e.g. React, TypeScript, Node.js"
        />
      </Section>
    </form>
  );
};

export default ResumeForm;
