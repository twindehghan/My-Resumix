import { User, Mail, Calendar } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const ProfilePage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                                <img className="h-20 w-20 rounded-full object-cover" src="https://i.imgur.com/T5yG4P9.jpg" alt="User avatar" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('profileTitle')}</h1>
                        <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                            {t('profileSubtitle')}
                        </p>
                    </div>

                    <form className="space-y-6 rounded-lg border border-gray-200 p-8 shadow-sm bg-brand-light-gray">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{t('fullName')}</label>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="text" id="fullName" defaultValue="Dory Jordan" className="block w-full rounded-md border-gray-300 ps-10 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="email" id="email" defaultValue="dory.jordan@example.com" className="block w-full rounded-md border-gray-300 ps-10 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="joinedDate" className="block text-sm font-medium text-gray-700">{t('joinedDate')}</label>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="text" id="joinedDate" defaultValue="October 20, 2025" readOnly className="block w-full rounded-md border-gray-300 bg-gray-100 ps-10 shadow-sm" />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" className="rounded-lg bg-brand-blue px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700">{t('saveChanges')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
