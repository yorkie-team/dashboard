/*
 * Copyright 2025 The Yorkie Authors. All rights reserved.
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
import classNames from 'classnames';
import { useAppSelector } from 'app/hooks';
import { selectProjectDetail } from './projectsSlice';
import { Icon, CodeBlock, CopyButton, Button } from 'components';

type Snippet = 'npm' | 'cdn';

export function QuickStart() {
  const { project } = useAppSelector(selectProjectDetail);
  const [snippetType, setSnippetType] = useState<Snippet>('npm');
  const snippet = {
    npm: `import yorkie from '@yorkie-js/sdk';

async function main() {
  const client = new yorkie.Client('${import.meta.env.VITE_API_ADDR}', {
    apiKey: '${project?.publicKey}',
  });
  await client.activate();

  const doc = new yorkie.Document('my-first-document');
  doc.subscribe('presence', (event) => {
    const peers = doc.getPresences();
    // Add element to HTML as shown below:
    // <div>There are currently <span id='peersCount'></span> peers!</div>
    document.getElementById('peersCount').innerHTML = peers.length;
  })
  await client.attach(doc);
}
main();`,
    cdn: `<div>There are currently <span id='peersCount'></span> peers!</div>

<!-- include yorkie js -->
<script src="https://cdn.jsdelivr.net/npm/@yorkie-js/sdk@${import.meta.env.VITE_JS_SDK_VERSION}/dist/yorkie-js-sdk.js"></script>
<script>
  async function main() {
    const client = new yorkie.Client('${import.meta.env.VITE_API_ADDR}', {
      apiKey: '${project?.publicKey}',
    });
    await client.activate();

    const doc = new yorkie.Document('my-first-document');
    doc.subscribe('presence', (event) => {
      const peers = doc.getPresences();
      document.getElementById('peersCount').innerHTML = peers.length;
    })
    await client.attach(doc);
  }
  main();
</script>`,
  };

  return (
    <div className="init_area">
      <div className="init_box">
        <div className="title_box ">
          <Icon type="messageSmile" />
          <strong className="title">Your project is ready!</strong>
        </div>
        <p className="title_desc">Your project is now ready to use with its own APIs.</p>
      </div>
      <div className="init_box">
        <div className="title_box ">
          <Icon type="route" />
          <strong className="title">Add Yorkie SDK in your app</strong>
        </div>
      </div>
      <div className="codeblock_navigator">
        <button
          className={classNames('item', {
            is_active: snippetType === 'npm',
          })}
          onClick={() => setSnippetType('npm')}
        >
          Use npm
        </button>
        <button
          className={classNames('item', {
            is_active: snippetType === 'cdn',
          })}
          onClick={() => setSnippetType('cdn')}
        >
          Use a &lt;script&gt; tag
        </button>
      </div>
      {snippetType === 'npm' && (
        <div className="init_content">
          <div className="init_box">
            <div className="title_box title_box_s">
              <strong className="title">Use npm</strong>
            </div>
            <p className="title_desc">Your project is now ready to use with its own APIs.</p>
          </div>
          <div className="codeblock_box">
            <div className="codeblock">
              <CodeBlock.Code code="$ npm install @yorkie-js/sdk" language="bash" />
            </div>
            <div className="btn_area">
              <CopyButton value="npm install @yorkie-js/sdk" timeout={1000}>
                {({ copied, copy }) => (
                  <>
                    <Button icon={<Icon type="copy" />} outline onClick={copy} />
                    {copied && (
                      <div className="toast_box shadow_l">
                        <Icon type="check" />
                        Copied
                      </div>
                    )}
                  </>
                )}
              </CopyButton>
            </div>
          </div>
          <div className="init_box">
            <p className="title_desc">Then, import yorkie and begin using the SDKs.</p>
          </div>
          <div className="codeblock_box">
            <div className="codeblock">
              <CodeBlock.Code code={snippet.npm} language="javascript" withLineNumbers />
            </div>
            <div className="btn_area">
              <CopyButton value={snippet.npm} timeout={1000}>
                {({ copied, copy }) => (
                  <>
                    <Button icon={<Icon type="copy" />} outline onClick={copy} />
                    {copied && (
                      <div className="toast_box shadow_l">
                        <Icon type="check" />
                        Copied
                      </div>
                    )}
                  </>
                )}
              </CopyButton>
            </div>
          </div>
        </div>
      )}
      {snippetType === 'cdn' && (
        <div className="init_content">
          <div className="init_box">
            <div className="title_box title_box_s">
              <strong className="title">Use a &lt;script&gt; tag</strong>
            </div>
            <p className="title_desc">Copy and paste the following script into the bottom of your &lt;body&gt; tag.</p>
          </div>
          <div className="codeblock_box">
            <div className="codeblock">
              <CodeBlock.Code code={snippet.cdn} language="markup" withLineNumbers />
            </div>
            <div className="btn_area">
              <CopyButton value={snippet.cdn} timeout={1000}>
                {({ copied, copy }) => (
                  <>
                    <Button icon={<Icon type="copy" />} outline onClick={copy} />
                    {copied && (
                      <div className="toast_box shadow_l">
                        <Icon type="check" />
                        Copied
                      </div>
                    )}
                  </>
                )}
              </CopyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
