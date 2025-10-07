import { GraduationCap, BookMarked, Users, BookOpen, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const learningPaths = [
    {
        icon: <BookMarked size={32} className="text-brand-blue" />,
        titleKey: 'learnCourses',
        descKey: 'learnCoursesDesc',
        link: '/courses'
    },
    {
        icon: <Users size={32} className="text-brand-blue" />,
        titleKey: 'learnMentoring',
        descKey: 'learnMentoringDesc',
        link: '/mentoring'
    },
    {
        icon: <BookOpen size={32} className="text-brand-blue" />,
        titleKey: 'learnGuides',
        descKey: 'learnGuidesDesc',
        link: '/interview-guides'
    }
];

const LearnWithUsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <GraduationCap size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('learnWithUs')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('learnWithUsSubtitle')}
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {learningPaths.map(path => (
                        <div key={path.titleKey} className="group rounded-lg border border-gray-200 p-8 text-center transition-shadow hover:shadow-lg">
                            <div className="flex justify-center">{path.icon}</div>
                            <h3 className="mt-6 text-xl font-semibold text-brand-dark">{t(path.titleKey as any)}</h3>
                            <p className="mt-2 text-brand-text-secondary">{t(path.descKey as any)}</p>
                            <Link to={path.link} className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-blue">
                                {t('learnMore')} <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearnWithUsPage;
