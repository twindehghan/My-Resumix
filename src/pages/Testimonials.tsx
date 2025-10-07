import { Quote } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const testimonials = [
    {
        textKey: 'testimonial1',
        nameKey: 'testimonial1Name',
        roleKey: 'testimonial1Role',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop',
    },
    {
        textKey: 'testimonial2',
        nameKey: 'testimonial2Name',
        roleKey: 'testimonial2Role',
        imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1899&auto=format&fit=crop',
    },
    {
        textKey: 'testimonial3',
        nameKey: 'testimonial3Name',
        roleKey: 'testimonial3Role',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    }
];

const TestimonialsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <Quote size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('testimonial')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('testimonialsSubtitle')}
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.nameKey} className="flex flex-col rounded-lg border border-gray-200 bg-brand-light-gray p-8">
                            <Quote size={24} className="text-brand-blue" />
                            <p className="mt-4 flex-1 text-brand-text-secondary">"{t(testimonial.textKey as any)}"</p>
                            <div className="mt-6 flex items-center gap-4">
                                <img className="h-12 w-12 rounded-full object-cover" src={testimonial.imageUrl} alt={t(testimonial.nameKey as any)} />
                                <div>
                                    <p className="font-semibold text-brand-dark">{t(testimonial.nameKey as any)}</p>
                                    <p className="text-sm text-brand-text-secondary">{t(testimonial.roleKey as any)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPage;
