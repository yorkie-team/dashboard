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
import { Icon } from 'components';
import type { InputProps } from 'yorkie-ui';
import { Flex, Box, Input } from 'yorkie-ui';

export function SearchBar({
  placeholder,
  onSubmit,
  children,
  ...restProps
}: {
  placeholder: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
} & React.InputHTMLAttributes<HTMLInputElement> &
  InputProps) {
  return (
    <form onSubmit={onSubmit}>
      <Flex alignItems="center" position="relative">
        <Box position="absolute" left="0" top="0" bottom="0" marginBlock="auto" height="fit">
          <Icon type="search" />
        </Box>
        <Input
          size="xs"
          paddingLeft="6"
          type="search"
          borderInline="none"
          borderTop="none"
          borderRadius="none"
          boxShadow="none"
          placeholder={placeholder}
          {...restProps}
        />
        {children}
      </Flex>
    </form>
  );
}
