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
import classNames from 'classnames';
import { InputHelperText } from './InputHelperText';
import { Input, Flex, InputProps } from 'yorkie-ui';

type InputTextBoxProps = {
  type?: 'text' | 'password' | 'email';
  state?: 'error' | 'success' | 'normal' | 'disabled';
  helperText?: string;
  placeholder?: string;
  inputRef?: any;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputTextBox = React.forwardRef((props: InputTextBoxProps, ref) => {
  return <InputTextBoxInner {...props} inputRef={ref} />;
});
InputTextBox.displayName = 'InputTextBox';

function InputTextBoxInner({
  state = 'normal',
  helperText,
  placeholder,
  inputRef,
  ...restProps
}: InputTextBoxProps & InputProps) {
  return (
    <div>
      <Flex className="input_inner_box">
        <Input size="xl" width="100w" placeholder={placeholder} ref={inputRef} {...restProps} />
      </Flex>
      {helperText && (
        <InputHelperText state={state === 'disabled' || state === 'normal' ? null : state} message={helperText} />
      )}
    </div>
  );
}
