import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';

import LearnerHome from '../pages/learner/LearnerHome';
import TutorHome from '../pages/tutor/TutorHome';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected Learner Routes */}
      <Route path="/learner" element={<DashboardLayout />}>
        <Route index element={<LearnerHome />} />
        <Route path="search" element={<div>Search Tutors</div>} />
        <Route path="bookings" element={<div>My Bookings</div>} />
        <Route path="subscriptions" element={<div>Subscriptions</div>} />
        <Route path="profile" element={<div>Learner Profile</div>} />
      </Route>

      {/* Protected Tutor Routes */}
      <Route path="/tutor" element={<DashboardLayout />}>
        <Route index element={<TutorHome />} />
        <Route path="availability" element={<div>Manage Availability</div>} />
        <Route path="appointments" element={<div>Appointments</div>} />
        <Route path="profile" element={<div>Tutor Profile</div>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
