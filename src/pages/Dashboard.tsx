import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight, Bell, X, Rocket, ThumbsUp, UserPlus, Link as LinkIcon, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import ResumeCard from '../components/ResumeCard';
import { useTranslation } from '../contexts/LanguageContext';
import { sampleResumes, myResumes } from '../data';

function Dashboard() {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      {showBanner && (
        <div className="bg-brand-dark text-white">
          <div className="container mx-auto flex items-center justify-center gap-4 px-4 py-3 text-center text-sm">
            <p>{t('bannerText')}</p>
            <button onClick={() => setShowBanner(false)} className="text-gray-300 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <section>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">{t('resumeBuilder')}</h2>
              <p className="mt-1 text-brand-text-secondary">{t('resumeBuilderSub')}</p>
            </div>
            <Link to="/resume/new" className="flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700">
              <Plus size={20} />
              <span>{t('newResume')}</span>
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-semibold">{t('sampleResume')}</h3>
            <a href="#" className="flex items-center gap-2 font-semibold text-brand-blue">
              <span>{t('seeAll')}</span>
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <ResumeCard type="blank" docType="resume" />
            {sampleResumes.map(resume => (
              <ResumeCard key={resume.id} type="sample" docType="resume" {...resume} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-6">
              <h3 className="text-xl sm:text-2xl font-semibold">{t('myResume')}</h3>
              <div className="flex gap-4 text-brand-text-secondary">
                <button className="relative font-semibold text-brand-blue after:absolute after:bottom-[-4px] after:start-0 after:h-0.5 after:w-full after:bg-brand-blue">{t('draft')} {myResumes.length}</button>
                <button className="font-semibold hover:text-brand-blue">{t('completed')} 0</button>
              </div>
            </div>
            <Link to="/reminders/new" className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-brand-text-secondary hover:bg-gray-50">
              <Bell size={16} />
              <span>{t('addReminder')}</span>
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {myResumes.map(resume => (
              <ResumeCard key={resume.id} type="my-document" docType="resume" {...resume} />
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg bg-brand-dark p-6 sm:p-8 text-white">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-6">
              <div className="hidden sm:block">
                <Rocket size={48} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">{t('ctaTitle')}</h3>
                <p className="mt-1 text-gray-300">{t('ctaSubtitle')}</p>
              </div>
            </div>
            <Link to="/pricing" className="flex-shrink-0 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-700">
              {t('upgrade')}
            </Link>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <ThumbsUp size={24} className="text-green-600" />
                </div>
                <h4 className="text-lg font-semibold">{t('scoreTitle')}</h4>
              </div>
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">{t('scoreBeta')}</span>
            </div>
            <p className="mt-4 text-brand-text-secondary">{t('scoreText')}</p>
            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-center transition hover:bg-blue-100">
                 <a href="#" className="flex items-center justify-center gap-2 font-semibold text-brand-blue">
                    <span>{t('tryItOut')}</span>
                    <ArrowRight size={16} />
                </a>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6">
             <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <UserPlus size={24} className="text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold">{t('referTitle')}</h4>
              </div>
            <p className="mt-4 text-brand-text-secondary">{t('referText')}</p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <div className="flex space-x-2 rtl:space-x-reverse">
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white transition hover:bg-sky-600"><Twitter size={20}/></a>
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white transition hover:bg-blue-800"><Linkedin size={20}/></a>
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600"><MessageCircle size={20}/></a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="h-px w-8 bg-gray-300"></div>
                  or
                  <div className="h-px w-8 bg-gray-300"></div>
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-brand-text-secondary hover:bg-gray-50">
                    <LinkIcon size={16} />
                    <span>{t('getInvitationLink')}</span>
                </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
