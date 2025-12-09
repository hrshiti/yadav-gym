import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import EntryPage from './pages/EntryPage';
import MemberLayout from './layouts/MemberLayout';
import MemberDashboard from './pages/member/MemberDashboard';
import MemberStats from './pages/member/MemberStats';
import DailyTracking from './pages/member/DailyTracking';
import MemberChat from './pages/member/MemberChat';
import TrainerLayout from './layouts/TrainerLayout';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerProgress from './pages/trainer/TrainerProgress';
import TrainerMembers from './pages/trainer/TrainerMembers';
import TrainerWorkoutPlan from './pages/trainer/TrainerWorkoutPlan';
import TrainerBodyStats from './pages/trainer/TrainerBodyStats';
import TrainerChat from './pages/trainer/TrainerChat';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMembers from './pages/admin/AdminMembers';
import AdminTrainers from './pages/admin/AdminTrainers';
import AdminMemberProgress from './pages/admin/AdminMemberProgress';
import AdminAttendance from './pages/admin/AdminAttendance';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Entry Point */}
          <Route path="/" element={<EntryPage />} />
          
          {/* Auth Routes - Will be added in Chunk 5 */}
          {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
          {/* <Route path="/trainer/login" element={<TrainerLogin />} /> */}
          {/* <Route path="/member/login" element={<MemberLogin />} /> */}
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="members/add" element={<AdminMembers />} />
            <Route path="trainers" element={<AdminTrainers />} />
            <Route path="trainers/add" element={<AdminTrainers />} />
            <Route path="trainers/edit/:id" element={<AdminTrainers />} />
            <Route path="member-progress" element={<AdminMemberProgress />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Trainer Routes */}
          <Route path="/trainer" element={<TrainerLayout />}>
            <Route path="dashboard" element={<TrainerDashboard />} />
            <Route path="members" element={<TrainerMembers />} />
            <Route path="progress" element={<TrainerProgress />} />
            <Route path="workout-plan" element={<TrainerWorkoutPlan />} />
            <Route path="body-stats" element={<TrainerBodyStats />} />
            <Route path="chat" element={<TrainerChat />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Member Routes */}
          <Route path="/member" element={<MemberLayout />}>
            <Route path="dashboard" element={<MemberDashboard />} />
            <Route path="stats" element={<MemberStats />} />
            <Route path="daily-tracking" element={<DailyTracking />} />
            <Route path="chat" element={<MemberChat />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
