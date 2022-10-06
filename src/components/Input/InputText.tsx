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

import React, { ReactNode, InputHTMLAttributes } from 'react';
import './input.scss';
import classNames from 'classnames';
import { Icon } from 'components';

type InputTextProps = {
  type?: 'text' | 'password' | 'email';
  label: string;
  blindLabel?: boolean;
  floatingLabel?: boolean;
  icon?: ReactNode;
  state?: 'error' | 'success' | 'normal' | 'disabled';
  helperText?: string;
  placeholder?: string;
  inputRef?: any;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputText = React.forwardRef((props: InputTextProps, ref) => {
  return <InputTextInner {...props} inputRef={ref} />;
});
InputText.displayName = 'InputText';

function InputTextInner({
  type = 'text',
  label,
  blindLabel,
  floatingLabel,
  icon,
  state = 'normal',
  helperText,
  placeholder,
  inputRef,
  ...restProps
}: InputTextProps) {
  const inputTextClassName = classNames('input_box', {
    is_disabled: state === 'disabled',
    is_error: state === 'error',
    is_success: state === 'success',
  });

  return (
    <div className={inputTextClassName}>
      <label className="input_inner_box">
        {!floatingLabel && (
          <span
            className={classNames('label', {
              blind: blindLabel,
            })}
          >
            {label}
          </span>
        )}
        {icon && icon}
        <input
          type={type}
          className={classNames('input', {
            label_in_input: floatingLabel,
          })}
          placeholder={placeholder}
          disabled={state === 'disabled'}
          ref={inputRef}
          {...restProps}
        />
        {floatingLabel && <span className="label label_in">{label}</span>}
      </label>
      {helperText && (
        <div className="input_guide">
          {(state === 'error' || state === 'success') && <Icon type="input" />}
          <p className="input_guide_desc">{helperText}</p>
        </div>
      )}
    </div>
  );
}
