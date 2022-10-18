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

import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Icon, Button } from 'components';

type InputTextFieldProps = {
  type?: 'text' | 'password' | 'email';
  label: string;
  id: string;
  blindLabel?: boolean;
  state?: 'error' | 'success' | 'normal' | 'disabled';
  editing?: boolean;
  helperText?: string;
  placeholder?: string;
  inputRef?: any;
  large?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputTextField = React.forwardRef((props: InputTextFieldProps, ref) => {
  return <InputTextFieldInner {...props} inputRef={ref} />;
});
InputTextField.displayName = 'InputTextField';

function InputTextFieldInner({
  type = 'text',
  label,
  id,
  blindLabel,
  state = 'normal',
  editing,
  helperText,
  placeholder,
  inputRef,
  large,
  ...restProps
}: InputTextFieldProps) {
  const inputTextFieldClassName = classNames('input_field_box', {
    is_disabled: state === 'disabled',
    is_error: state === 'error',
    is_success: state === 'success',
    input_field_box_large: large,
  });

  return (
    <div className={inputTextFieldClassName}>
      {!large && (
        <label htmlFor={id} className={classNames('label', { blind: blindLabel })}>
          {label}
        </label>
      )}
      <div className="input_inner">
        <input
          type={type}
          id={id}
          className="input"
          placeholder={placeholder}
          disabled={state === 'disabled'}
          ref={inputRef}
          {...restProps}
        />
        {editing && (
          <Button.Box>
            <Button size="sm" outline={true} icon={<Icon type="close" />}>
              Cancel
            </Button>
            <Button
              className={classNames('green_0', { is_disabled: state === 'error' })}
              size="sm"
              outline={true}
              icon={<Icon type="check" />}
            >
              Save
            </Button>
          </Button.Box>
        )}
      </div>
      {helperText && (
        <div className="input_guide">
          {(state === 'error' || state === 'success') && <Icon type="input" />}
          <p className="input_guide_desc">{helperText}</p>
        </div>
      )}
    </div>
  );
}
