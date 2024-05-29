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
import { Button, Container, Heading, Flex, Box, Link, Text, Grid, Menu, Input, InputProps } from 'yorkie-ui';

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
    <form onSubmit={onSubmit} className="search">
      <div className="input_field_box">
        <div className="input_inner">
          <Icon type="search" className="icon_search" />
          <Input size="xs" type="search" border="none" boxShadow="none" placeholder={placeholder} {...restProps} />
          {children}
        </div>
      </div>
    </form>
  );
}
