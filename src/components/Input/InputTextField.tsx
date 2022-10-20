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

import React, { InputHTMLAttributes, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { Icon, Button, InputHelperText } from 'components';
import { useOutsideClick, useAreaBlur } from 'hooks';
import { mergeRefs } from 'utils';

type InputTextFieldProps = {
  type?: 'text' | 'password' | 'email';
  label: string;
  reset?: (fieldName?: any) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
  blindLabel?: boolean;
  state?: 'error' | 'success' | 'normal' | 'disabled';
  helperText?: string;
  placeholder?: string;
  large?: boolean;
  fieldUtil?: boolean;
  onSuccessEnd?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputTextField = React.forwardRef<HTMLInputElement, InputTextFieldProps>(
  (
    {
      type = 'text',
      label,
      reset,
      onChange,
      id,
      blindLabel,
      state = 'normal',
      helperText,
      placeholder,
      large,
      fieldUtil,
      onSuccessEnd,
      ...restProps
    },
    ref,
  ) => {
    const inputTextFieldClassName = classNames('input_field_box', {
      is_disabled: state === 'disabled',
      is_error: state === 'error',
      is_success: state === 'success',
      input_field_box_large: large,
    });

    const cancelInput = useCallback(() => {
      reset && reset();
      setIsFieldControlButtonsOpen(false);
    }, [reset]);

    const fieldControlRef = useRef<HTMLDivElement | null>(null);
    const [isFieldControlButtonsOpen, setIsFieldControlButtonsOpen] = useState(false);
    const [firstRef, lastRef, onKeyDown] = useAreaBlur(cancelInput);

    useOutsideClick(
      firstRef,
      () => {
        if (isFieldControlButtonsOpen) setIsFieldControlButtonsOpen(false);
      },
      fieldControlRef,
    );

    return (
      <div className={inputTextFieldClassName}>
        {!large && (
          <label htmlFor={id} className={classNames('label', { blind: blindLabel })}>
            {label}
          </label>
        )}
        <div className="input_inner" onKeyDown={onKeyDown}>
          <input
            type={type}
            id={id}
            className="input"
            placeholder={placeholder}
            disabled={state === 'disabled'}
            ref={mergeRefs(ref, firstRef)}
            autoComplete="off"
            onFocus={() => setIsFieldControlButtonsOpen(true)}
            onChange={onChange}
            {...restProps}
          />
          {fieldUtil && isFieldControlButtonsOpen && (
            <Button.Box ref={fieldControlRef}>
              <Button onClick={cancelInput} size="sm" outline={true} icon={<Icon type="closeSmall" />}>
                Cancel
              </Button>
              <Button
                className={classNames('green_0', { is_disabled: state === 'error' })}
                size="sm"
                outline={true}
                icon={<Icon type="check" />}
                type="submit"
                ref={lastRef}
              >
                Save
              </Button>
            </Button.Box>
          )}
        </div>
        {helperText && (
          <InputHelperText
            state={state === 'disabled' || state === 'normal' ? undefined : state}
            message={helperText}
            onSuccessEnd={onSuccessEnd}
          />
        )}
      </div>
    );
  },
);
InputTextField.displayName = 'InputTextField';
