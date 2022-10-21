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

import React from 'react';
import classNames from 'classnames';
import { useUncontrolled } from 'hooks';
import { Icon } from 'components';

export function InputToggle({
  id,
  label,
  blindLabel,
  checked,
  defaultChecked,
  setChecked,
  onChange,
  disabled,
  reverse,
}: {
  id: string;
  label: string;
  blindLabel?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  setChecked?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  reverse?: boolean;
}) {
  const [_checked, _setChecked] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange: setChecked,
  });

  return (
    <label htmlFor={id} className={classNames('input_toggle_box', { is_reverse: reverse })}>
      <input
        type="checkbox"
        id={id}
        value={id}
        className="blind"
        checked={_checked}
        onChange={(e) => {
          _setChecked(!_checked);
          onChange && onChange(e);
        }}
        disabled={disabled}
      />
      <em className="toggle_ui">
        <span className="track"></span>
        <Icon type="check" className="ball" />
      </em>
      <span className={classNames('label', { blind: blindLabel })}>{label}</span>
    </label>
  );
}
