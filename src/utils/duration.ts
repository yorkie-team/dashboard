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

const NANOS_PER_UNIT: Record<string, number> = {
  ns: 1,
  us: 1e3,
  µs: 1e3, // U+00B5 micro sign
  μs: 1e3, // U+03BC Greek mu
  ms: 1e6,
  s: 1e9,
  m: 60e9,
  h: 3600e9,
};

const DURATION_PATTERN = /^[-+]?((\d+(\.\d*)?|\.\d+)(ns|us|µs|μs|ms|s|m|h))+$/;
const DURATION_PART = /(\d+(?:\.\d*)?|\.\d+)(ns|us|µs|μs|ms|s|m|h)/g;

/**
 * `parseGoDuration` parses a duration string the way Go's `time.ParseDuration`
 * does, such as "100ms", "1.5s" or "1m30s", and returns it in nanoseconds.
 * It returns `undefined` for a string the server would reject.
 */
export const parseGoDuration = (value: string): number | undefined => {
  if (value === '0' || value === '+0' || value === '-0') return 0;
  if (!DURATION_PATTERN.test(value)) return undefined;

  let nanos = 0;
  for (const [, amount, unit] of value.matchAll(DURATION_PART)) {
    nanos += Number(amount) * NANOS_PER_UNIT[unit];
  }
  return value.startsWith('-') ? -nanos : nanos;
};
