import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Chrome } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import { useTranslation } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const { t } = useTranslation();
    const { signInWithPassword, signInWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
        }
        // On success, the AuthProvider's onAuthStateChange will trigger a re-render
        // and the user will be redirected automatically by the logic in App.tsx.
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
                <h1 className="text-3xl font-bold text-brand-dark">{t('loginTitle')}</h1>
                <div className="mt-8 flex gap-4">
                    <SocialButton icon={<Chrome size={20} />} text={t('loginWithGoogle')} onClick={signInWithGoogle} />
                    <SocialButton icon={<Github size={20} />} text={t('loginWithGithub')} onClick={() => alert('GitHub login not implemented yet.')} />
                </div>

                <div className="my-8 flex items-center gap-4">
                    <hr className="flex-1 border-gray-200" />
                    <span className="text-sm text-gray-500">{t('orSeparator')}</span>
                    <hr className="flex-1 border-gray-200" />
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                    </div>
                    <div>
                        <div className="flex justify-between items-baseline">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('password')}</label>
                            <Link to="#" className="text-sm text-brand-blue hover:underline">{t('forgotPassword')}</Link>
                        </div>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-brand-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                        {loading ? 'Logging in...' : t('loginButton')}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    {t('noAccount')} <Link to="/signup" className="font-medium text-brand-blue hover:underline">{t('signUpLink')}</Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
