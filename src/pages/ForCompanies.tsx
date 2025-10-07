import { Building, Users, Search, BarChart } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const benefits = [
    { icon: <Search size={28} />, textKey: 'partnerBenefit1' },
    { icon: <Users size={28} />, textKey: 'partnerBenefit2' },
    { icon: <BarChart size={28} />, textKey: 'partnerBenefit3' },
];

const companyLogos = [
    'https://logo.clearbit.com/slack.com',
    'https://logo.clearbit.com/dropbox.com',
    'https://logo.clearbit.com/shopify.com',
    'https://logo.clearbit.com/netflix.com',
    'https://logo.clearbit.com/airbnb.com',
];

const ForCompaniesPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-brand-light-gray">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                                <Building size={36} />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('forCorporate')}</h1>
                        <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                            {t('forCompaniesSubtitle')}
                        </p>
                        <button className="mt-10 rounded-lg bg-brand-blue px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700">
                            {t('contactSales')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Why Partner Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-center text-brand-dark">{t('whyPartner')}</h2>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {benefits.map(benefit => (
                        <div key={benefit.textKey}>
                            <div className="flex justify-center text-brand-blue">{benefit.icon}</div>
                            <p className="mt-4 text-brand-text-secondary">{t(benefit.textKey as any)}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Trusted By Section */}
            <div className="bg-brand-light-gray py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-center text-lg font-semibold text-brand-text-secondary">{t('trustedBy')}</h3>
                    <div className="mt-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                        {companyLogos.map(logo => (
                            <img key={logo} src={logo} alt="Company Logo" className="h-8 grayscale opacity-60" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForCompaniesPage;
