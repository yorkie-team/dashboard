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

import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectUsers, logoutUser } from './usersSlice';
import { Icon } from 'components';
import { Button, Menu, Link, Box, Text } from 'yorkie-ui';

export function MobileGnbDropdown() {
  const { username } = useAppSelector(selectUsers);
  const [opened, setOpened] = useState(false);

  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const PC_WIDTH = 1024;
      if (window.innerWidth >= PC_WIDTH) {
        setOpened(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Menu.Root>
      <Menu.Trigger display={{ base: 'block', lg: 'none' }}>
        <Button variant="ghost" position="start" paddingRight="0">
          <Icon type={opened ? 'close' : 'gnbMenu'} />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item id="products" width="screen">
            <Link href="/projects">
              <Text>Dashboard</Text>
            </Link>
          </Menu.Item>
          <Menu.Item id="example">
            <Link href={`${process.env.REACT_APP_SERVICE_URL}/docs`}>
              <Text>Documentation</Text>
            </Link>
          </Menu.Item>
          <Menu.Item id="community">
            <Link href="/community">
              <Text>Community</Text>
            </Link>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item id="settings">
            <Link href="/settings">
              <Text>Settings</Text>
            </Link>
          </Menu.Item>
          <Menu.Item id="signout" onClick={logout}>
            <Text fontSize="lg" color="orange.default">
              Sign out
            </Text>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item id="signout" onClick={logout} display="block">
            <Box paddingBlock="2">
              <Text>{username}</Text>
              <Text display="block">{username}@yorkie.dev</Text>
            </Box>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
