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
import { PageTemplate } from './PageTemplate';
import NotFoundSVG from 'assets/icons/error_404.svg?react';
import { Button, Icon, Box, Heading, Text, Flex, IconDiscord, IconGitHub, IconBackHome, Container } from 'yorkie-ui';

export function NotFoundPage() {
  return (
    <PageTemplate className="error_page" contentClassName="error_404">
      <Container
        paddingBlock={{ base: '6', lg: '20' }}
        margin="auto"
        paddingInline={{ base: '6', lg: '0' }}
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent="space-evenly">
          <Heading as="h2" fontSize="3xl" display="none">
            404 : not found
          </Heading>
          <div>
            <NotFoundSVG />
          </div>
          <Box>
            <Text fontSize="4xl" fontWeight="semibold">
              Oops! Wait a minute... <br />
              Yorkie ate your request
            </Text>
            <Text marginBlock="10">
              The page you are looking for might be
              <br className="br_mo" /> removed or is temporarily unavailable.
            </Text>
            <Flex gap="6" flexDirection={{ base: 'column', lg: 'row' }}>
              <Button as="link" href="/" position="start" icon={<Icon icon={<IconBackHome />} />}>
                Back to home
              </Button>
              <Button
                as="link"
                href="https://discord.gg/MVEAwz9sBy"
                background="grey.a9"
                variant="outline"
                position="start"
                stroke="neutral.11"
                className="fillSVG"
                icon={<IconDiscord />}
              >
                Discord
              </Button>
              <Button
                as="link"
                href="https://github.com/yorkie-team/dashboard/issues"
                background="grey.a9"
                stroke="neutral.11"
                className="fillSVG"
                variant="outline"
                position="start"
                icon={<IconGitHub />}
              >
                GitHub
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </PageTemplate>
  );
}
