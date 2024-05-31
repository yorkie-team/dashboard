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
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectUsers, logoutUser } from './usersSlice';
import { Button, Popover, Heading, Flex, Box, Text, Grid, GridItem, Switch, Link, Menu } from 'yorkie-ui';

export function AccountDropdown() {
  const { username } = useAppSelector(selectUsers);
  const [opened, setOpened] = useState(false);

  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const PC_WIDTH = 1024;
      if (window.innerWidth < PC_WIDTH) {
        setOpened(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Flex alignItems="center">
          <Button onClick={() => setOpened(!opened)}>{username.slice(0, 1).toUpperCase()}</Button>
        </Flex>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content width="md">
          <Box padding="4" fontSize="xs" color="gray.a9">
            <Text>{username}</Text>
            <Text display="block">{username}@yorkie.dev</Text>
          </Box>
          <Menu.Separator />
          <Link padding="4" href="/dashboard/settings">
            <Text fontSize="md">Settings</Text>
          </Link>
          <Link onClick={logout} padding="4">
            <Text fontSize="md" color="orange.default">
              Sign out
            </Text>
          </Link>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
