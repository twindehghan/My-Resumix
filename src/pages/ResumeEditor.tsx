import { useReducer, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import { User, Briefcase, GraduationCap, Plus, Trash2, Star, Code, Globe, Award, Heart, Download, Share2, ChevronDown, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ResumeData, PersonalDetails } from '../types';
import ResumePreview from '../components/ResumePreview';
import { getDocument, updateDocument } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

type SectionName = 'workExperience' | 'education' | 'skills' | 'projects' | 'languages' | 'awards' | 'interests';

type ResumeAction =
  | { type: 'SET_STATE', payload: ResumeData }
  | { type: 'UPDATE_DETAIL'; payload: { field: keyof PersonalDetails; value: string } }
  | { type: 'ADD_SECTION_ITEM'; payload: { section: SectionName; item: any } }
  | { type: 'REMOVE_SECTION_ITEM'; payload: { section: SectionName; id: string } }
  | { type: 'UPDATE_SECTION_ITEM'; payload: { section: SectionName; id: string; field: string; value: string } };

const initialResumeData: ResumeData = {
  personalDetails: { fullName: '', email: '', phoneNumber: '', address: '', profilePhoto: '', summary: '' },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  awards: [],
  interests: [],
};

function resumeReducer(state: ResumeData, action: ResumeAction): ResumeData {
  switch (action.type) {
    case 'SET_STATE':
        return action.payload;
    case 'UPDATE_DETAIL':
      return { ...state, personalDetails: { ...state.personalDetails, [action.payload.field]: action.payload.value } };
    case 'ADD_SECTION_ITEM':
      return { ...state, [action.payload.section]: [...state[action.payload.section] as any[], action.payload.item] };
    case 'REMOVE_SECTION_ITEM':
      return { ...state, [action.payload.section]: (state[action.payload.section] as any[]).filter(item => item.id !== action.payload.id) };
    case 'UPDATE_SECTION_ITEM':
      return {
        ...state,
        [action.payload.section]: (state[action.payload.section] as any[]).map(item =>
          item.id === action.payload.id ? { ...item, [action.payload.field]: action.payload.value } : item
        ),
      };
    default:
      return state;
  }
}

const ResumeEditor = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [resumeData, dispatch] = useReducer(resumeReducer, initialResumeData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [downloadOpen, setDownloadOpen] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            if (!id || !user) return;
            try {
                setLoading(true);
                setError(null);
                const data = await getDocument(id, 'resumes');
                if (data.user_id !== user.id) {
                    setError("You don't have permission to edit this resume.");
                    return;
                }
                // Ensure data is not null and has a valid structure
                const resumePayload = data.document_data && typeof data.document_data === 'object' 
                    ? { ...initialResumeData, ...data.document_data }
                    : initialResumeData;
                dispatch({ type: 'SET_STATE', payload: resumePayload });
            } catch (err) {
                setError("Failed to load resume data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchResume();
    }, [id, user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        setSaving(true);
        try {
            await updateDocument(id, 'resumes', resumeData, resumeData.personalDetails.fullName);
            // Optionally show a success message
        } catch (err) {
            setError("Failed to save resume.");
        } finally {
            setSaving(false);
        }
    };

    const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: 'UPDATE_DETAIL', payload: { field: e.target.name as keyof PersonalDetails, value: e.target.value } });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                dispatch({ type: 'UPDATE_DETAIL', payload: { field: 'profilePhoto', value: event.target?.result as string } });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const addListItem = (section: SectionName, newItemTemplate: object) => {
        dispatch({ type: 'ADD_SECTION_ITEM', payload: { section, item: { id: uuidv4(), ...newItemTemplate } } });
    };

    const removeListItem = (section: SectionName, id: string) => {
        dispatch({ type: 'REMOVE_SECTION_ITEM', payload: { section, id } });
    };

    const updateListItem = (section: SectionName, id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: 'UPDATE_SECTION_ITEM', payload: { section, id, field: e.target.name, value: e.target.value } });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" size={40} /></div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

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
                        <form className="space-y-8" onSubmit={handleSave}>
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
                                                <input type="text" name="jobTitle" value={exp.jobTitle} onChange={(e) => updateListItem('workExperience', exp.id, e)} placeholder={t('jobTitle')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                <input type="text" name="company" value={exp.company} onChange={(e) => updateListItem('workExperience', exp.id, e)} placeholder={t('company')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                <div className="md:col-span-2">
                                                    <input type="text" name="dates" value={exp.dates} onChange={(e) => updateListItem('workExperience', exp.id, e)} placeholder={t('dates')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <textarea name="responsibilities" rows={4} value={exp.responsibilities} onChange={(e) => updateListItem('workExperience', exp.id, e)} placeholder={t('responsibilities')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => addListItem('workExperience', { jobTitle: '', company: '', dates: '', responsibilities: '' })} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
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
                                                <input type="text" name="degree" value={edu.degree} onChange={(e) => updateListItem('education', edu.id, e)} placeholder={t('degree')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                <input type="text" name="institution" value={edu.institution} onChange={(e) => updateListItem('education', edu.id, e)} placeholder={t('institution')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                <div className="md:col-span-2">
                                                    <input type="text" name="graduationYear" value={edu.graduationYear} onChange={(e) => updateListItem('education', edu.id, e)} placeholder={t('graduationYear')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => addListItem('education', { degree: '', institution: '', graduationYear: '' })} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
                                    <Plus size={16} /> {t('addEducation')}
                                </button>
                            </div>

                            {/* Skills */}
                            <div className="rounded-lg border border-gray-200 p-6 bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <Star className="text-brand-blue" size={24} />
                                    <h2 className="text-2xl font-semibold text-brand-dark">{t('skills')}</h2>
                                </div>
                                <div className="space-y-4">
                                {resumeData.skills.map((skill) => (
                                    <div key={skill.id} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="name"
                                            value={skill.name}
                                            onChange={(e) => updateListItem('skills', skill.id, e)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
                                            placeholder={t('skillPlaceholder')}
                                        />
                                        <button type="button" onClick={() => removeListItem('skills', skill.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                </div>
                                <button type="button" onClick={() => addListItem('skills', { name: '' })} className="mt-4 flex items-center gap-2 text-brand-blue font-semibold">
                                    <Plus size={16} /> {t('addSkill')}
                                </button>
                            </div>
                            
                            <div className="flex justify-end gap-4 pt-6">
                                <button type="button" onClick={() => navigate('/')} className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-brand-text-secondary hover:bg-gray-50">{t('cancel')}</button>
                                <button type="submit" disabled={saving} className="rounded-lg bg-brand-blue px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:bg-gray-400">
                                    {saving ? 'Saving...' : t('save')}
                                </button>
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
