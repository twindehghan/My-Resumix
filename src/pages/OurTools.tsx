import { Wrench, FileText, FileSignature, BrainCircuit, MessageSquare, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const tools = [
    { icon: <FileText size={32} className="text-brand-blue" />, titleKey: 'resumeBuilder', descKey: 'toolResumeBuilderDesc', link: '/resume-builder' },
    { icon: <FileSignature size={32} className="text-brand-blue" />, titleKey: 'coverLetterBuilder', descKey: 'toolCoverLetterBuilderDesc', link: '/cover-letter-builder' },
    { icon: <BrainCircuit size={32} className="text-brand-blue" />, titleKey: 'scoreTitle', descKey: 'toolAiScoringDesc', link: '#' },
    { icon: <MessageSquare size={32} className="text-brand-blue" />, titleKey: 'practiceQuestion', descKey: 'toolPracticeQuestionsDesc', link: '/practice-questions' },
];

const OurToolsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <Wrench size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('ourTools')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('ourToolsSubtitle')}
                    </p>
                </div>
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tools.map(tool => (
                        <div key={tool.titleKey} className="group rounded-lg border border-gray-200 p-8 transition-shadow hover:shadow-lg">
                            <div className="flex items-start gap-6">
                                {tool.icon}
                                <div>
                                    <h3 className="text-xl font-semibold text-brand-dark">{t(tool.titleKey as any)}</h3>
                                    <p className="mt-2 text-brand-text-secondary">{t(tool.descKey as any)}</p>
                                    <Link to={tool.link} className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-blue">
                                        {t('launchTool')} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurToolsPage;
