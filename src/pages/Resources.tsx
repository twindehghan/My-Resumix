import { Library, Newspaper, Star, User, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const resourceLinks = [
    { icon: <Newspaper size={32} className="text-brand-blue" />, titleKey: 'ourBlog', descKey: 'ourBlogDesc', link: '/blog' },
    { icon: <Star size={32} className="text-brand-blue" />, titleKey: 'userStories', descKey: 'userStoriesDesc', link: '/testimonials' },
    { icon: <User size={32} className="text-brand-blue" />, titleKey: 'aboutUs', descKey: 'aboutUsDesc', link: '/about' },
];

const ResourcesPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <Library size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('resources')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('resourcesSubtitle')}
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {resourceLinks.map(resource => (
                        <Link to={resource.link} key={resource.titleKey} className="group block rounded-lg border border-gray-200 p-8 text-center transition-shadow hover:shadow-lg">
                            <div className="flex justify-center">{resource.icon}</div>
                            <h3 className="mt-6 text-xl font-semibold text-brand-dark">{t(resource.titleKey as any)}</h3>
                            <p className="mt-2 text-brand-text-secondary">{t(resource.descKey as any)}</p>
                            <div className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-blue">
                                {t('learnMore')} <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
