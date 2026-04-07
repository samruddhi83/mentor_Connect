import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardLayoutEnhanced from '../layouts/DashboardLayoutEnhanced';

import Landing from '../pages/Landing';
import LandingEnhanced from '../pages/LandingEnhanced';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SlotsPage from '../pages/SlotsPage';

import LearnerHome from '../pages/learner/LearnerHome';
import LearnerHomeEnhanced from '../pages/learner/LearnerHomeEnhanced';
import SearchTutorsEnhanced from '../pages/learner/SearchTutorsEnhanced';
import MyBookingsEnhanced from '../pages/learner/MyBookingsEnhanced';
import TutorHome from '../pages/tutor/TutorHome';
import AvailabilityManagement from '../pages/tutor/AvailabilityManagement';
import ProfileManagement from '../pages/tutor/ProfileManagement';
import AppointmentsPage from '../pages/tutor/AppointmentsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingEnhanced />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="slots" element={<SlotsPage />} />
      </Route>

      {/* Protected Learner Routes */}
      <Route path="/learner" element={<DashboardLayoutEnhanced />}>
        <Route index element={<LearnerHomeEnhanced />} />
        <Route path="search" element={<SearchTutorsEnhanced />} />
        <Route path="bookings" element={<MyBookingsEnhanced />} />
        <Route path="subscriptions" element={<div>Subscriptions</div>} />
        <Route path="profile" element={<div>Learner Profile</div>} />
      </Route>

      {/* Protected Tutor Routes */}
      <Route path="/tutor" element={<DashboardLayoutEnhanced />}>
        <Route index element={<TutorHome />} />
        <Route path="availability" element={<AvailabilityManagement />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="profile" element={<ProfileManagement />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
