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
import classNames from 'classnames';
import { InputHelperText } from './InputHelperText';
import { Input, InputProps, Box } from 'yorkie-ui';

type InputTextBoxProps = {
  type?: 'text' | 'password' | 'email';
  label?: string;
  blindLabel?: boolean;
  floatingLabel?: boolean;
  icon?: ReactNode;
  state?: 'error' | 'success' | 'normal' | 'disabled';
  helperText?: string;
  placeholder?: string;
  inputRef?: any;
};

export const InputTextBox = React.forwardRef((props: InputTextBoxProps & InputProps, ref) => {
  return <InputTextBoxInner {...props} inputRef={ref} />;
});
InputTextBox.displayName = 'InputTextBox';

function InputTextBoxInner({
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
}: InputTextBoxProps & InputProps) {
  return (
    <Box>
      <Box position="relative">
        {icon && icon}
        <Input
          type={type}
          className={classNames('input', {
            label_in_input: floatingLabel,
          })}
          placeholder={placeholder}
          disabled={state === 'disabled'}
          ref={inputRef}
          {...restProps}
        />
      </Box>
      {helperText && (
        <InputHelperText state={state === 'disabled' || state === 'normal' ? null : state} message={helperText} />
      )}
    </Box>
  );
}
