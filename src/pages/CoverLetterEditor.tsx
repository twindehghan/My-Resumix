import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import { FileText, Loader2 } from 'lucide-react';
import { getDocument, updateDocument } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

const CoverLetterEditor = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('Untitled Cover Letter');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCoverLetter = async () => {
            if (!id || !user) return;
            try {
                setLoading(true);
                setError(null);
                const data = await getDocument(id, 'cover_letters');
                 if (data.user_id !== user.id) {
                    setError("You don't have permission to edit this cover letter.");
                    return;
                }
                setContent(data.document_data?.content || '');
                setTitle(data.title || 'Untitled Cover Letter');
            } catch (err) {
                setError("Failed to load cover letter data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCoverLetter();
    }, [id, user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        setSaving(true);
        try {
            await updateDocument(id, 'cover_letters', { content }, title);
        } catch (err) {
            setError("Failed to save cover letter.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" size={40} /></div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-brand-dark">{t('coverLetterEditorTitle')}</h1>
                        <p className="mt-2 text-lg text-brand-text-secondary">{t('coverLetterEditorSubtitle')}</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSave}>
                         <div className="rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <FileText className="text-brand-blue" size={24} />
                                <h2 className="text-2xl font-semibold text-brand-dark">{t('coverLetterContent')}</h2>
                            </div>
                            <div>
                                <label htmlFor="coverLetterTitle" className="block text-sm font-medium text-gray-700">Title</label>
                                <input 
                                    type="text"
                                    id="coverLetterTitle"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue mb-6"
                                />
                                <textarea
                                    id="coverLetterContent"
                                    rows={20}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
                                    placeholder={t('coverLetterPlaceholder')}
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <button type="button" onClick={() => navigate('/cover-letter-builder')} className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-brand-text-secondary hover:bg-gray-50">{t('cancel')}</button>
                            <button type="submit" disabled={saving} className="rounded-lg bg-brand-blue px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:bg-gray-400">
                                {saving ? 'Saving...' : t('save')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterEditor;
