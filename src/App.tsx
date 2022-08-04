import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  Login,
  PrivateRoute,
  Projects,
  CreateProject,
  ProjectAPIKeys,
  Project,
  Documents,
  ProjectSettings,
} from 'routes';

function App() {
  // TODO(hackerwins): If the user is already logged in, redirect to the
  // projects page.
  
  // TODO(hackerwins): For now, all user can access to all projects in the cluster.
  // After implementing the user-specific project role, let's open the signup here.
  // <Route path="/signup" element={<Signup />} />
  
  // TODO(hackerwins): Redirect to 404 page when accessing non-existent pages.
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/projects" />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/:projectName" element={<Project />} />
          <Route path="/projects/:projectName/apikeys" element={<ProjectAPIKeys />} />
          <Route path="/projects/:projectName/documents/*" element={<Documents />} />
          <Route path="/projects/:projectName/settings" element={<ProjectSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
