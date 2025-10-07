import { Info, Users, Target, Eye } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const teamMembers = [
    { nameKey: 'teamMember1Name', roleKey: 'teamMember1Role', imageUrl: 'https://i.imgur.com/6VBx3io.jpg' },
    { nameKey: 'teamMember2Name', roleKey: 'teamMember2Role', imageUrl: 'https://i.imgur.com/iN12l0G.jpg' },
    { nameKey: 'teamMember3Name', roleKey: 'teamMember3Role', imageUrl: 'https://i.imgur.com/3q1ihzM.jpg' },
    { nameKey: 'teamMember4Name', roleKey: 'teamMember4Role', imageUrl: 'https://i.imgur.com/dJk2Lfg.jpg' },
];

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <Info size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('about')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('aboutSubtitle')}
                    </p>
                </div>

                <div className="mt-20 mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold text-center text-brand-dark">{t('aboutStoryTitle')}</h2>
                    <p className="mt-6 text-brand-text-secondary leading-relaxed text-center">
                        {t('aboutStoryText')}
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-brand-light-gray p-8 rounded-lg text-center">
                        <div className="flex justify-center mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                                <Target size={28} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-brand-dark">{t('aboutMissionTitle')}</h3>
                        <p className="mt-4 text-brand-text-secondary">{t('aboutMissionText')}</p>
                    </div>
                    <div className="bg-brand-light-gray p-8 rounded-lg text-center">
                        <div className="flex justify-center mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                                <Eye size={28} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-brand-dark">{t('aboutVisionTitle')}</h3>
                        <p className="mt-4 text-brand-text-secondary">{t('aboutVisionText')}</p>
                    </div>
                </div>

                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center text-brand-dark">{t('aboutMeetTeam')}</h2>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.nameKey} className="text-center">
                                <img className="mx-auto h-32 w-32 rounded-full object-cover" src={member.imageUrl} alt={t(member.nameKey as any)} loading="lazy" />
                                <h4 className="mt-4 text-lg font-semibold text-brand-dark">{t(member.nameKey as any)}</h4>
                                <p className="text-brand-blue">{t(member.roleKey as any)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
