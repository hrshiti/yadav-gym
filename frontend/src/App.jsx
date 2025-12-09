import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import EntryPage from './pages/EntryPage';
import MemberLayout from './layouts/MemberLayout';
import MemberDashboard from './pages/member/MemberDashboard';
import MemberStats from './pages/member/MemberStats';
import DailyTracking from './pages/member/DailyTracking';
import MemberChat from './pages/member/MemberChat';
import MemberWorkoutPlan from './pages/member/MemberWorkoutPlan';
import MemberDietPlan from './pages/member/MemberDietPlan';
import TrainerLayout from './layouts/TrainerLayout';
// Auth Pages
import AdminLogin from './pages/auth/AdminLogin';
import AdminSignup from './pages/auth/AdminSignup';
import TrainerLogin from './pages/auth/TrainerLogin';
import TrainerSignup from './pages/auth/TrainerSignup';
import MemberLogin from './pages/auth/MemberLogin';
import MemberSignup from './pages/auth/MemberSignup';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerProgress from './pages/trainer/TrainerProgress';
import TrainerMembers from './pages/trainer/TrainerMembers';
import TrainerWorkoutPlan from './pages/trainer/TrainerWorkoutPlan';
import TrainerBodyStats from './pages/trainer/TrainerBodyStats';
import TrainerChat from './pages/trainer/TrainerChat';
import TrainerAttendance from './pages/trainer/TrainerAttendance';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMembers from './pages/admin/AdminMembers';
import AdminTrainers from './pages/admin/AdminTrainers';
import AdminMemberProgress from './pages/admin/AdminMemberProgress';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminWorkoutPlans from './pages/admin/AdminWorkoutPlans';
import AdminDietPlans from './pages/admin/AdminDietPlans';
import AdminTrainerAssignment from './pages/admin/AdminTrainerAssignment';

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
          
          {/* Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/trainer/login" element={<TrainerLogin />} />
          <Route path="/trainer/signup" element={<TrainerSignup />} />
          <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/signup" element={<MemberSignup />} />
          
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
            <Route path="workout-plans" element={<AdminWorkoutPlans />} />
            <Route path="diet-plans" element={<AdminDietPlans />} />
            <Route path="trainer-assignment" element={<AdminTrainerAssignment />} />
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
            <Route path="attendance" element={<TrainerAttendance />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Member Routes */}
          <Route path="/member" element={<MemberLayout />}>
            <Route path="dashboard" element={<MemberDashboard />} />
            <Route path="stats" element={<MemberStats />} />
            <Route path="daily-tracking" element={<DailyTracking />} />
            <Route path="chat" element={<MemberChat />} />
            <Route path="workout" element={<MemberWorkoutPlan />} />
            <Route path="diet" element={<MemberDietPlan />} />
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
