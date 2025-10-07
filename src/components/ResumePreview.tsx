import { Mail, Phone, MapPin, Briefcase, GraduationCap, Star, FileText, Code, Globe, Award, Heart, Link as LinkIcon } from 'lucide-react';
import { ResumeData } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { t } = useTranslation();
  const { personalDetails, workExperience, education, skills, projects, languages, awards, interests } = data;

  const Section = ({ title, icon, children, condition }: { title: string, icon: React.ReactNode, children: React.ReactNode, condition: boolean }) => {
    if (!condition) return null;
    return (
      <section>
        <h2 className="text-xl font-bold text-brand-blue mb-4 flex items-center gap-3">
          {icon}
          {title}
        </h2>
        {children}
      </section>
    );
  };

  return (
    <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg border border-gray-200 h-full w-full">
      {/* Header */}
      <header className="text-center border-b pb-6 border-gray-200">
        {personalDetails.profilePhoto && (
            <img src={personalDetails.profilePhoto} alt="Profile" className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" />
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 break-words">{personalDetails.fullName || t('fullName')}</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
          {personalDetails.email && (
            <div className="flex items-center gap-2 min-w-0">
              <Mail size={14} className="flex-shrink-0" />
              <span className="truncate">{personalDetails.email}</span>
            </div>
          )}
          {personalDetails.phoneNumber && (
            <div className="flex items-center gap-2 min-w-0">
              <Phone size={14} className="flex-shrink-0" />
              <span className="truncate">{personalDetails.phoneNumber}</span>
            </div>
          )}
          {personalDetails.address && (
            <div className="flex items-center gap-2 min-w-0">
              <MapPin size={14} className="flex-shrink-0" />
              <span className="truncate">{personalDetails.address}</span>
            </div>
          )}
        </div>
      </header>

      <main className="mt-8 space-y-8">
        <Section title={t('professionalSummary')} icon={<FileText size={20} />} condition={!!personalDetails.summary}>
            <p className="text-sm text-gray-600 whitespace-pre-wrap break-words">{personalDetails.summary}</p>
        </Section>

        <Section title={t('workExperience')} icon={<Briefcase size={20} />} condition={workExperience.some(exp => exp.jobTitle || exp.company)}>
            <div className="space-y-6">
              {workExperience.map((exp) => (
                (exp.jobTitle || exp.company) &&
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                    <h3 className="font-semibold text-lg text-gray-800 break-words">{exp.jobTitle || t('jobTitle')}</h3>
                    <span className="text-sm text-gray-500 mt-1 sm:mt-0 flex-shrink-0">{exp.dates || t('dates')}</span>
                  </div>
                  <p className="text-md text-gray-600 italic break-words">{exp.company || t('company')}</p>
                  <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap break-words">{exp.responsibilities || t('responsibilities')}</p>
                </div>
              ))}
            </div>
        </Section>

        <Section title={t('education')} icon={<GraduationCap size={20} />} condition={education.some(edu => edu.degree || edu.institution)}>
            <div className="space-y-4">
              {education.map((edu) => (
                (edu.degree || edu.institution) &&
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                    <h3 className="font-semibold text-lg text-gray-800 break-words">{edu.degree || t('degree')}</h3>
                    <span className="text-sm text-gray-500 mt-1 sm:mt-0 flex-shrink-0">{edu.graduationYear || t('graduationYear')}</span>
                  </div>
                  <p className="text-md text-gray-600 italic break-words">{edu.institution || t('institution')}</p>
                </div>
              ))}
            </div>
        </Section>

        <Section title={t('projects')} icon={<Code size={20} />} condition={projects.some(p => p.name)}>
            <div className="space-y-6">
              {projects.map((p) => (
                p.name &&
                <div key={p.id}>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-gray-800 break-words">{p.name}</h3>
                        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline"><LinkIcon size={16} /></a>}
                    </div>
                  <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap break-words">{p.description}</p>
                </div>
              ))}
            </div>
        </Section>

        <Section title={t('skills')} icon={<Star size={20} />} condition={skills.some(skill => skill.name)}>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                skill.name && <span key={skill.id} className="bg-blue-100 text-brand-blue text-sm font-medium px-3 py-1 rounded-full">{skill.name}</span>
              ))}
            </div>
        </Section>

        <Section title={t('languages')} icon={<Globe size={20} />} condition={languages.some(l => l.language)}>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {languages.map((l) => (
                l.language && 
                <div key={l.id} className="text-sm text-gray-700">
                    <span className="font-semibold">{l.language}:</span> <span className="text-gray-600">{l.proficiency}</span>
                </div>
              ))}
            </div>
        </Section>

        <Section title={t('awardsAndCertifications')} icon={<Award size={20} />} condition={awards.some(a => a.name)}>
            <div className="space-y-4">
              {awards.map((a) => (
                a.name &&
                <div key={a.id}>
                  <h3 className="font-semibold text-md text-gray-800 break-words">{a.name}</h3>
                  <p className="text-sm text-gray-600 italic">{a.issuer} - {a.date}</p>
                </div>
              ))}
            </div>
        </Section>

        <Section title={t('interests')} icon={<Heart size={20} />} condition={interests.some(i => i.name)}>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                i.name && <span key={i.id} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{i.name}</span>
              ))}
            </div>
        </Section>

      </main>
    </div>
  );
};

export default ResumePreview;
