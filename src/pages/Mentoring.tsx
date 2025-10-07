import { Users } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const mentors = [
    { nameKey: 'mentor1Name', roleKey: 'mentor1Role', imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1771&auto=format&fit=crop' },
    { nameKey: 'mentor2Name', roleKey: 'mentor2Role', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop' },
    { nameKey: 'mentor3Name', roleKey: 'mentor3Role', imageUrl: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=1770&auto=format&fit=crop' },
    { nameKey: 'mentor4Name', roleKey: 'mentor4Role', imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1770&auto=format&fit=crop' },
];

const MentoringPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <Users size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('coaching')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('mentoringSubtitle')}
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mentors.map((mentor) => (
                        <div key={mentor.nameKey} className="group overflow-hidden rounded-lg border border-gray-200 text-center shadow-sm transition-shadow hover:shadow-xl">
                            <img className="h-64 w-full object-cover" src={mentor.imageUrl} alt={t(mentor.nameKey as any)} />
                            <div className="p-6">
                                <h4 className="text-lg font-semibold text-brand-dark">{t(mentor.nameKey as any)}</h4>
                                <p className="text-sm text-brand-blue">{t(mentor.roleKey as any)}</p>
                                <button className="mt-4 w-full rounded-lg border border-brand-blue bg-white px-4 py-2 font-semibold text-brand-blue transition hover:bg-blue-50">
                                    {t('bookSession')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentoringPage;
