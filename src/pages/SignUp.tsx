import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Chrome, MailCheck } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import { useTranslation } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
    const { t } = useTranslation();
    const { signUp, signInWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        const { error } = await signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                // This will redirect the user to the login page after they verify their email.
                // You must add `http://localhost:5173/login` to your Supabase project's redirect URLs.
                emailRedirectTo: `${window.location.origin}/login`,
            },
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage("Check your email for the verification link!");
        }
        setLoading(false);
    };
    
    const SocialButton = ({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick: () => void }) => (
        <button onClick={onClick} className="flex-1 flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            {icon}
            <span className="text-sm font-medium text-brand-text">{text}</span>
        </button>
    );

    return (
        <AuthLayout>
            <div className="w-full">
                {message ? (
                    <div className="text-center">
                        <MailCheck className="mx-auto h-16 w-16 text-green-500" />
                        <h1 className="mt-4 text-2xl font-bold text-brand-dark">{t('signUpTitle')}</h1>
                        <p className="mt-2 text-lg text-gray-600">{message}</p>
                         <p className="mt-4 text-sm text-gray-500">
                            Once verified, you can <Link to="/login" className="font-medium text-brand-blue hover:underline">{t('loginLink')}</Link>.
                        </p>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-brand-dark">{t('signUpTitle')}</h1>
                        <div className="mt-8 flex gap-4">
                            <SocialButton icon={<Chrome size={20} />} text={t('loginWithGoogle')} onClick={signInWithGoogle} />
                            <SocialButton icon={<Github size={20} />} text={t('loginWithGithub')} onClick={() => alert('GitHub login not implemented yet.')} />
                        </div>

                        <div className="my-8 flex items-center gap-4">
                            <hr className="flex-1 border-gray-200" />
                            <span className="text-sm text-gray-500">{t('orSeparator')}</span>
                            <hr className="flex-1 border-gray-200" />
                        </div>

                        <form onSubmit={handleSignUp} className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{t('fullName')}</label>
                                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('password')}</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-brand-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                                {loading ? 'Signing up...' : t('signUpButton')}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            {t('haveAccount')} <Link to="/login" className="font-medium text-brand-blue hover:underline">{t('loginLink')}</Link>
                        </p>
                    </>
                )}
            </div>
        </AuthLayout>
    );
};

export default SignUpPage;
