import { BookMarked, Clock, BarChart } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const courses = [
    {
        titleKey: 'course1Title',
        descKey: 'course1Desc',
        levelKey: 'course1Level',
        durationKey: 'course1Duration',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1770&auto=format&fit=crop'
    },
    {
        titleKey: 'course2Title',
        descKey: 'course2Desc',
        levelKey: 'course2Level',
        durationKey: 'course2Duration',
        imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1770&auto=format&fit=crop'
    },
    {
        titleKey: 'course3Title',
        descKey: 'course3Desc',
        levelKey: 'course3Level',
        durationKey: 'course3Duration',
        imageUrl: 'https://images.unsplash.com/photo-1611944212129-2994cb5935c2?q=80&w=1887&auto=format&fit=crop'
    }
];

const CoursesPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <BookMarked size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('courses')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('coursesSubtitle')}
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                        <div key={course.titleKey} className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-lg">
                            <img src={course.imageUrl} alt={t(course.titleKey as any)} className="h-48 w-full object-cover" loading="lazy" />
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="text-xl font-semibold text-brand-dark">{t(course.titleKey as any)}</h3>
                                <p className="mt-3 flex-1 text-sm text-brand-text-secondary">{t(course.descKey as any)}</p>
                                <div className="mt-6 flex items-center justify-between text-sm text-brand-text-secondary">
                                    <div className="flex items-center gap-2">
                                        <BarChart size={16} />
                                        <span>{t(course.levelKey as any)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        <span>{t(course.durationKey as any)}</span>
                                    </div>
                                </div>
                                <button className="mt-6 w-full rounded-lg bg-brand-blue px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700">
                                    {t('enrollNow')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
