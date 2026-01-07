import { Route, Routes, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/Register/Register';
import { TestsPage } from './pages/Test/Tests';
import { AboutPage } from './pages/About/About';
import { ArticlesPage } from './pages/Articles/Articles';
import { EmotionalIntelligencePage } from './pages/Test/EmotionalIntelligence/EmotionalIntelligence';
import { EmotionalIntelligenceResultPage } from './pages/Test/EmotionalIntelligence/EmotionalIntelligenceResult';
import { MBIPage } from './pages/Test/MBI/MBI';
import { MBTIPage } from './pages/Test/MBTI/MBTI';
import { MBTIResultPage } from './pages/Test/MBTI/MBTIResult';
import { EnneagramPage } from './pages/Test/Ennegram/Enneagram';
import { AdizesPage } from './pages/Test/Adizes/Adizes';
import { InnovationPotentialPage } from './pages/Test/InnovationPotential/InnovationPotential';
import { InnovationPotentialResultPage } from './pages/Test/InnovationPotential/InnovationPotentialResult';
import { ProfilePage } from './pages/Profile/Profile';
import { NotFoundPage } from './pages/NotFound/NotFound';
import { ForgotPasswordPage } from './pages/ForgotPassword/ForgotPassword';
import { ResetPasswordPage } from './pages/ResetPassword/ResetPassword';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/tests" element={<TestsPage />} />
      <Route path="/ua/tests" element={<TestsPage />} />
      <Route path="/en/tests" element={<TestsPage />} />
      <Route path="/emotional-intelligence" element={<EmotionalIntelligencePage />} />
      <Route path="/ua/emotional-intelligence" element={<EmotionalIntelligencePage />} />
      <Route path="/en/emotional-intelligence" element={<EmotionalIntelligencePage />} />
      <Route path="/test/emotional-intelligence/result" element={<EmotionalIntelligenceResultPage />} />
      <Route path="/ua/test/emotional-intelligence/result" element={<EmotionalIntelligenceResultPage />} />
      <Route path="/en/test/emotional-intelligence/result" element={<EmotionalIntelligenceResultPage />} />
      <Route path="/test/mbi" element={<MBIPage />} />
      <Route path="/ua/test/mbi" element={<MBIPage />} />
      <Route path="/en/test/mbi" element={<MBIPage />} />
      <Route path="/test/mbti" element={<MBTIPage />} />
      <Route path="/ua/test/mbti" element={<MBTIPage />} />
      <Route path="/en/test/mbti" element={<MBTIPage />} />
      <Route path="/test/mbti/result" element={<MBTIResultPage />} />
      <Route path="/ua/test/mbti/result" element={<MBTIResultPage />} />
      <Route path="/en/test/mbti/result" element={<MBTIResultPage />} />
      <Route path="/test/enneagram" element={<EnneagramPage />} />
      <Route path="/ua/test/enneagram" element={<EnneagramPage />} />
      <Route path="/en/test/enneagram" element={<EnneagramPage />} />
      <Route path="/test/adizes" element={<AdizesPage />} />
      <Route path="/ua/test/adizes" element={<AdizesPage />} />
      <Route path="/en/test/adizes" element={<AdizesPage />} />
      <Route path="/test/innovation-potential" element={<InnovationPotentialPage />} />
      <Route path="/ua/test/innovation-potential" element={<InnovationPotentialPage />} />
      <Route path="/en/test/innovation-potential" element={<InnovationPotentialPage />} />
      <Route path="/test/innovation-potential/result" element={<InnovationPotentialResultPage />} />
      <Route path="/ua/test/innovation-potential/result" element={<InnovationPotentialResultPage />} />
      <Route path="/en/test/innovation-potential/result" element={<InnovationPotentialResultPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/ua/about" element={<AboutPage />} />
      <Route path="/en/about" element={<AboutPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/ua/articles" element={<ArticlesPage />} />
      <Route path="/en/articles" element={<ArticlesPage />} />
      <Route path="/news" element={<ArticlesPage />} />
      <Route path="/ua/news" element={<ArticlesPage />} />
      <Route path="/en/news" element={<ArticlesPage />} />
      <Route path="/ua/my-profile" element={<ProfilePage />} />
      <Route path="/en/my-profile" element={<ProfilePage />} />
      <Route path="/my-profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
