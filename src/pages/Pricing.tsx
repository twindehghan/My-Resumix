import { Check, DollarSign } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const PricingPage = () => {
    const { t } = useTranslation();

    // Placeholder for payment gateway integration
    const handleSelectPlan = (planName: string) => {
        // This is where you would integrate with a payment gateway.
        // For Persian (Toman), you might use Zarinpal.
        // For English (Euro), you might use Stripe.
        alert(`Selected plan: ${planName}. Redirecting to payment...`);
    };

    const plans = [
        {
            name: t('freePlan'),
            price: t('freePlanPrice'),
            description: t('freePlanDescription'),
            features: [
                t('feature_free_1'),
                t('feature_free_2'),
                t('feature_free_3'),
                t('feature_free_4'),
            ],
            isCurrent: true,
            buttonText: t('currentPlan'),
            buttonAction: () => {},
        },
        {
            name: t('proPlan'),
            price: t('proPlanPrice'),
            description: t('proPlanDescription'),
            features: [
                t('feature_pro_1'),
                t('feature_pro_2'),
                t('feature_pro_3'),
                t('feature_pro_4'),
            ],
            isCurrent: false,
            buttonText: t('selectPlan'),
            buttonAction: () => handleSelectPlan('Basic'),
        },
        {
            name: t('teamPlan'),
            price: t('teamPlanPrice'),
            description: t('teamPlanDescription'),
            features: [
                t('feature_team_1'),
                t('feature_team_2'),
                t('feature_team_3'),
                t('feature_team_4'),
            ],
            isCurrent: false,
            isPopular: true,
            buttonText: t('selectPlan'),
            buttonAction: () => handleSelectPlan('Premium'),
        },
    ];

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <DollarSign size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('pricing')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('pricingSubtitle')}
                    </p>
                </div>

                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`relative flex flex-col rounded-2xl border ${plan.isPopular ? 'border-brand-blue shadow-2xl' : 'border-gray-200'} bg-white p-8`}>
                            {plan.isPopular && (
                                <div className="absolute top-0 -translate-y-1/2 rounded-full bg-brand-blue px-4 py-1.5 text-sm font-semibold text-white">{t('mostPopular')}</div>
                            )}
                            <h3 className="text-2xl font-semibold text-brand-dark">{plan.name}</h3>
                            <p className="mt-4 text-brand-text-secondary h-12">{plan.description}</p>
                            <div className="mt-6 flex items-baseline gap-1">
                                <span className="text-4xl font-bold tracking-tight text-brand-dark">{plan.price}</span>
                                {plan.name !== t('freePlan') && (
                                    <span className="text-sm font-semibold text-brand-text-secondary">{t('perMonth')}</span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={plan.buttonAction}
                                className={`mt-8 w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors ${plan.isCurrent ? 'bg-gray-200 text-brand-text-secondary cursor-not-allowed' : plan.isPopular ? 'bg-brand-blue text-white shadow-sm hover:bg-blue-700' : 'bg-white text-brand-blue border border-brand-blue hover:bg-blue-50'}`}
                                disabled={plan.isCurrent}
                            >
                                {plan.buttonText}
                            </button>
                            <ul role="list" className="mt-10 flex-1 space-y-4 text-sm leading-6 text-brand-text">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <Check className="h-6 w-5 flex-none text-brand-blue" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
