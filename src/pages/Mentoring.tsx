import { Users } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

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
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold text-brand-dark">{t('mentoringComingSoonTitle')}</h2>
                        <p className="mt-4 text-brand-text-secondary">
                            {t('mentoringComingSoonText')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentoringPage;
