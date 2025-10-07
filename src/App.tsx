import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import OurTools from './pages/OurTools';
import CoverLetterBuilder from './pages/CoverLetterBuilder';
import PracticeQuestions from './pages/PracticeQuestions';
import InterviewGuide from './pages/InterviewGuide';
import LearnWithUs from './pages/LearnWithUs';
import Mentoring from './pages/Mentoring';
import Courses from './pages/Courses';
import VirtualInternship from './pages/VirtualInternship';
import Resources from './pages/Resources';
import About from './pages/About';
import Blog from './pages/Blog';
import Testimonials from './pages/Testimonials';
import ForCompanies from './pages/ForCompanies';
import RewardsPage from './pages/RewardsPage';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import ResumeEditor from './pages/ResumeEditor';
import CoverLetterEditor from './pages/CoverLetterEditor';
import AddReminder from './pages/AddReminder';
import Announcements from './pages/Announcements';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Logout from './pages/Logout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="resume-builder" element={<Dashboard />} />
        <Route path="our-tools" element={<OurTools />} />
        <Route path="cover-letter-builder" element={<CoverLetterBuilder />} />
        <Route path="practice-questions" element={<PracticeQuestions />} />
        <Route path="interview-guides" element={<InterviewGuide />} />
        <Route path="learn-with-us" element={<LearnWithUs />} />
        <Route path="mentoring" element={<Mentoring />} />
        <Route path="courses" element={<Courses />} />
        <Route path="virtual-internship" element={<VirtualInternship />} />
        <Route path="resources" element={<Resources />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="for-companies" element={<ForCompanies />} />
        <Route path="rewards-page" element={<RewardsPage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="resume/new" element={<ResumeEditor />} />
        <Route path="cover-letter/new" element={<CoverLetterEditor />} />
        <Route path="reminders/new" element={<AddReminder />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
