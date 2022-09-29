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

import React, { ReactNode, InputHTMLAttributes, useRef } from 'react';
import './input.scss';
import classNames from 'classnames';
import { InputHelperIcon } from 'components';

type InputBoxProps = {
  type?: 'text' | 'password' | 'email';
  disabled?: boolean;
  label: string;
  blindLabel?: boolean;
  floatingLabel?: boolean;
  focusFloatingLabel?: boolean;
  icon?: ReactNode;
  helper?:
    | {
        type: 'error' | 'success';
        message: string;
      }
    | undefined;
  placeholder?: string;
  inputRef?: any;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputBox = React.forwardRef((props: InputBoxProps, ref) => {
  return <InputBoxInner {...props} inputRef={ref} />;
});
InputBox.displayName = 'InputBox';

function InputBoxInner({
  type = 'text',
  disabled,
  label,
  blindLabel,
  floatingLabel,
  focusFloatingLabel,
  icon,
  helper,
  placeholder,
  inputRef,
  onBlur,
  ...restProps
}: InputBoxProps) {
  const inputBoxClassName = classNames('input_box', {
    is_disabled: disabled,
    is_error: helper?.type === 'error',
    is_success: helper?.type === 'success',
  });
  const labelClassName = classNames({
    label: label,
    label_in: floatingLabel,
    blind: blindLabel,
  });
  const labelRef = useRef<HTMLSpanElement | null>(null);

  return (
    <div className={inputBoxClassName}>
      <label className="input_inner_box">
        <span className={labelClassName} ref={labelRef}>
          {label}
        </span>
        <input
          type={type}
          className="input"
          placeholder={placeholder}
          disabled={disabled}
          ref={inputRef}
          onFocus={(e) => {
            if (focusFloatingLabel) {
              labelRef.current?.classList.add('label_in');
              labelRef.current?.classList.remove('blind');
              e.target.placeholder = '';
            }
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            if (focusFloatingLabel) {
              labelRef.current?.classList.remove('label_in');
              labelRef.current?.classList.add('blind');
              e.target.placeholder = placeholder || '';
            }
          }}
          {...restProps}
        />
        {icon && <span className="icon">{icon}</span>}
      </label>
      {helper && <InputHelperMessage type={helper.type} message={helper.message} />}
    </div>
  );
}

type InputHelperMessageProps = {
  type?: 'error' | 'success';
  message: string;
};
function InputHelperMessage({ type, message }: InputHelperMessageProps) {
  return (
    <div className="input_guide">
      {type && (
        <span className="icon">
          <InputHelperIcon />
        </span>
      )}
      <p className="input_guide_desc">{message}</p>
    </div>
  );
}
