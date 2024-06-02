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
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from './PageTemplate';
import { Icon, Navigator } from 'components';
import { Preferences } from 'features/users/Preferences';
import { Button, Container, Heading, Box, Text, Grid, GridItem } from 'yorkie-ui';

export function SettingsPage() {
  const navigate = useNavigate();
  const handleCloseBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <PageTemplate>
      <Container
        position="relative"
        paddingBlock={{ base: '6', lg: '10' }}
        marginInline="auto"
        paddingInline={{ base: '6', lg: '0' }}
        width={{
          sm: 'breakpoint-sm',
          md: 'breakpoint-md',
          lg: 'breakpoint-lg',
          xl: 'breakpoint-xl',
        }}
      >
        <Grid gridTemplateColumns={{ base: 1, sm: 4 }} paddingBlock="10" gap="10">
          <GridItem gridColumnStart={1} gridColumnEnd={2} gridColumn={1} display="grid">
            <Heading as="h2">
              <Text>Settings</Text>
            </Heading>
            <Navigator navList={[{ name: 'Preferences', id: 'preferences' }]} />
          </GridItem>
          <GridItem gridColumnStart={3} gridColumnEnd={4} gridColumn={2} display="grid">
            <div className="setting_group">
              <div className="box_right">
                <Preferences />
              </div>
            </div>
          </GridItem>
        </Grid>
        <Box position="absolute" top="0" right="0">
          <Button onClick={handleCloseBtn} variant="ghost">
            <Icon type="close" />
          </Button>
        </Box>
      </Container>
    </PageTemplate>
  );
}
