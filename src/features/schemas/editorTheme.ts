/*
 * Copyright 2026 The Yorkie Authors. All rights reserved.
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

import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// The colors are the `--code-*` tokens the Prism code blocks already use, so
// the editor reads the same as the rest of the dashboard and follows the
// light and dark values without a second palette.
const highlightStyle = HighlightStyle.define([
  { tag: [t.comment, t.meta], color: 'var(--code-slategray)' },
  { tag: [t.keyword, t.modifier, t.definitionKeyword, t.moduleKeyword], color: 'var(--code-blue)' },
  { tag: [t.string, t.special(t.string)], color: 'var(--code-green)' },
  { tag: [t.number, t.bool, t.null, t.atom, t.regexp, t.escape], color: 'var(--code-orange)' },
  { tag: [t.typeName, t.className, t.namespace, t.function(t.variableName)], color: 'var(--code-purple)' },
  { tag: [t.operator, t.typeOperator], color: 'var(--code-brown)' },
  { tag: [t.punctuation, t.bracket, t.variableName, t.propertyName], color: 'var(--code-gray)' },
]);

const chrome = {
  '&': {
    color: 'var(--code-gray)',
  },
  '.cm-content': {
    caretColor: 'var(--gray-900)',
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: 'var(--gray-900)',
  },
};

/**
 * `schemaEditorTheme` returns the editor theme for the schema editor. The
 * `dark` flag only tells CodeMirror which base styles (selection, active
 * line) to pair with it; the syntax colors come from CSS variables.
 */
export function schemaEditorTheme(dark: boolean) {
  return [EditorView.theme(chrome, { dark }), syntaxHighlighting(highlightStyle)];
}
