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
import { Icon, Button, CopyButton } from 'components';

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
        </div>
        <p className="desc">Description</p>
      </div>
      <div className="connect_api_box">
        <div className="input_area">
          <span className="input">{project?.publicKey}</span>
        </div>
        <CopyButton value={project?.publicKey!} timeout={1000}>
          {({ copied, copy }) => (
            <div className="btn_area">
              <Button outline icon={<Icon type="copy" />} onClick={copy}>
                Copy
              </Button>
              {copied && (
                <div className="toast_box shadow_l">
                  <Icon type="check" />
                  Copied
                </div>
              )}
            </div>
          )}
        </CopyButton>
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
          <span className="input">{project?.secretKey}</span>
        </div>
        <CopyButton value={project?.secretKey!} timeout={1000}>
          {({ copied, copy }) => (
            <div className="btn_area">
              <Button outline icon={<Icon type="copy" />} onClick={copy}>
                Copy
              </Button>
              {copied && (
                <div className="toast_box shadow_l">
                  <Icon type="check" />
                  Copied
                </div>
              )}
            </div>
          )}
        </CopyButton>
      </div>
    </section>
  );
}
