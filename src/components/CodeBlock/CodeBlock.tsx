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

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactJson, { ReactJsonViewProps } from 'react-json-view';
import { Prism, Highlight, Language } from 'prism-react-renderer';
import theme from './prismThemeLight';

// NOTE(chacha912): language 'json' is not supported by prism-react-renderer.
// https://github.com/FormidableLabs/prism-react-renderer/issues/208
// so we copied the original version.(https://github.com/PrismJS/prism/blob/master/components/prism-json.js)
Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: true,
    greedy: true,
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true,
  },
  comment: {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true,
  },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: 'keyword',
  },
};

// NOTE(chacha912): Highlight tokenizes the whole text and renders an element per
// token, which blocks the main thread for seconds on large documents and lets
// pending requests hit their deadline. Above this length, highlight and render
// only the lines in view. https://github.com/yorkie-team/dashboard/issues/326
const VIRTUALIZE_MIN_LENGTH = 100 * 1024;
// Keep in step with the line-height of .line-number and .line-content in codeblock.scss.
// Lines must not wrap (white-space: pre on .is_virtualized), or rows grow past it.
const LINE_HEIGHT = 24;
const OVERSCAN_LINES = 50;

function getScrollParent(el: HTMLElement): HTMLElement | Window {
  for (let node = el.parentElement; node; node = node.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(node).overflowY)) return node;
  }
  return window;
}

const CodeLine = React.memo(function CodeLine({
  line,
  language,
  lineNumber,
  lineNumberWidth,
}: {
  line: string;
  language: Language;
  lineNumber?: number;
  lineNumberWidth?: string;
}) {
  return (
    <Highlight code={line} theme={theme} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <div {...getLineProps({ line: tokens[0] })}>
          {lineNumber !== undefined && (
            <span className="line-number" style={{ width: lineNumberWidth }}>
              {lineNumber}
            </span>
          )}
          <span className="line-content">
            {tokens[0].map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </span>
        </div>
      )}
    </Highlight>
  );
});

function VirtualizedCode({
  code,
  language,
  withLineNumbers,
}: {
  code: string;
  language: Language;
  withLineNumbers?: boolean;
}) {
  const lines = useMemo(() => code.split('\n'), [code]);
  const ref = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState({ start: 0, end: OVERSCAN_LINES * 2 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = getScrollParent(el);
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top;
      const viewTop = parent === window ? 0 : (parent as HTMLElement).getBoundingClientRect().top;
      const viewHeight = parent === window ? window.innerHeight : (parent as HTMLElement).clientHeight;
      const end = Math.min(lines.length, Math.ceil((viewTop + viewHeight - top) / LINE_HEIGHT) + OVERSCAN_LINES);
      const start = Math.min(end, Math.max(0, Math.floor((viewTop - top) / LINE_HEIGHT) - OVERSCAN_LINES));
      setRange((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    parent.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      parent.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [lines]);

  const lineNumberWidth = `${String(lines.length).length}ch`;
  return (
    <div ref={ref} style={{ position: 'relative', height: lines.length * LINE_HEIGHT }}>
      <pre
        className={`prism-code is_virtualized language-${language}`}
        style={{ position: 'absolute', top: range.start * LINE_HEIGHT, left: 0 }}
      >
        {lines.slice(range.start, range.end).map((line, i) => (
          <CodeLine
            key={range.start + i}
            line={line}
            language={language}
            lineNumber={withLineNumbers ? range.start + i + 1 : undefined}
            lineNumberWidth={lineNumberWidth}
          />
        ))}
      </pre>
    </div>
  );
}

const CodeBlockCode = React.memo(function CodeBlockCode({
  code,
  language,
  withLineNumbers,
}: {
  code: string;
  language: Language;
  withLineNumbers?: boolean;
}) {
  if (code.length > VIRTUALIZE_MIN_LENGTH) {
    return <VirtualizedCode code={code} language={language} withLineNumbers={withLineNumbers} />;
  }

  return (
    <Highlight code={code} theme={theme} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {withLineNumbers && <span className="line-number">{i + 1}</span>}
              <span className="line-content">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
});

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
