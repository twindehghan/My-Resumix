import { Newspaper, ArrowRight, UserCircle, Calendar } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const posts = [
    {
        titleKey: 'blogPost1Title',
        excerptKey: 'blogPost1Excerpt',
        authorKey: 'blogPost1Author',
        dateKey: 'blogPost1Date',
        imageUrl: 'https://images.unsplash.com/photo-1583321440284-c434865239e5?q=80&w=1770&auto=format&fit=crop',
        isFeatured: true,
    },
    {
        titleKey: 'blogPost2Title',
        excerptKey: 'blogPost2Excerpt',
        authorKey: 'blogPost2Author',
        dateKey: 'blogPost2Date',
        imageUrl: 'https://images.unsplash.com/photo-1573496130407-57329f01f769?q=80&w=1769&auto=format&fit=crop',
        isFeatured: false,
    },
    {
        titleKey: 'blogPost3Title',
        excerptKey: 'blogPost3Excerpt',
        authorKey: 'blogPost3Author',
        dateKey: 'blogPost3Date',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1771&auto=format&fit=crop',
        isFeatured: false,
    },
];

const BlogPage = () => {
    const { t } = useTranslation();
    const featuredPost = posts.find(p => p.isFeatured);
    const otherPosts = posts.filter(p => !p.isFeatured);

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <Newspaper size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('blog')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('blogSubtitle')}
                    </p>
                </div>

                {featuredPost && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-brand-dark mb-8">{t('featuredPost')}</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-brand-light-gray rounded-lg p-8">
                            <img src={featuredPost.imageUrl} alt={t(featuredPost.titleKey as any)} className="rounded-lg object-cover w-full h-80" />
                            <div>
                                <h3 className="text-2xl font-semibold text-brand-dark">{t(featuredPost.titleKey as any)}</h3>
                                <div className="flex items-center gap-4 text-sm text-brand-text-secondary my-4">
                                    <div className="flex items-center gap-2"><UserCircle size={16} /> {t(featuredPost.authorKey as any)}</div>
                                    <div className="flex items-center gap-2"><Calendar size={16} /> {t(featuredPost.dateKey as any)}</div>
                                </div>
                                <p className="text-brand-text-secondary leading-relaxed">{t(featuredPost.excerptKey as any)}</p>
                                <Link to="#" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-blue">
                                    {t('readMore')} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-brand-dark mb-8">{t('allPosts')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {otherPosts.map((post) => (
                            <div key={post.titleKey} className="bg-brand-light-gray rounded-lg overflow-hidden">
                                <img src={post.imageUrl} alt={t(post.titleKey as any)} className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-brand-dark">{t(post.titleKey as any)}</h3>
                                    <div className="flex items-center gap-4 text-sm text-brand-text-secondary my-3">
                                        <div className="flex items-center gap-2"><UserCircle size={16} /> {t(post.authorKey as any)}</div>
                                        <div className="flex items-center gap-2"><Calendar size={16} /> {t(post.dateKey as any)}</div>
                                    </div>
                                    <p className="text-brand-text-secondary leading-relaxed text-sm">{t(post.excerptKey as any)}</p>
                                    <Link to="#" className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-blue text-sm">
                                        {t('readMore')} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
