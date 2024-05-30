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
import { Button, Container, Heading, Flex, Box, Text, Grid, GridItem, Switch, Link } from 'yorkie-ui';

export function Breadcrumb({ children }: { children: ReactNode }) {
  return (
    <Flex gap="2.5" alignItems="center">
      {children}
    </Flex>
  );
}

function Inner({ children }: { children: ReactNode }) {
  return (
    <Box borderWidth="sm" height="fit" borderBlock="none" borderRight="none" position="relative">
      {children}
    </Box>
  );
}

const Item = React.forwardRef(
  (
    {
      as = 'button',
      href = '',
      children,
      ...restProps
    }: {
      as?: 'button' | 'a' | 'link';
      href?: string;
      children?: ReactNode;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement> &
      React.ButtonHTMLAttributes<HTMLButtonElement>,
    ref,
  ) => {
    if (as === 'link') {
      return (
        <Link
          paddingLeft="2.5"
          fontSize="sm"
          href={href}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...restProps}
        >
          {children}
        </Link>
      );
    }
    return (
      <Button type="button" ref={ref as React.ForwardedRef<HTMLButtonElement>} {...restProps} height="fit" size="sm">
        {children}
      </Button>
    );
  },
);
Item.displayName = 'Breadcrumb.Item';

function Thumb({ src }: { src: string }) {
  return (
    <Text>
      <img src={src} alt="" />
    </Text>
  );
}

function Texts({ children }: { children: ReactNode }) {
  return <Text fontSize="sm">{children}</Text>;
}

Breadcrumb.Item = Item;
Breadcrumb.Inner = Inner;
Breadcrumb.Thumb = Thumb;
Breadcrumb.Text = Texts;
