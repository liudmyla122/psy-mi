import { Route, Routes, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/Register/Register';
import { TestsPage } from './pages/Test/Tests';
import { AboutPage } from './pages/About/About';
import { ArticlesPage } from './pages/Articles/Articles';
import { EmotionalIntelligencePage } from './pages/Test/EmotionalIntelligence/EmotionalIntelligence';
import { MBIPage } from './pages/Test/MBI/MBI';
import { MBTIPage } from './pages/Test/MBTI/MBTI';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tests" element={<TestsPage />} />
      <Route path="/ua/tests" element={<TestsPage />} />
      <Route path="/en/tests" element={<TestsPage />} />
      <Route path="/emotional-intelligence" element={<EmotionalIntelligencePage />} />
      <Route path="/ua/emotional-intelligence" element={<EmotionalIntelligencePage />} />
      <Route path="/en/emotional-intelligence" element={<EmotionalIntelligencePage />} />
      <Route path="/test/mbi" element={<MBIPage />} />
      <Route path="/ua/test/mbi" element={<MBIPage />} />
      <Route path="/en/test/mbi" element={<MBIPage />} />
      <Route path="/test/mbti" element={<MBTIPage />} />
      <Route path="/ua/test/mbti" element={<MBTIPage />} />
      <Route path="/en/test/mbti" element={<MBTIPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/ua/about" element={<AboutPage />} />
      <Route path="/en/about" element={<AboutPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/ua/articles" element={<ArticlesPage />} />
      <Route path="/en/articles" element={<ArticlesPage />} />
      <Route path="/news" element={<ArticlesPage />} />
      <Route path="/ua/news" element={<ArticlesPage />} />
      <Route path="/en/news" element={<ArticlesPage />} />
      <Route path="/ua/my-profile" element={<TestsPage />} />
      <Route path="/en/my-profile" element={<TestsPage />} />
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}
