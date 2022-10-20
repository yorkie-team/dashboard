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
import { InputTextBox, InputTextField, Icon } from 'components';

export function InputView() {
  return (
    <div className="input_view">
      <em className="uio_title">Input Box</em>
      <div className="uio_align_box">
        <InputTextBox
          label="Label"
          placeholder=" "
          autoComplete="off"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputTextBox
          label="Label (Error)"
          placeholder="placeholder"
          autoComplete="off"
          state="error"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputTextBox
          label="Label (Success)"
          placeholder="placeholder"
          autoComplete="off"
          state="success"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputTextBox
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
        <InputTextBox
          label="Label"
          placeholder=" "
          autoComplete="off"
          helperText="Helper Text Helper Text Helper Text Helper Text Helper Text Helper Text"
        />
        <InputTextBox
          label="Label (Error)"
          placeholder="placeholder"
          autoComplete="off"
          state="error"
          helperText="Helper Text Helper Text Helper Text Helper Text Helper Text Helper Text"
        />
        <InputTextBox
          label="Label (Success)"
          placeholder="placeholder"
          autoComplete="off"
          state="success"
          helperText="Helper Text Helper Text Helper Text Helper Text Helper Text Helper Text"
        />
        <InputTextBox
          label="Label (Disabled)"
          placeholder="placeholder"
          autoComplete="off"
          state="disabled"
          helperText="Helper Text Helper Text Helper Text Helper Text Helper Text Helper Text"
        />
      </div>
      <em className="uio_title">No Label</em>
      <div className="uio_align_box">
        <InputTextBox
          label="Label"
          blindLabel
          placeholder="placeholder"
          autoComplete="off"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputTextBox
          label="Label (Error)"
          blindLabel
          placeholder="placeholder"
          autoComplete="off"
          state="error"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputTextBox
          label="Label (Success)"
          blindLabel
          placeholder="placeholder"
          autoComplete="off"
          state="success"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputTextBox
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
        <InputTextBox
          label="Label"
          floatingLabel
          placeholder=" "
          autoComplete="off"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputTextBox
          label="Label (Error)"
          floatingLabel
          placeholder="placeholder"
          autoComplete="off"
          state="error"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputTextBox
          label="Label (Success)"
          floatingLabel
          placeholder="placeholder"
          autoComplete="off"
          state="success"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
        <InputTextBox
          label="Label (Disabled)"
          floatingLabel
          placeholder="placeholder"
          autoComplete="off"
          state="disabled"
          helperText="Helper Text"
          icon={<Icon type="square" />}
        />
      </div>
      <em className="uio_title">Input Field</em>
      <div className="uio_align_box">
        <InputTextField
          label="Disabled"
          id="input1"
          placeholder="Disabled"
          autoComplete="off"
          helperText="Helper Text"
          state="disabled"
        />
        <InputTextField
          label="Default(Editing)"
          id="input2"
          placeholder="Editing"
          autoComplete="off"
          helperText="Helper Text"
        />
        <InputTextField
          label="Error"
          id="input3"
          state="error"
          placeholder="Error"
          autoComplete="off"
          helperText="Helper Text"
        />
        <InputTextField
          label="Success"
          id="input4"
          state="success"
          placeholder="Success"
          autoComplete="off"
          helperText="Helper Text"
        />
      </div>
      <em className="uio_title">Input Field (No Label)</em>
      <div className="uio_align_box">
        <InputTextField
          label="Disabled"
          id="input5"
          placeholder="Disabled"
          autoComplete="off"
          helperText="Helper Text"
          state="disabled"
          blindLabel
        />
        <InputTextField
          label="Default(Editing)"
          id="input6"
          placeholder="Editing"
          autoComplete="off"
          helperText="Helper Text"
          blindLabel
        />
        <InputTextField
          label="Error"
          id="input7"
          state="error"
          placeholder="Error"
          autoComplete="off"
          helperText="Helper Text"
          blindLabel
        />
        <InputTextField
          label="Success"
          id="input8"
          state="success"
          placeholder="Success"
          autoComplete="off"
          helperText="Helper Text"
          blindLabel
        />
      </div>
      <em className="uio_title">Input Field (No Helper)</em>
      <div className="uio_align_box">
        <InputTextField label="Disabled" id="input9" placeholder="Disabled" autoComplete="off" state="disabled" />
        <InputTextField label="Default(Editing)" id="input10" placeholder="Editing" autoComplete="off" />
        <InputTextField label="Error" id="input11" state="error" placeholder="Error" autoComplete="off" />
        <InputTextField label="Success" id="input12" state="success" placeholder="Success" autoComplete="off" />
      </div>
      <em className="uio_title">Input Field Large</em>
      <div className="uio_align_box">
        <InputTextField
          label="Disabled"
          id="input13"
          placeholder="Disabled"
          autoComplete="off"
          state="disabled"
          large
          helperText="Helper Text"
        />
        <InputTextField
          label="Default(Editing)"
          id="input14"
          placeholder="Editing"
          autoComplete="off"
          large
          helperText="Helper Text"
        />
        <InputTextField
          label="Error"
          id="input15"
          state="error"
          placeholder="Error"
          autoComplete="off"
          large
          helperText="Helper Text"
        />
        <InputTextField
          label="Success"
          id="input16"
          state="success"
          placeholder="Success"
          autoComplete="off"
          large
          helperText="Helper Text"
        />
      </div>
    </div>
  );
}
