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

import React, { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import './button.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const ButtonStyle = {
  sm: 'btn_small',
  md: undefined,
  lg: 'btn_large',
  primary: 'orange_0',
  success: 'green_0',
  danger: 'red_0',
  toggle: 'btn_toggle',
  disabled: 'btn_line gray300',
  default: undefined,
};

type ButtonProps = {
  as?: 'button' | 'a' | 'link';
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  blindText?: boolean;
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  outline?: boolean;
  color?: 'primary' | 'success' | 'danger' | 'toggle' | 'default';
  isActive?: boolean;
  buttonRef?: any;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef((props: ButtonProps, ref) => {
  return <ButtonInner {...props} buttonRef={ref} />;
});
Button.displayName = 'Button';

function ButtonInner({
  as = 'button',
  type = 'button',
  href = '',
  disabled,
  className = '',
  children,
  icon,
  blindText,
  size = 'md',
  outline,
  color = 'default',
  isActive,
  buttonRef,
  ...restProps
}: ButtonProps) {
  const buttonClassName = classNames('btn', className, ButtonStyle[size], ButtonStyle[color], {
    btn_line: outline,
    is_active: isActive,
    [ButtonStyle.disabled]: disabled,
  });

  if (as === 'link') {
    return (
      <Link to={href} className={buttonClassName} {...restProps} ref={buttonRef}>
        {icon && icon}
        {children && <span className={`${blindText ? 'blind' : 'text'}`}>{children}</span>}
      </Link>
    );
  }
  if (as === 'a') {
    return (
      <a href={href} className={buttonClassName} {...restProps} ref={buttonRef}>
        {icon && icon}
        {children && <span className={`${blindText ? 'blind' : 'text'}`}>{children}</span>}
      </a>
    );
  }
  return (
    <button className={buttonClassName} type={type} disabled={disabled} {...restProps} ref={buttonRef}>
      {icon && icon}
      {children && <span className={`${blindText ? 'blind' : 'text'}`}>{children}</span>}
    </button>
  );
}
