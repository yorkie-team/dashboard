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

import { useAppSelector } from 'app/hooks';
import { ProjectDropdown } from 'features/projects';
import { AccountDropdown, MobileGnbDropdown } from 'features/users';
import { selectUsers } from 'features/users/usersSlice';
import { Breadcrumb, Icon } from 'components';
import { Heading, Flex, Box, Text, Link } from 'yorkie-ui';

export function Header({ className }: { className?: string }) {
  const { token, isValidToken } = useAppSelector(selectUsers);

  return (
    <Box position="sticky" top="0" className={`${className}`} width="100w" bg="neutral.1" zIndex="lg">
      <Flex justifyContent="space-between" paddingInline="6" alignItems="center">
        <Breadcrumb>
          <Heading as="h1">
            <Link href={`${import.meta.env.VITE_SERVICE_URL}`}>
              <Icon type="logoNoText" fill />
            </Link>
            <Text display="none">Yorkie</Text>
          </Heading>
          {token && isValidToken && (
            <>
              <Breadcrumb.Inner>
                <Breadcrumb.Item as="link" href="/dashboard/projects">
                  <Breadcrumb.Text>Dashboard</Breadcrumb.Text>
                </Breadcrumb.Item>
              </Breadcrumb.Inner>
              <Breadcrumb.Inner>
                <ProjectDropdown />
              </Breadcrumb.Inner>
            </>
          )}
        </Breadcrumb>
        {token && isValidToken && (
          <Box height="fit">
            <Flex display={{ base: 'none', lg: 'flex' }} gap="4">
              <Link href={`${process.env.REACT_APP_SERVICE_URL}/docs`} className="util_menu">
                Docs
              </Link>
              <Link href="/dashboard/community" className="util_menu">
                Community
              </Link>
              <AccountDropdown />
            </Flex>
            <MobileGnbDropdown />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
