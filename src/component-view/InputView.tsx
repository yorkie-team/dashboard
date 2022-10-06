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
import { InputText, Icon } from 'components';

export function InputView() {
  return (
    <div className="input_view">
      <em className="uio_title">Input Box</em>
      <div className="uio_align_box">
        <InputText
          label="Label"
          placeholder=" "
          autoComplete="off"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputText
          label="Label (Error)"
          placeholder="placeholder"
          autoComplete="off"
          state="error"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputText
          label="Label (Success)"
          placeholder="placeholder"
          autoComplete="off"
          state="success"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputText
          label="Label (Disabled)"
          placeholder="placeholder"
          autoComplete="off"
          state="disabled"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
      </div>
      <em className="uio_title">No Icon</em>
      <div className="uio_align_box">
        <InputText
          label="Label"
          placeholder=" "
          autoComplete="off"
          helperText="Helper Text Helper Text Helper Text Helper Text Helper Text Helper Text"
        />
        <InputText
          label="Label (Error)"
          placeholder="placeholder"
          autoComplete="off"
          state="error"
          helperText="Helper Text Helper Text Helper Text Helper Text Helper Text Helper Text"
        />
        <InputText
          label="Label (Success)"
          placeholder="placeholder"
          autoComplete="off"
          state="success"
          helperText="Helper Text Helper Text Helper Text Helper Text Helper Text Helper Text"
        />
        <InputText
          label="Label (Disabled)"
          placeholder="placeholder"
          autoComplete="off"
          state="disabled"
          helperText="Helper Text Helper Text Helper Text Helper Text Helper Text Helper Text"
        />
      </div>
      <em className="uio_title">No Label</em>
      <div className="uio_align_box">
        <InputText
          label="Label"
          blindLabel
          placeholder="placeholder"
          autoComplete="off"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputText
          label="Label (Error)"
          blindLabel
          placeholder="placeholder"
          autoComplete="off"
          state="error"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputText
          label="Label (Success)"
          blindLabel
          placeholder="placeholder"
          autoComplete="off"
          state="success"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputText
          label="Label (Disabled)"
          blindLabel
          placeholder="placeholder"
          autoComplete="off"
          state="disabled"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
      </div>
      <em className="uio_title">Label on Box</em>
      <div className="uio_align_box">
        <InputText
          label="Label"
          floatingLabel
          placeholder=" "
          autoComplete="off"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputText
          label="Label (Error)"
          floatingLabel
          placeholder="placeholder"
          autoComplete="off"
          state="error"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputText
          label="Label (Success)"
          floatingLabel
          placeholder="placeholder"
          autoComplete="off"
          state="success"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputText
          label="Label (Disabled)"
          floatingLabel
          placeholder="placeholder"
          autoComplete="off"
          state="disabled"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
      </div>
    </div>
  );
}
