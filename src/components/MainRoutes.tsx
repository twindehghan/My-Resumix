import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const OurTools = lazy(() => import('../pages/OurTools'));
const CoverLetterBuilder = lazy(() => import('../pages/CoverLetterBuilder'));
const PracticeQuestions = lazy(() => import('../pages/PracticeQuestions'));
const InterviewGuide = lazy(() => import('../pages/InterviewGuide'));
const LearnWithUs = lazy(() => import('../pages/LearnWithUs'));
const Mentoring = lazy(() => import('../pages/Mentoring'));
const Courses = lazy(() => import('../pages/Courses'));
const Resources = lazy(() => import('../pages/Resources'));
const About = lazy(() => import('../pages/About'));
const Blog = lazy(() => import('../pages/Blog'));
const Testimonials = lazy(() => import('../pages/Testimonials'));
const ForCompanies = lazy(() => import('../pages/ForCompanies'));
const RewardsPage = lazy(() => import('../pages/RewardsPage'));
const NotFound = lazy(() => import('../pages/NotFound'));
const ResumeEditor = lazy(() => import('../pages/ResumeEditor'));
const CoverLetterEditor = lazy(() => import('../pages/CoverLetterEditor'));
const AddReminder = lazy(() => import('../pages/AddReminder'));
const Announcements = lazy(() => import('../pages/Announcements'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Logout = lazy(() => import('../pages/Logout'));
const PricingPage = lazy(() => import('../pages/Pricing'));

const MainRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="resume-builder" element={<Dashboard />} />
      <Route path="our-tools" element={<OurTools />} />
      <Route path="cover-letter-builder" element={<CoverLetterBuilder />} />
      <Route path="practice-questions" element={<PracticeQuestions />} />
      <Route path="interview-guides" element={<InterviewGuide />} />
      <Route path="learn-with-us" element={<LearnWithUs />} />
      <Route path="mentoring" element={<Mentoring />} />
      <Route path="courses" element={<Courses />} />
      <Route path="resources" element={<Resources />} />
      <Route path="about" element={<About />} />
      <Route path="blog" element={<Blog />} />
      <Route path="testimonials" element={<Testimonials />} />
      <Route path="for-companies" element={<ForCompanies />} />
      <Route path="rewards-page" element={<RewardsPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="resume/edit/:id" element={<ResumeEditor />} />
      <Route path="cover-letter/edit/:id" element={<CoverLetterEditor />} />
      <Route path="reminders/new" element={<AddReminder />} />
      <Route path="announcements" element={<Announcements />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
