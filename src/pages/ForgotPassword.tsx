import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, ArrowLeft } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import { useTranslation } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const ForgotPasswordPage = () => {
    const { t } = useTranslation();
    const { resetPasswordForEmail } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        const { error } = await resetPasswordForEmail(email, {
             redirectTo: `${window.location.origin}/login`,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage(t('resetLinkSent'));
        }
        setLoading(false);
    };

    return (
        <AuthLayout>
            <div className="w-full">
                {message ? (
                    <div className="text-center">
                        <MailCheck className="mx-auto h-16 w-16 text-green-500" />
                        <h1 className="mt-4 text-2xl font-bold text-brand-dark">{t('resetLinkSentTitle')}</h1>
                        <p className="mt-2 text-lg text-gray-600">{message}</p>
                        <Link to="/login" className="mt-8 inline-flex items-center gap-2 font-medium text-brand-blue hover:underline">
                            <ArrowLeft size={16} /> {t('backToLogin')}
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-brand-dark">{t('forgotPasswordTitle')}</h1>
                        <p className="mt-2 text-gray-600">{t('forgotPasswordSubtitle')}</p>
                        
                        <form onSubmit={handlePasswordReset} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    required 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" 
                                />
                            </div>
                            
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full py-3 px-4 bg-brand-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                            >
                                {loading ? 'Sending...' : t('sendResetLink')}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            <Link to="/login" className="font-medium text-brand-blue hover:underline">{t('backToLogin')}</Link>
                        </p>
                    </>
                )}
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
