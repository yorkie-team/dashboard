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

import { useAppSelector } from 'app/hooks';
import { selectProjectDetail } from './projectsSlice';
import { Icon, Button } from 'components'

export function APIKeys() {
  const { project } = useAppSelector(selectProjectDetail);

  return (
    <section className="api_area">
      <h2 className="blind">Project API Key</h2>
      <div className="title_box">
        <strong className="title">API</strong>
      </div>
      <div className="api_title">
        <div className="title_box">
          <strong className="title">Public key</strong>
          <label className="input_toggle_box ">
            <input type="checkbox" className="blind" id="iptt-5" checked />
          </label>
        </div>
        <p className="desc">Description</p>
      </div>
      <div className="connect_api_box">
        <div className="input_area">
          <input className="input" type="text" value={project?.publicKey} readOnly />
        </div>
        <div className="btn_area">
          <Button outline icon={<Icon type="copy" />}>
            Copy
          </Button>
          <div className="toast_box shadow_l">
            <Icon type="check" />
            Copied
          </div>
        </div>
      </div>
      <div className="api_title">
        <div className="title_box">
          <strong className="title">Secret key</strong>
        </div>
        <p className="desc">Description</p>
      </div>
      <div className="connect_api_box">
        <div className="input_area">
          <button className="btn_cover">
            <Icon type="lockSmall" />
            Click to reveal secret key
          </button>
          <input className="input" type="text" value={project?.secretKey} readOnly />
        </div>
        <div className="btn_area">
          <Button outline icon={<Icon type="copy" />}>
            Copy
          </Button>
          <div className="toast_box shadow_l" style={{ display: 'none' }}>
            <Icon type="check" />
            Copied
          </div>
        </div>
      </div>
    </section >
  );
}
