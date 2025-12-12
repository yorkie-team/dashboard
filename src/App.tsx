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

import { useEffect } from 'react';
import './assets/styles/style.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  PublicRoute,
  PrivateRoute,
  LoginPage,
  SignupPage,
  SettingsPage,
  ProjectsPage,
  CreateProjectPage,
  DocumentsPage,
  ChannelsPage,
  ProjectOverviewPage,
  ProjectQuickStartPage,
  ProjectAPIKeysPage,
  ProjectSettingsPage,
  CommunityPage,
  NotFoundPage,
} from 'pages';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { DocumentDetail, DocumentHistory } from 'features/documents';
import { selectPreferences, updateDarkTheme } from 'features/users/usersSlice';
import { TestPage, ButtonView, PopoverView, DropdownView, InputView, BreadcrumbView, ModalView } from 'test';
import { SchemaDetail } from 'features/schemas';
import { SchemasPage } from 'pages/SchemasPage';

const applyTheme = (theme: 'light' | 'dark') => {
  if (theme === 'light') {
    window.document.documentElement.classList.remove('darkmode');
    window.document.documentElement.style.colorScheme = 'light';
  } else {
    window.document.documentElement.classList.add('darkmode');
    window.document.documentElement.style.colorScheme = 'dark';
  }
};

function App() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(selectPreferences);
  useEffect(() => {
    applyTheme(theme.darkMode ? 'dark' : 'light');
  }, [theme.darkMode]);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      dispatch(updateDarkTheme(e.matches ? 'dark' : 'light'));
      applyTheme(e.matches ? 'dark' : 'light');
    };

    if (theme.useSystem) {
      applyTheme(mediaQueryList.matches ? 'dark' : 'light');
      mediaQueryList.addEventListener('change', handleSystemThemeChange);
    }
    return () => {
      mediaQueryList.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme.useSystem]);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<CreateProjectPage />} />
          <Route path="/projects/:projectName" element={<ProjectOverviewPage />} />
          <Route path="/projects/:projectName/quickstart" element={<ProjectQuickStartPage />} />
          <Route path="/projects/:projectName/apikeys" element={<ProjectAPIKeysPage />} />
          <Route path="/projects/:projectName/settings" element={<ProjectSettingsPage />} />
          <Route path="/projects/:projectName/documents" element={<DocumentsPage />}>
            <Route path=":documentKey" element={<DocumentDetail />} />
            <Route path=":documentKey/history" element={<DocumentHistory />} />
          </Route>
          <Route path="/projects/:projectName/channels" element={<ChannelsPage />} />
          <Route path="/projects/:projectName/schemas" element={<SchemasPage />}>
            <Route path="/projects/:projectName/schemas/new" element={<SchemaDetail />} />
            <Route path=":schemaName" element={<SchemaDetail />} />
          </Route>
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/community" element={<CommunityPage />} />
        {import.meta.env.DEV && (
          <Route path="/test" element={<TestPage />}>
            <Route path="/test" element={<Navigate to="./button" />} />
            <Route path="/test/button" element={<ButtonView />} />
            <Route path="/test/popover" element={<PopoverView />} />
            <Route path="/test/dropdown" element={<DropdownView />} />
            <Route path="/test/input" element={<InputView />} />
            <Route path="/test/breadcrumb" element={<BreadcrumbView />} />
            <Route path="/test/modal" element={<ModalView />} />
          </Route>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
