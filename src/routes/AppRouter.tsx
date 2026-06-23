import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/common/AppLayout';
import Dashboard from '@/pages/Dashboard';
import CheckIn from '@/pages/CheckIn';
import Breathing from '@/pages/Breathing';
import History from '@/pages/History';
import Resources from '@/pages/Resources';
import NotFound from '@/pages/NotFound';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="check-in" element={<CheckIn />} />
          <Route path="breathing" element={<Breathing />} />
          <Route path="history" element={<History />} />
          <Route path="resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
