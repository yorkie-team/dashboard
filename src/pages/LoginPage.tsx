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
import { LoginForm } from 'features/users';
import { PageTemplate } from './PageTemplate';
import { svgMap } from 'components';
import { Button, Container, Heading, Icon, Flex } from 'yorkie-ui';

export function LoginPage() {
  return (
    <PageTemplate className="login_page">
      <Container paddingInline={{ base: '6', lg: '0' }} margin="auto" width={{ sm: 'sm' }}>
        <Flex justifyContent="center">
          <Icon icon={svgMap['logo3d']} color="black.a1" size="2xl" />
        </Flex>
        <Heading as="h2" fontSize={{ base: '2xl', lg: '4xl' }} align="center" marginBottom="14">
          Sign in to Yorkie
        </Heading>
        <LoginForm />
        <Button as="link" variant="outline" width="100w" wLink="100w" href="signup" marginTop="36" size="xl">
          Sign Up
        </Button>
      </Container>
    </PageTemplate>
  );
}
