import { Resume, CoverLetter } from './types';

// Note: In a real app, this data would come from an API.
// User-generated titles are stored in 'title', while static, translatable titles use 'titleKey'.

export const sampleResumes: Resume[] = [
  {
    id: 2,
    titleKey: 'sampleResumeTitle1',
    imageUrl: 'https://i.imgur.com/V0OOaht.png',
    users: 3752,
  },
  {
    id: 3,
    titleKey: 'sampleResumeTitle2',
    imageUrl: 'https://i.imgur.com/5nL1sA8.png',
    users: 3752,
    isLocked: true,
  },
  {
    id: 4,
    titleKey: 'sampleResumeTitle3',
    imageUrl: 'https://i.imgur.com/sUW4m6f.png',
    users: 3752,
  },
  {
    id: 5,
    titleKey: 'sampleResumeTitle4',
    imageUrl: 'https://i.imgur.com/9gVci3d.png',
    users: 3752,
    isLocked: true,
  },
];

export const myResumes: Resume[] = [
  {
    id: 1,
    titleKey: 'untitledResume',
    imageUrl: 'https://i.imgur.com/O2yP25T.png',
    lastUpdatedKey: 'lastUpdated2Days',
  },
  {
    id: 2,
    title: 'CV Rudian Santoso', 
    imageUrl: 'https://i.imgur.com/V0OOaht.png',
    lastUpdatedKey: 'lastUpdated2Days',
  },
  {
    id: 3,
    title: 'CV for Kindley',
    imageUrl: 'https://i.imgur.com/5nL1sA8.png',
    lastUpdatedKey: 'lastUpdated2Days',
  },
    {
    id: 4,
    titleKey: 'untitledResume',
    imageUrl: 'https://i.imgur.com/9gVci3d.png',
    lastUpdatedKey: 'lastUpdated2Days',
  },
    {
    id: 5,
    titleKey: 'untitledResume',
    imageUrl: 'https://i.imgur.com/sUW4m6f.png',
    lastUpdatedKey: 'lastUpdated2Days',
  },
];

export const sampleCoverLetters: CoverLetter[] = [
  {
    id: 1,
    titleKey: 'sampleCoverLetterTitle1',
    imageUrl: 'https://i.imgur.com/3tVn1kG.png',
    users: 1482,
  },
  {
    id: 2,
    titleKey: 'sampleCoverLetterTitle2',
    imageUrl: 'https://i.imgur.com/JbVqk2E.png',
    users: 2910,
    isLocked: true,
  },
  {
    id: 3,
    titleKey: 'sampleCoverLetterTitle3',
    imageUrl: 'https://i.imgur.com/D4xQ2gG.png',
    users: 849,
  },
  {
    id: 4,
    titleKey: 'sampleCoverLetterTitle4',
    imageUrl: 'https://i.imgur.com/N1aE5v8.png',
    users: 1120,
    isLocked: true,
  },
];

export const myCoverLetters: CoverLetter[] = [
  {
    id: 1,
    titleKey: 'untitledCoverLetter',
    imageUrl: 'https://i.imgur.com/pTf2g2R.png',
    lastUpdatedKey: 'lastUpdated1Day',
  },
  {
    id: 2,
    title: 'Application for Google',
    imageUrl: 'https://i.imgur.com/3tVn1kG.png',
    lastUpdatedKey: 'lastUpdated3Days',
  },
];
