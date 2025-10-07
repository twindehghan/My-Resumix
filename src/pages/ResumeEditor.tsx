import { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { User, Briefcase, GraduationCap, Plus, Trash2, Star, Image as ImageIcon, FileText, Code, Globe, Award, Heart, Download, Share2, ChevronDown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ResumeData } from '../types';
import ResumePreview from '../components/ResumePreview';

const ResumeEditor = () => {
    const { t } = useTranslation();
    const [downloadOpen, setDownloadOpen] = useState(false);

    const [resumeData, setResumeData] = useState<ResumeData>({
        personalDetails: {
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            profilePhoto: '',
            summary: ''
        },
        workExperience: [],
        education: [],
        skills: [''],
        projects: [],
        languages: [],
        awards: [],
        interests: [],
    });

    const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            personalDetails: { ...prev.personalDetails, [name]: value }
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setResumeData(prev => ({
                    ...prev,
                    personalDetails: { ...prev.personalDetails, profilePhoto: event.target?.result as string }
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    // Generic handler for simple list items (skills, interests)
    const handleSimpleListChange = <K extends keyof ResumeData>(section: K, index: number, value: any) => {
        const list = resumeData[section] as any[];
        const newList = [...list];
        newList[index] = value;
        setResumeData(prev => ({ ...prev, [section]: newList }));
    };

    // Generic handler for list of objects
    const handleObjectListChange = <K extends keyof ResumeData>(section: K, id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const list = resumeData[section] as { id: string }[];
        const newList = list.map(item => item.id === id ? { ...item, [name]: value } : item);
        setResumeData(prev => ({ ...prev, [section]: newList }));
    };
    
    // Generic add item to list
    const addListItem = <K extends keyof ResumeData>(section: K, newItem: any) => {
        const list = resumeData[section] as any[];
        setResumeData(prev => ({ ...prev, [section]: [...list, newItem] }));
    };

    // Generic remove item from list
    const removeListItem = <K extends keyof ResumeData>(section: K, idOrIndex: string | number) => {
        const list = resumeData[section] as any[];
        const newList = typeof idOrIndex === 'string'
            ? list.filter(item => item.id !== idOrIndex)
            : list.filter((_, i) => i !== idOrIndex);
        setResumeData(prev => ({ ...prev, [section]: newList }));
    };


    return (
        <div className="bg-brand-light-gray">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark">{t('resumeEditorTitle')}</h1>
                    <p className="mt-2 text-lg text-brand-text-secondary">{t('resumeEditorSubtitle')}</p>
                </div>
                
                <div className="flex justify-center md:justify-end items-center gap-4 mb-8">
                    <div className="relative">
                        <button onClick={() => setDownloadOpen(!downloadOpen)} className="flex items-center gap-2 rounded-lg bg-white border border-gray-300 px-4 py-2 font-semibold text-brand-text-secondary shadow-sm transition hover:bg-gray-50">
                            <Download size={18} />
                            <span>{t('download')}</span>
                            <ChevronDown size={16} />
                        </button>
                        {downloadOpen && (
                            <div className="absolute end-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div className="py-1" role="none">
                                    <a href="#" onClick={() => setDownloadOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('pdf')}</a>
                                    <a href="#" onClick={() => setDownloadOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('word')}</a>
                                    <a href="#" onClick={() => setDownloadOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('html')}</a>
                                </div>
                            </div>
                        )}
                    </div>
                     <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-300 px-4 py-2 font-semibold text-brand-text-secondary shadow-sm transition hover:bg-gray-50">
                        <Share2 size={18} />
                        <span>{t('share')}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className="lg:max-h-[calc(100vh-250px)] lg:overflow-y-auto pr-4 -mr-4">
                        <form className="space-y-8">
                            {/* Personal Details */}
                            <div className="rounded-lg border border-gray-200 p-6 bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <User className="text-brand-blue" size={24} />
                                    <h2 className="text-2xl font-semibold text-brand-dark">{t('personalDetails')}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('fullName')}</label>
                                        <input type="text" name="fullName" value={resumeData.personalDetails.fullName} onChange={handlePersonalDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
                                        <input type="email" name="email" value={resumeData.personalDetails.email} onChange={handlePersonalDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('phoneNumber')}</label>
                                        <input type="tel" name="phoneNumber" value={resumeData.personalDetails.phoneNumber} onChange={handlePersonalDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('address')}</label>
                                        <input type="text" name="address" value={resumeData.personalDetails.address} onChange={handlePersonalDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">{t('profilePhoto')}</label>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"/>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">{t('professionalSummary')}</label>
                                        <textarea name="summary" rows={4} value={resumeData.personalDetails.summary} onChange={handlePersonalDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Work Experience */}
                            <div className="rounded-lg border border-gray-200 p-6 bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <Briefcase className="text-brand-blue" size={24} />
                                    <h2 className="text-2xl font-semibold text-brand-dark">{t('workExperience')}</h2>
                                </div>
                                <div className="space-y-8">
                                    {resumeData.workExperience.map((exp) => (
                                        <div key={exp.id} className="relative border-b pb-6 mb-6 border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                                            <button type="button" onClick={() => removeListItem('workExperience', exp.id)} className="absolute top-0 right-0 text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('jobTitle')}</label>
                                                    <input type="text" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleObjectListChange('workExperience', exp.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('company')}</label>
                                                    <input type="text" name="company" value={exp.company} onChange={(e) => handleObjectListChange('workExperience', exp.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700">{t('dates')}</label>
                                                    <input type="text" name="dates" value={exp.dates} onChange={(e) => handleObjectListChange('workExperience', exp.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700">{t('responsibilities')}</label>
                                                    <textarea name="responsibilities" rows={4} value={exp.responsibilities} onChange={(e) => handleObjectListChange('workExperience', exp.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => addListItem('workExperience', { id: uuidv4(), jobTitle: '', company: '', dates: '', responsibilities: '' })} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
                                    <Plus size={16} /> {t('addExperience')}
                                </button>
                            </div>

                            {/* Education */}
                            <div className="rounded-lg border border-gray-200 p-6 bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <GraduationCap className="text-brand-blue" size={24} />
                                    <h2 className="text-2xl font-semibold text-brand-dark">{t('education')}</h2>
                                </div>
                                <div className="space-y-8">
                                    {resumeData.education.map((edu) => (
                                        <div key={edu.id} className="relative border-b pb-6 mb-6 border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                                            <button type="button" onClick={() => removeListItem('education', edu.id)} className="absolute top-0 right-0 text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('degree')}</label>
                                                    <input type="text" name="degree" value={edu.degree} onChange={(e) => handleObjectListChange('education', edu.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('institution')}</label>
                                                    <input type="text" name="institution" value={edu.institution} onChange={(e) => handleObjectListChange('education', edu.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700">{t('graduationYear')}</label>
                                                    <input type="text" name="graduationYear" value={edu.graduationYear} onChange={(e) => handleObjectListChange('education', edu.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => addListItem('education', { id: uuidv4(), degree: '', institution: '', graduationYear: '' })} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
                                    <Plus size={16} /> {t('addEducation')}
                                </button>
                            </div>

                            {/* Projects */}
                            <div className="rounded-lg border border-gray-200 p-6 bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <Code className="text-brand-blue" size={24} />
                                    <h2 className="text-2xl font-semibold text-brand-dark">{t('projects')}</h2>
                                </div>
                                <div className="space-y-8">
                                    {resumeData.projects.map((project) => (
                                        <div key={project.id} className="relative border-b pb-6 mb-6 border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                                            <button type="button" onClick={() => removeListItem('projects', project.id)} className="absolute top-0 right-0 text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('projectName')}</label>
                                                    <input type="text" name="name" value={project.name} onChange={(e) => handleObjectListChange('projects', project.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('projectLink')}</label>
                                                    <input type="text" name="link" value={project.link} onChange={(e) => handleObjectListChange('projects', project.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700">{t('projectDescription')}</label>
                                                    <textarea name="description" rows={3} value={project.description} onChange={(e) => handleObjectListChange('projects', project.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => addListItem('projects', { id: uuidv4(), name: '', description: '', link: '' })} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
                                    <Plus size={16} /> {t('addProject')}
                                </button>
                            </div>

                            {/* Skills */}
                            <div className="rounded-lg border border-gray-200 p-6 bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <Star className="text-brand-blue" size={24} />
                                    <h2 className="text-2xl font-semibold text-brand-dark">{t('skills')}</h2>
                                </div>
                                <div className="space-y-4">
                                {resumeData.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={skill}
                                            onChange={(e) => handleSimpleListChange('skills', index, e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
                                            placeholder={t('skillPlaceholder')}
                                        />
                                        <button type="button" onClick={() => removeListItem('skills', index)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                </div>
                                <button type="button" onClick={() => addListItem('skills', '')} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
                                    <Plus size={16} /> {t('addSkill')}
                                </button>
                            </div>

                            {/* Languages */}
                            <div className="rounded-lg border border-gray-200 p-6 bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <Globe className="text-brand-blue" size={24} />
                                    <h2 className="text-2xl font-semibold text-brand-dark">{t('languages')}</h2>
                                </div>
                                <div className="space-y-8">
                                    {resumeData.languages.map((lang) => (
                                        <div key={lang.id} className="relative border-b pb-6 mb-6 border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                                            <button type="button" onClick={() => removeListItem('languages', lang.id)} className="absolute top-0 right-0 text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('languageName')}</label>
                                                    <input type="text" name="language" value={lang.language} onChange={(e) => handleObjectListChange('languages', lang.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('proficiency')}</label>
                                                    <input type="text" name="proficiency" value={lang.proficiency} onChange={(e) => handleObjectListChange('languages', lang.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => addListItem('languages', { id: uuidv4(), language: '', proficiency: '' })} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
                                    <Plus size={16} /> {t('addLanguage')}
                                </button>
                            </div>

                             {/* Awards */}
                            <div className="rounded-lg border border-gray-200 p-6 bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <Award className="text-brand-blue" size={24} />
                                    <h2 className="text-2xl font-semibold text-brand-dark">{t('awardsAndCertifications')}</h2>
                                </div>
                                <div className="space-y-8">
                                    {resumeData.awards.map((award) => (
                                        <div key={award.id} className="relative border-b pb-6 mb-6 border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                                            <button type="button" onClick={() => removeListItem('awards', award.id)} className="absolute top-0 right-0 text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('awardName')}</label>
                                                    <input type="text" name="name" value={award.name} onChange={(e) => handleObjectListChange('awards', award.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('issuer')}</label>
                                                    <input type="text" name="issuer" value={award.issuer} onChange={(e) => handleObjectListChange('awards', award.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700">{t('issueDate')}</label>
                                                    <input type="text" name="date" value={award.date} onChange={(e) => handleObjectListChange('awards', award.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => addListItem('awards', { id: uuidv4(), name: '', issuer: '', date: '' })} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
                                    <Plus size={16} /> {t('addAward')}
                                </button>
                            </div>

                            {/* Interests */}
                            <div className="rounded-lg border border-gray-200 p-6 bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <Heart className="text-brand-blue" size={24} />
                                    <h2 className="text-2xl font-semibold text-brand-dark">{t('interests')}</h2>
                                </div>
                                <div className="space-y-4">
                                {resumeData.interests.map((interest, index) => (
                                    <div key={interest.id} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="name"
                                            value={interest.name}
                                            onChange={(e) => handleObjectListChange('interests', interest.id, e)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
                                            placeholder={t('interestName')}
                                        />
                                        <button type="button" onClick={() => removeListItem('interests', interest.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                </div>
                                <button type="button" onClick={() => addListItem('interests', {id: uuidv4(), name: ''})} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
                                    <Plus size={16} /> {t('addInterest')}
                                </button>
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <button type="button" className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-brand-text-secondary hover:bg-gray-50">{t('cancel')}</button>
                                <button type="submit" className="rounded-lg bg-brand-blue px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700">{t('save')}</button>
                            </div>
                        </form>
                    </div>

                    {/* Preview Section */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <h2 className="text-2xl font-bold text-center mb-4 lg:hidden">{t('livePreview')}</h2>
                        <ResumePreview data={resumeData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor;
