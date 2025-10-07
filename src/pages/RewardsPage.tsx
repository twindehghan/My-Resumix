import { Gift, UserPlus, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const steps = [
    { icon: <UserPlus size={24} />, titleKey: 'step1', descKey: 'step1Desc' },
    { icon: <CheckCircle size={24} />, titleKey: 'step2', descKey: 'step2Desc' },
    { icon: <Gift size={24} />, titleKey: 'step3', descKey: 'step3Desc' },
];

const RewardsPage = () => {
    const { t } = useTranslation();
    const referralCount = 1;

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <Gift size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('rewardPage')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('rewardsPageSubtitle')}
                    </p>
                </div>

                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center text-brand-dark">{t('rewardsHowItWorks')}</h2>
                    <div className="relative mt-16">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 hidden md:block" aria-hidden="true"></div>
                        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                            {steps.map((step, index) => (
                                <div key={step.titleKey} className="text-center">
                                    <div className="flex items-center justify-center mx-auto h-12 w-12 rounded-full bg-brand-blue text-white z-10 relative">
                                        {step.icon}
                                    </div>
                                    <h3 className="mt-6 text-lg font-semibold text-brand-dark">{t(step.titleKey as any)}</h3>
                                    <p className="mt-2 text-sm text-brand-text-secondary">{t(step.descKey as any)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-24 mx-auto max-w-2xl rounded-lg bg-brand-light-gray p-8 text-center">
                    <h3 className="text-2xl font-semibold text-brand-dark">{t('yourProgress')}</h3>
                    <p className="mt-2 text-brand-text-secondary">{t('referralProgress', { count: referralCount })}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-brand-blue h-2.5 rounded-full" style={{ width: `${(referralCount / 3) * 100}%` }}></div>
                    </div>
                    <button className="mt-8 rounded-lg bg-brand-blue px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700">
                        {t('getInvitationLink')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RewardsPage;
