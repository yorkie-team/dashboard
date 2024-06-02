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

import React, { useState } from 'react';
import { ProjectList } from 'features/projects';
import { ReactComponent as BannerSVG } from 'assets/images/@tmp/sample_banner_icon.svg';
import { Icon } from 'components';
import { PageTemplate } from './PageTemplate';
import { Button, Container, Heading, Flex, Box, Link, Text, Grid } from 'yorkie-ui';

export function ProjectsPage() {
  const [showBanner, setShowBanner] = useState(localStorage.getItem('banner') === 'N' ? false : true);
  return (
    <PageTemplate className="team_overview_page">
      <Container
        paddingBlock={{ base: '6', lg: '20' }}
        marginInline="auto"
        paddingInline={{ base: '6', lg: '0' }}
        width={{
          sm: 'breakpoint-sm',
          md: 'breakpoint-md',
          lg: 'breakpoint-lg',
          xl: 'breakpoint-xl',
        }}
      >
        {showBanner && (
          <Box>
            <Flex justifyContent="space-between" marginBottom="10">
              <Heading as="h2" fontSize="3xl">
                Welcome to Yorkie
              </Heading>
              <Button
                icon={<Icon type="close" />}
                variant="ghost"
                position="start"
                size="md"
                color="#fff"
                onClick={() => {
                  setShowBanner(false);
                  localStorage.setItem('banner', 'N');
                }}
              />
            </Flex>
            <Grid gridTemplateColumns={{ base: 1, lg: 2 }}>
              <Flex position="relative">
                <Link
                  background="orange.default"
                  padding="10"
                  width="100w"
                  display={{ base: 'block', lg: 'flex' }}
                  borderRadius="xl"
                  alignItems="center"
                  target="_blank"
                  rel="noreferrer"
                  href={`${process.env.REACT_APP_SERVICE_URL}/docs`}
                >
                  <Box position="relative" zIndex="xs" display="block" color="neutral.1">
                    <Text fontWeight="semibold" fontSize="2xl">
                      Check out Documentation
                    </Text>
                    <Text fontSize="md" marginTop="6" lineHeight="normal">
                      Check out how to use SDKs and API
                    </Text>
                  </Box>
                </Link>
              </Flex>
              <Flex position="relative">
                <Link
                  background="neutral.default"
                  padding="10"
                  display={{ base: 'block', lg: 'flex' }}
                  borderRadius="xl"
                  alignItems="center"
                  target="_blank"
                  rel="noreferrer"
                  href={`${process.env.REACT_APP_SERVICE_URL}/examples`}
                >
                  <Box position="relative" zIndex="xs" display="block" color="neutral.1">
                    <Text fontWeight="semibold" fontSize="2xl">
                      Browse Examples
                    </Text>
                    <Text fontSize="md" marginTop="6" lineHeight="normal">
                      See how Yorkie can help you bring your products to the next level of collaboration.
                    </Text>
                  </Box>
                </Link>

                <Box position="absolute" bottom="0" right="0">
                  <BannerSVG />
                </Box>
              </Flex>
            </Grid>
          </Box>
        )}
        <ProjectList />
      </Container>
    </PageTemplate>
  );
}
