import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                            <AlertTriangle size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('notFoundTitle')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('notFoundSubtitle')}
                    </p>
                    <div className="mt-10">
                        <Link to="/" className="rounded-md bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {t('notFoundGoHome')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
