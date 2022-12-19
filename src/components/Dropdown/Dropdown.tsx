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
import classNames from 'classnames';

type ShadowSize = 'xs' | 's' | 'm' | 'l';

type DropdownProps = {
  large?: boolean;
  shadow?: ShadowSize;
  className?: string;
  children: ReactNode;
};
type DropdownRef = HTMLDivElement;

export const Dropdown = React.forwardRef<DropdownRef, DropdownProps>(({ children, large, shadow, className }, ref) => {
  const shadowClass = shadow ? `shadow_${shadow}` : '';

  return (
    <div ref={ref} className={classNames('dropdown', className, shadowClass, { dropdown_l: large })}>
      {children}
    </div>
  );
}) as any;
Dropdown.displayName = 'Dropdown';

function List({ children }: { children: ReactNode }) {
  return <ul className="dropdown_list">{children}</ul>;
}

function Item({
  children,
  as = 'button',
  href = '',
  border,
  onClick,
}: {
  children: ReactNode;
  as?: 'button' | 'a' | 'link';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  border?: boolean;
}) {
  return (
    <li
      className={classNames('dropdown_item', {
        has_border: border,
      })}
      style={{ display: 'block' }}
    >
      {as === 'a' && (
        <a href={href} className="dropdown_menu">
          {children}
        </a>
      )}
      {as === 'link' && (
        <Link to={href} className="dropdown_menu" onClick={onClick}>
          {children}
        </Link>
      )}
      {as === 'button' && (
        <button onClick={onClick} className="dropdown_menu">
          {children}
        </button>
      )}
    </li>
  );
}

function Text({ children, highlight }: { children: ReactNode; highlight?: boolean }) {
  return <span className={classNames('dropdown_text', { highlight })}>{children}</span>;
}

function Title({ children }: { children: ReactNode }) {
  return <div className="dropdown_title">{children}</div>;
}

Dropdown.List = List;
Dropdown.Item = Item;
Dropdown.Text = Text;
Dropdown.Title = Title;
