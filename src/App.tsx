import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Projects, CreateProject, ProjectAPIKeys, Project, Documents, ProjectSettings, Login, Signup } from 'routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:projectName" element={<Project />} />
        <Route path="/projects/:projectName/apikeys" element={<ProjectAPIKeys />} />
        <Route path="/projects/:projectName/documents/*" element={<Documents />} />
        <Route path="/projects/:projectName/settings" element={<ProjectSettings />} />
        <Route path="/" element={<Navigate to="/projects" />} />
      </Routes>
    </Router>
  );
}

export default App;
