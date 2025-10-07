import { useTranslation } from '../contexts/LanguageContext';
import { BellPlus } from 'lucide-react';

const AddReminder = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-lg">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <BellPlus size={48} className="text-brand-blue" />
                        </div>
                        <h1 className="text-4xl font-bold text-brand-dark">{t('addReminderTitle')}</h1>
                        <p className="mt-2 text-lg text-brand-text-secondary">{t('addReminderSubtitle')}</p>
                    </div>

                    <form className="space-y-6 rounded-lg border border-gray-200 p-8 shadow-sm">
                        <div>
                            <label htmlFor="reminderTitle" className="block text-sm font-medium text-gray-700">{t('reminderTitle')}</label>
                            <input type="text" id="reminderTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="reminderDate" className="block text-sm font-medium text-gray-700">{t('reminderDate')}</label>
                                <input type="date" id="reminderDate" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                            </div>
                            <div>
                                <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700">{t('reminderTime')}</label>
                                <input type="time" id="reminderTime" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="reminderNotes" className="block text-sm font-medium text-gray-700">{t('reminderNotes')}</label>
                            <textarea id="reminderNotes" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"></textarea>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <button type="button" className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-brand-text-secondary hover:bg-gray-50">{t('cancel')}</button>
                            <button type="submit" className="rounded-lg bg-brand-blue px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700">{t('save')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReminder;
