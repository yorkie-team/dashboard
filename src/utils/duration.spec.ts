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

import { describe, it, expect } from 'vitest';
import { parseGoDuration } from './duration';

describe('parseGoDuration', () => {
  it('parses single units', () => {
    expect(parseGoDuration('100ms')).toBe(100e6);
    expect(parseGoDuration('1s')).toBe(1e9);
    expect(parseGoDuration('500us')).toBe(500e3);
    expect(parseGoDuration('500µs')).toBe(500e3);
    expect(parseGoDuration('10ns')).toBe(10);
    expect(parseGoDuration('2h')).toBe(7200e9);
  });

  it('parses fractions and combined units', () => {
    expect(parseGoDuration('0.5s')).toBe(500e6);
    expect(parseGoDuration('.5s')).toBe(500e6);
    expect(parseGoDuration('1m30s')).toBe(90e9);
    expect(parseGoDuration('1s500ms')).toBe(1500e6);
  });

  it('accepts a bare zero and signs', () => {
    expect(parseGoDuration('0')).toBe(0);
    expect(parseGoDuration('0s')).toBe(0);
    expect(parseGoDuration('+10ms')).toBe(10e6);
    expect(parseGoDuration('-10ms')).toBe(-10e6);
  });

  it('rejects what Go rejects', () => {
    expect(parseGoDuration('')).toBeUndefined();
    expect(parseGoDuration('10')).toBeUndefined();
    expect(parseGoDuration('ms')).toBeUndefined();
    expect(parseGoDuration('10 ms')).toBeUndefined();
    expect(parseGoDuration('1d')).toBeUndefined();
    expect(parseGoDuration('1s ')).toBeUndefined();
  });
});
