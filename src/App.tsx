import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  Projects,
  CreateProject,
  ProjectAPIKeys,
  Project,
  Documents,
  Settings,
} from 'routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:projectName" element={<Project />} />
        <Route path="/projects/:projectName/apikeys" element={<ProjectAPIKeys />} />
        <Route path="/projects/:projectName/documents/*" element={<Documents />} />
        <Route path="/projects/:projectName/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/projects" />} />
      </Routes>
    </Router>
  );
}

export default App;
