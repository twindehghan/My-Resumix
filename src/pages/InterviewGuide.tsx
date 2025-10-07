import { BookOpen, Star, Code, Briefcase, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const guides = [
    {
        icon: <Star size={32} className="text-brand-blue" />,
        titleKey: 'guideCategory1',
        descKey: 'guideCategory1Desc',
    },
    {
        icon: <Code size={32} className="text-brand-blue" />,
        titleKey: 'guideCategory2',
        descKey: 'guideCategory2Desc',
    },
    {
        icon: <Briefcase size={32} className="text-brand-blue" />,
        titleKey: 'guideCategory3',
        descKey: 'guideCategory3Desc',
    },
];

const InterviewGuidePage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <BookOpen size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('interviewGuides')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('interviewGuideSubtitle')}
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guides.map((guide) => (
                        <div key={guide.titleKey} className="group flex flex-col rounded-lg border border-gray-200 p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                            <div className="mb-6">{guide.icon}</div>
                            <h3 className="text-xl font-semibold text-brand-dark">{t(guide.titleKey as any)}</h3>
                            <p className="mt-4 flex-1 text-brand-text-secondary">{t(guide.descKey as any)}</p>
                            <Link to="#" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-blue">
                                {t('exploreGuides')} <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterviewGuidePage;
