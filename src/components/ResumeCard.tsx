import { Plus, Lock, Users } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

interface ResumeCardProps {
  docType: 'resume' | 'cover-letter';
  type: 'blank' | 'sample' | 'my-document';
  title?: string;
  titleKey?: string;
  imageUrl?: string;
  users?: number;
  lastUpdatedKey?: string;
  isLocked?: boolean;
}

const ResumeCard = ({ docType, type, title, titleKey, imageUrl, users, lastUpdatedKey, isLocked }: ResumeCardProps) => {
  const { t } = useTranslation();

  const createBlankText = docType === 'resume' ? t('createBlank') : t('createBlankCoverLetter');
  const displayTitle = titleKey ? t(titleKey as any) : title;

  if (type === 'blank') {
    return (
      <div className="flex h-full min-h-[300px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white text-gray-500 transition hover:border-brand-blue hover:text-brand-blue">
        <Plus size={48} />
        <span className="mt-2 font-semibold">{createBlankText}</span>
      </div>
    );
  }

  return (
    <div className="group w-full cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img src={imageUrl} alt={displayTitle} className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Lock size={32} className="text-white" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="truncate font-semibold text-brand-text">{displayTitle}</h3>
        {type === 'sample' && users && (
          <div className="mt-2 flex items-center text-sm text-brand-text-secondary">
            <Users size={16} className="me-1.5" />
            <span>{t('chosenBy')} {users.toLocaleString()} {t('users')}</span>
          </div>
        )}
        {type === 'my-document' && lastUpdatedKey && (
          <p className="mt-2 text-sm text-brand-text-secondary">{t('lastUpdated')} {t(lastUpdatedKey as any)}</p>
        )}
      </div>
    </div>
  );
};

export default ResumeCard;
