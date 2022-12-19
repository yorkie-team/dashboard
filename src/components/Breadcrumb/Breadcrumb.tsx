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
import { Link } from 'react-router-dom';

export function Breadcrumb({ children }: { children: ReactNode }) {
  return <div className="breadcrumb team_view">{children}</div>;
}

function Inner({ children }: { children: ReactNode }) {
  return <div className="breadcrumb_inner">{children}</div>;
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
        <Link to={href} ref={ref as React.ForwardedRef<HTMLAnchorElement>} className="breadcrumb_item" {...restProps}>
          {children}
        </Link>
      );
    }
    return (
      <button
        type="button"
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className="breadcrumb_item"
        {...restProps}
      >
        {children}
      </button>
    );
  },
);
Item.displayName = 'Breadcrumb.Item';

function Thumb({ src }: { src: string }) {
  return (
    <span className="breadcrumb_thumb">
      <img src={src} alt="" />
    </span>
  );
}

function Text({ children }: { children: ReactNode }) {
  return <span className="breadcrumb_text">{children}</span>;
}

Breadcrumb.Item = Item;
Breadcrumb.Inner = Inner;
Breadcrumb.Thumb = Thumb;
Breadcrumb.Text = Text;
