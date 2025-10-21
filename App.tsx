import React, { useState, useRef, useCallback } from 'react';
import { ResumeData } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { generateResumeContent } from './services/geminiService';

declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'Alex Doe',
    title: 'Senior Frontend Developer',
    email: 'alex.doe@email.com',
    phone: '123-456-7890',
    location: 'San Francisco, CA',
    website: 'alexdoe.dev',
  },
  summary: 'Innovative Senior Frontend Developer with 8+ years of experience building and maintaining responsive and scalable web applications. Proficient in React, TypeScript, and modern JavaScript frameworks. Passionate about creating intuitive user interfaces and collaborating in agile environments to deliver high-quality software.',
  experience: [
    { id: 'exp1', company: 'Tech Solutions Inc.', title: 'Senior Frontend Developer', startDate: 'Jan 2020', endDate: 'Present', description: '• Led the development of a new customer-facing dashboard using React and Redux, improving user engagement by 25%.\n• Mentored junior developers and conducted code reviews to maintain high code quality standards.\n• Collaborated with UX/UI designers to translate wireframes into functional components.' },
    { id: 'exp2', company: 'Web Innovators', title: 'Frontend Developer', startDate: 'Jun 2016', endDate: 'Dec 2019', description: '• Developed and maintained client websites using HTML, CSS, and JavaScript (ES6+).\n• Implemented responsive designs to ensure seamless experience across all devices.\n• Optimized web applications for maximum speed and scalability.' },
  ],
  education: [
    { id: 'edu1', institution: 'University of Technology', degree: 'B.S. in Computer Science', startDate: 'Sep 2012', endDate: 'May 2016' },
  ],
  skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Jest', 'Webpack', 'Figma'],
};

const templates = [
  { id: 1, name: 'Classic' },
  { id: 2, name: 'Modern' },
  { id: 3, name: 'Minimal' },
  { id: 4, name: 'Creative' },
  { id: 5, name: 'Corporate' },
];

const PreviewScreen: React.FC<{ resumeData: ResumeData, onBack: () => void }> = ({ resumeData, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!resumePreviewRef.current) return;
    setIsDownloading(true);
    try {
      const { jsPDF } = window.jspdf;
      const canvas = await window.html2canvas(resumePreviewRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const imgWidth = pdfWidth;
      const imgHeight = imgWidth / ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.personalInfo.name.replace(' ', '_')}_Resume.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("An error occurred while generating the PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-slate-200">
      <header className="bg-white/80 shadow-md sticky top-0 z-20 backdrop-blur-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Back to Editor
          </button>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-gray-600">Template:</span>
            <div className="flex items-center space-x-1 rounded-lg bg-slate-200 p-1">
              {templates.map(({ id, name }) => (
                <button key={id} onClick={() => setSelectedTemplate(id)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-all ${selectedTemplate === id ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-white/60'}`}>
                  {name}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleDownloadPdf} disabled={isDownloading} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center">
            {isDownloading ? (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : null}
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
      </header>
      <main className="py-10 flex justify-center">
        <div className="w-[8.5in] origin-top transform scale-[0.9] lg:scale-100">
          <ResumePreview ref={resumePreviewRef} data={resumeData} templateId={selectedTemplate} />
        </div>
      </main>
    </div>
  );
};


const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [aiLoadingField, setAiLoadingField] = useState<string | null>(null);

  const handleDataChange = (data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  };

  const handleGenerateWithAI = useCallback(async (field: string, prompt: string) => {
    setAiLoadingField(field);
    try {
      const content = await generateResumeContent(prompt);
      if (field === 'summary') {
        setResumeData(prev => ({ ...prev, summary: content }));
      } else if (field.startsWith('experience-')) {
        const id = field.split('-')[1];
        setResumeData(prev => ({
          ...prev,
          experience: prev.experience.map(exp => exp.id === id ? { ...exp, description: content } : exp)
        }));
      }
    } catch (error) {
      console.error("AI generation failed:", error);
      alert("Failed to generate content with AI. Please check the console for details.");
    } finally {
      setAiLoadingField(null);
    }
  }, []);

  if (view === 'preview') {
    return <PreviewScreen resumeData={resumeData} onBack={() => setView('form')} />;
  }

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow-sm bg-purple-600">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-#fff-900">Cosmic Resume Builder</h1>
          <p className="text-#fff-600 mt-1">Fill in your details and let my tool assist you in crafting the perfect resume.</p>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <ResumeForm
              resumeData={resumeData}
              onDataChange={handleDataChange}
              onGenerateWithAI={handleGenerateWithAI}
              aiLoadingField={aiLoadingField}
            />
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => setView('preview')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105"
            >
              Preview & Download
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;