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

import { Header } from './Header';
import { Footer } from './Footer';
import { ErrorModal } from 'features/globalError/ErrorModal';
import { Box, Flex } from 'yorkie-ui';

export function PageTemplate({
  className = '',
  headerClassName = '',
  contentClassName = '',
  children,
}: {
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
}) {
  return (
    <Flex flexDirection="column" minHeight="100w">
      <Header className={headerClassName} />
      <Flex flexGrow="1" flexShrink="1" flexBasis="auto" flexDirection="column">
        {children}
      </Flex>
      <ErrorModal />
      <Footer />
    </Flex>
  );
}
