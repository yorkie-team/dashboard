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

import React, { ReactNode } from 'react';
import { ProjectTabList, ProjectDropdown } from 'features/projects';
import { PageTemplate } from './PageTemplate';
import { Container, Box } from 'yorkie-ui';

export function ProjectPageTemplate({ className, children }: { className: string; children: ReactNode }) {
  return (
    <PageTemplate className={className}>
      <Container
        paddingBlock={{ base: '6', lg: '20' }}
        margin="auto"
        width={{
          sm: 'breakpoint-sm',
          md: 'breakpoint-md',
          lg: 'breakpoint-lg',
          xl: 'breakpoint-xl',
        }}
      >
        <Box fontSize="3xl">
          <ProjectDropdown size="large" icon={true} />
        </Box>
        <Box
          marginTop="12"
          overflowInline="scroll"
          whiteSpace="nowrap"
          paddingBottom={{ base: 2, lg: 0 }}
          paddingTop={{ base: 1, lg: 0 }}
        >
          <ProjectTabList />
        </Box>
        {children}
      </Container>
    </PageTemplate>
  );
}
