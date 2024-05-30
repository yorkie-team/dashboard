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

import React, { useCallback } from 'react';
import { InputToggle } from 'components';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPreferences, toggleUseSystemTheme, toggleUseDarkTheme, toggleUse24HourClock } from './usersSlice';
import { Button, Container, Heading, Flex, Box, Text, RadioGroup, Switch, Grid, GridItem } from 'yorkie-ui';

export function Preferences() {
  const dispatch = useAppDispatch();
  const { theme, use24HourClock } = useAppSelector(selectPreferences);
  const handleThemeInputChanged = useCallback(() => {
    dispatch(toggleUseSystemTheme());
  }, [dispatch]);
  const handleThemeRadioChanged = useCallback(() => {
    dispatch(toggleUseDarkTheme());
  }, [dispatch]);
  const handleClockInputChanged = useCallback(() => {
    dispatch(toggleUse24HourClock());
  }, [dispatch]);
  console.log(theme.darkMode);
  return (
    <Box>
      <Box id="preferences">
        <Heading as="h2" width="fit" fontSize="2xl">
          Preferences <Box marginTop="2" borderWidth="xs" borderColor="orange.default" />
        </Heading>
        <Box>
          <Box marginTop="10">
            <Text fontWeight="semibold">Theme</Text>
          </Box>
          <Switch marginTop="4" id="theme" checked={theme.useSystem} onChange={handleThemeInputChanged}>
            Sync with system settings
          </Switch>
        </Box>
        <Box
          background="gray.a3"
          paddingBlock="8"
          paddingLeft={{ base: '4', lg: '6' }}
          paddingRight={{ base: '6', lg: '24' }}
          borderRadius="2xl"
          marginTop="6"
          borderColor="gray.a6"
          borderWidth="xs"
          width="fit"
        >
          <RadioGroup.Root defaultValue={theme.darkMode ? 'dark' : 'light'}>
            <RadioGroup.Indicator />
            <RadioGroup.Item key="dark" onChange={handleThemeRadioChanged} value="dark" disabled={theme.useSystem}>
              <RadioGroup.ItemText>Dark</RadioGroup.ItemText>
              <RadioGroup.ItemControl />
            </RadioGroup.Item>
            <RadioGroup.Item key="light" onChange={handleThemeRadioChanged} value="light" disabled={theme.useSystem}>
              <RadioGroup.ItemText>Light</RadioGroup.ItemText>
              <RadioGroup.ItemControl />
            </RadioGroup.Item>
          </RadioGroup.Root>
        </Box>
        <Box marginTop="10">
          <Text>Times</Text>
        </Box>

        <Switch marginTop="4" id="times" checked={use24HourClock} onChange={handleClockInputChanged}>
          Use a 24-hour clock
        </Switch>

        <Box
          background="gray.a3"
          paddingBlock="4"
          paddingLeft={{ base: '4', lg: '6' }}
          paddingRight={{ base: '6', lg: '28' }}
          borderRadius="2xl"
          marginTop="6"
          width="fit"
        >
          {use24HourClock ? '13:00' : '1:00 PM'}
        </Box>
      </Box>
    </Box>
  );
}
