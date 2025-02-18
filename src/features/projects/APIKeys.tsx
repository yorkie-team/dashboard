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

import React, { useState } from 'react';

import { useAppSelector } from 'app/hooks';
import { selectProjectDetail } from './projectsSlice';
import { Icon, Button, CopyButton } from 'components';
import { Link } from 'react-router-dom';

export function APIKeys() {
  const { project } = useAppSelector(selectProjectDetail);
  const [revealSecretKey, setRevealSecretKey] = useState(false);

  return (
    <section className="api_area">
      <h2 className="blind">Project API Key</h2>
      <div className="title_box">
        <strong className="title">API Keys</strong>
      </div>
      <div className="api_title">
        <div className="title_box">
          <strong className="title">Public key</strong>
        </div>
        <p className="desc">
          The public key is used to identify your project when&nbsp;
          <a
            href={`${import.meta.env.VITE_SERVICE_URL}/docs/js-sdk#creating-a-client`}
            className="page_link icon_link"
            target="_blank"
            rel="noreferrer"
          >
            creating a new Client
          </a>
        </p>
      </div>
      <div className="connect_api_box">
        <div className="api_box">
          <div className="api">
            <span className="value">{project?.publicKey}</span>
          </div>
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
        <p className="desc">
          The secret key is used to identify and authenticate your project with administrative privileges. It is used to
          call REST APIs from the server side.
        </p>
      </div>
      <div className="connect_api_box">
        <div className="api_box">
          <div className="api">
            {!revealSecretKey && (
              <button
                type="button"
                className="btn_cover"
                onClick={() => {
                  setRevealSecretKey(true);
                }}
              >
                <Icon type="lockSmall" />
                Click to reveal secret key
              </button>
            )}
            {revealSecretKey && <span className="value">{project?.secretKey}</span>}
          </div>
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
