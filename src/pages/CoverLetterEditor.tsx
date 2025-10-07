import { useTranslation } from '../contexts/LanguageContext';
import { FileText } from 'lucide-react';

const CoverLetterEditor = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-brand-dark">{t('coverLetterEditorTitle')}</h1>
                        <p className="mt-2 text-lg text-brand-text-secondary">{t('coverLetterEditorSubtitle')}</p>
                    </div>

                    <form className="space-y-8">
                        <div className="rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <FileText className="text-brand-blue" size={24} />
                                <h2 className="text-2xl font-semibold text-brand-dark">{t('coverLetterContent')}</h2>
                            </div>
                            <div>
                                <textarea
                                    id="coverLetterContent"
                                    rows={20}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
                                    placeholder="Start writing your cover letter here..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <button type="button" className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-brand-text-secondary hover:bg-gray-50">{t('cancel')}</button>
                            <button type="submit" className="rounded-lg bg-brand-blue px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700">{t('save')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterEditor;
