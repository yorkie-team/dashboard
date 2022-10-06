/*
 * Copyright 2022 The Yorkie Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import './app.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  PrivateRoute,
  LoginPage,
  SignupPage,
  ProjectsPage,
  CreateProjectPage,
  DocumentsPage,
  ProjectOverviewPage,
  ProjectAPIKeysPage,
  ProjectSettingsPage,
  NotFoundPage,
  TestPage,
} from 'pages';
import { DocumentDetail } from 'features/documents';
import { ButtonView, PopoverView, DropdownView, InputView, BreadcrumbView } from 'component-view';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/test" element={<TestPage />}>
          <Route path="/test" element={<Navigate to="./button" />} />
          <Route path="/test/button" element={<ButtonView />} />
          <Route path="/test/popover" element={<PopoverView />} />
          <Route path="/test/dropdown" element={<DropdownView />} />
          <Route path="/test/input" element={<InputView />} />
          <Route path="/test/breadcrumb" element={<BreadcrumbView />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/projects" />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<CreateProjectPage />} />
          <Route path="/projects/:projectName" element={<ProjectOverviewPage />} />
          <Route path="/projects/:projectName/apikeys" element={<ProjectAPIKeysPage />} />
          <Route path="/projects/:projectName/settings" element={<ProjectSettingsPage />} />
          <Route path="/projects/:projectName/documents" element={<DocumentsPage />}>
            <Route path=":documentKey" element={<DocumentDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
