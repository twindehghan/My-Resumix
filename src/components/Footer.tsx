import { Instagram, Facebook, Twitter, Linkedin, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

const Footer = () => {
    const { t } = useTranslation();

    const socialLinks = [
        { icon: Instagram, href: '#' },
        { icon: Facebook, href: '#' },
        { icon: Twitter, href: '#' },
        { icon: Linkedin, href: '#' },
        { icon: Youtube, href: '#' },
        { icon: Send, href: '#' },
    ];

    const footerLinks = {
        [t('ourTools')]: [
            { name: t('resumeBuilderLink'), href: '/resume-builder' },
            { name: t('coverLetterBuilder'), href: '/cover-letter-builder' },
            { name: t('practiceQuestion'), href: '/practice-questions' },
            { name: t('interviewGuides'), href: '/interview-guides' },
        ],
        [t('learnWithUs')]: [
            { name: t('coaching'), href: '/mentoring' },
            { name: t('jobPortal'), href: '#' },
            { name: t('courses'), href: '/courses' },
            { name: t('virtualInternship'), href: '/virtual-internship' },
        ],
        [t('resources')]: [
            { name: t('about'), href: '/about' },
            { name: t('blog'), href: '/blog' },
            { name: t('testimonial'), href: '/testimonials' },
            { name: t('forCorporate'), href: '/for-companies' },
            { name: t('rewardPage'), href: '/rewards-page' },
            { name: t('pricing'), href: '/pricing' },
        ],
    };

    return (
        <footer className="bg-brand-dark text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">{t('siteName')}</h2>
                        <p className="mt-4 max-w-xs">{t('footerSlogan')}</p>
                        <div className="mt-6 flex space-x-4 rtl:space-x-reverse">
                            {socialLinks.map((link, index) => (
                                <a key={index} href={link.href} className="text-gray-400 hover:text-white">
                                    <link.icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-semibold text-white">{title}</h3>
                            <ul className="mt-4 space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.href} className="hover:text-white">{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <div className="flex space-x-4 rtl:space-x-reverse">
                        <Link to="#" className="hover:text-white">{t('privacyPolicy')}</Link>
                        <Link to="#" className="hover:text-white">{t('cookiePolicy')}</Link>
                    </div>
                    <p className="mt-4 sm:mt-0">{t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
