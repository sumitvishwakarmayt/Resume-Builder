import React, { forwardRef } from 'react';
import { ResumeData } from '../types';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import CorporateTemplate from './templates/CorporateTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  templateId: number;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, templateId }, ref) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        return <ClassicTemplate data={data} />;
      case 2:
        return <ModernTemplate data={data} />;
      case 3:
        return <MinimalistTemplate data={data} />;
      case 4:
        return <CreativeTemplate data={data} />;
      case 5:
        return <CorporateTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div ref={ref} className="bg-white">
        {renderTemplate()}
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;