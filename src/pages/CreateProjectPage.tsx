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
import { RegisterForm } from 'features/projects';
import { PageTemplate } from 'pages';
import { Button, Container, Heading, Flex, Box, Link, Text, Grid, Menu } from 'yorkie-ui';

export function CreateProjectPage() {
  return (
    <PageTemplate className="project_create_page">
      <Container
        paddingBlock={{ base: '6', lg: '20' }}
        marginInline="auto"
        paddingInline={{ base: '6', lg: '0' }}
        width={{
          sm: 'breakpoint-sm',
          md: 'breakpoint-md',
        }}
      >
        <Flex justifyContent="space-between">
          <Heading as="h2" fontSize="2xl">
            Create new Project
          </Heading>
          <Button as="link" variant="outline" href="../">
            Cancel
          </Button>
        </Flex>
        <Box marginTop="10">
          <RegisterForm />
        </Box>
      </Container>
    </PageTemplate>
  );
}
