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
import { NavLink as Link } from 'react-router-dom';
import classNames from 'classnames';
import { Text, Box, Flex } from 'yorkie-ui';

function Item({ children, end, to }: { children: ReactNode; end?: boolean; to: string }) {
  return (
    <Box position="relative" paddingBottom="2.5" color="neutral.9">
      <Link to={to} className={({ isActive }) => classNames({ is_active: isActive })} end={end}>
        {children}
      </Link>
    </Box>
  );
}

function Texts({ children }: { children: ReactNode }) {
  return (
    <Text fontSize="sm" textWrap="nowrap">
      {children}
    </Text>
  );
}

export function TabList({ children }: { children: ReactNode }) {
  return (
    <Flex
      paddingInline={{ base: 6, lg: '0' }}
      gap="10"
      borderWidth="1px"
      borderInline="none"
      borderTop="none"
      borderColor="gray.7"
    >
      {children}
    </Flex>
  );
}

TabList.Item = Item;
TabList.Text = Texts;
