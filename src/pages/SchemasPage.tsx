/*
 * Copyright 2025 The Yorkie Authors. All rights reserved.
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
import { useParams, useLocation, Outlet } from 'react-router-dom';
import { ProjectPageTemplate } from 'pages';
import { SchemaList } from 'features/schemas';

export function SchemasPage() {
  const schemaName = useParams().schemaName || '';
  const location = useLocation();
  const isCreatePage = location.pathname.endsWith('/new');
  const shouldShowSidebar = schemaName || isCreatePage;

  return (
    <ProjectPageTemplate className="project_document_page">
      <div className={shouldShowSidebar ? 'document_detail_area' : 'document_list_area'}>
        {shouldShowSidebar ? (
          <div className="sidebar">
            <SchemaList isDetailOpen />
          </div>
        ) : (
          <SchemaList />
        )}
        <Outlet />
      </div>
    </ProjectPageTemplate>
  );
}
