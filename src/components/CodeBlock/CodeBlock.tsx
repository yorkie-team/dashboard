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
import ReactJson, { ReactJsonViewProps } from 'react-json-view';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from './prismThemeLight';

const CodeBlockCode = ({
  code,
  language,
  withLineNumbers,
}: {
  code: string;
  language: Language;
  withLineNumbers?: boolean;
}) => {
  return (
    <>
      <Highlight {...defaultProps} code={code} theme={theme} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={className}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {withLineNumbers && <span className="line-number">{i + 1}</span>}
                <span className="line-content">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </>
  );
};

function CodeBlockTree({ code, ...restProps }: { code: object } & Omit<ReactJsonViewProps, 'src'>) {
  return (
    <ReactJson
      src={code}
      iconStyle="arrow"
      displayObjectSize={false}
      displayDataTypes={false}
      displayBraceColon={false}
      enableClipboard={false}
      quotesOnKeys={false}
      groupArraysAfterLength={0}
      {...restProps}
      theme={{
        base00: 'null',
        base01: 'null',
        base02: 'null',
        base03: 'null',
        base04: 'null',
        base05: 'null',
        base06: 'null',
        base07: 'null',
        base08: 'null',
        base09: 'null',
        base0A: 'null',
        base0B: 'null',
        base0C: 'null',
        base0D: 'null',
        base0E: 'null',
        base0F: 'null',
      }}
    />
  );
}

export const CodeBlock = () => {
  return <></>;
};

CodeBlock.Tree = CodeBlockTree;
CodeBlock.Code = CodeBlockCode;
