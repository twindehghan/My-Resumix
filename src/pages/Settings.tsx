import { Settings as SettingsIcon, Lock, Bell } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const SettingsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl">
                    <div className="text-center mb-12">
                         <div className="mb-6 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                                <SettingsIcon size={36} />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('settingsTitle')}</h1>
                        <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                            {t('settingsSubtitle')}
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Account Settings */}
                        <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <Lock className="text-brand-blue" size={24} />
                                <h2 className="text-2xl font-semibold text-brand-dark">{t('accountSettings')}</h2>
                            </div>
                            <form className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900">{t('changePassword')}</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('currentPassword')}</label>
                                    <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('newPassword')}</label>
                                    <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('confirmNewPassword')}</label>
                                    <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="rounded-lg bg-brand-blue px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-700">{t('saveChanges')}</button>
                                </div>
                            </form>
                        </div>

                        {/* Notification Settings */}
                        <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <Bell className="text-brand-blue" size={24} />
                                <h2 className="text-2xl font-semibold text-brand-dark">{t('notificationSettings')}</h2>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">{t('emailNotifications')}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">{t('productUpdates')}</span>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" className="peer sr-only" defaultChecked />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-blue peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">{t('weeklySummary')}</span>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" className="peer sr-only" />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-blue peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
