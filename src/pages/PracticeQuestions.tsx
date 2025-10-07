import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const faqs = [
    {
        categoryKey: 'categoryBehavioral',
        questions: [
            { qKey: 'question1', aKey: 'practiceAnswer1' },
            { qKey: 'question2', aKey: 'practiceAnswer2' },
        ]
    },
    {
        categoryKey: 'categoryTechnical',
        questions: [
            { qKey: 'question3', aKey: 'practiceAnswer3' },
            { qKey: 'question4', aKey: 'practiceAnswer4' },
        ]
    },
    {
        categoryKey: 'categoryCase',
        questions: [
            { qKey: 'question5', aKey: 'practiceAnswer5' },
        ]
    }
];

const AccordionItem = ({ category, questions, isOpen, onClick }: any) => {
    const { t } = useTranslation();
    return (
        <div className="border-b border-gray-200">
            <button onClick={onClick} className="flex w-full items-center justify-between py-5 text-start">
                <span className="text-lg font-semibold text-brand-dark">{category}</span>
                <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-5 space-y-4">
                    {questions.map((faq: any, index: number) => (
                        <div key={index} className="ps-4">
                            <p className="font-semibold text-brand-text">{t(faq.qKey as any)}</p>
                            <p className="mt-1 text-sm text-brand-text-secondary">{t(faq.aKey as any)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PracticeQuestionsPage = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
                            <HelpCircle size={36} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t('practiceQuestion')}</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
                        {t('practiceQuestionsSubtitle')}
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-4xl">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={faq.categoryKey}
                            category={t(faq.categoryKey as any)}
                            questions={faq.questions}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PracticeQuestionsPage;
