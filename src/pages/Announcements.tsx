import { useState } from 'react';
import { Megaphone, Calendar, Bell, ShieldCheck, Server, CheckCheck } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

interface AnnouncementCardProps {
    id: number;
    icon: React.ReactNode;
    title: string;
    date: string;
    text: string;
    isRead: boolean;
    onMarkAsRead: (id: number) => void;
}

const AnnouncementCard = ({ id, icon, title, date, text, isRead, onMarkAsRead }: AnnouncementCardProps) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
            <div className="p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-brand-dark">{title}</h3>
                        <div className="flex items-center gap-2 text-sm text-brand-text-secondary mt-1">
                            <Calendar size={14} />
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-brand-text-secondary leading-relaxed">
                    {text}
                </p>
                <div className="mt-6 flex justify-end">
                    {isRead ? (
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCheck size={18} />
                            <span className="text-sm font-medium">{t('read')}</span>
                        </div>
                    ) : (
                        <button
                            onClick={() => onMarkAsRead(id)}
                            className="text-sm font-medium text-brand-blue hover:underline"
                        >
                            {t('markAsRead')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Announcements = () => {
    const { t } = useTranslation();
    const [readAnnouncements, setReadAnnouncements] = useState<Set<number>>(new Set());

    const handleMarkAsRead = (id: number) => {
        setReadAnnouncements(prev => new Set(prev).add(id));
    };

    const announcements = [
        {
            id: 1,
            icon: <ShieldCheck size={24} />,
            title: t('announcement1Title'),
            date: t('announcement1Date'),
            text: t('announcement1Text'),
        },
        {
            id: 2,
            icon: <Server size={24} />,
            title: t('announcement2Title'),
            date: t('announcement2Date'),
            text: t('announcement2Text'),
        },
        {
            id: 3,
            icon: <Bell size={24} />,
            title: t('announcement3Title'),
            date: t('announcement3Date'),
            text: t('announcement3Text'),
        },
    ];

    return (
        <div className="bg-brand-light-gray">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <Megaphone size={40} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('announcementsTitle')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('announcementsSubtitle')}
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-1 lg:max-w-4xl lg:mx-auto">
                    {announcements.map((item) => (
                        <AnnouncementCard 
                            key={item.id} 
                            {...item}
                            isRead={readAnnouncements.has(item.id)}
                            onMarkAsRead={handleMarkAsRead}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Announcements;
