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

import { useState } from 'react';

export function useClipboard({ timeout = 2000 } = {}) {
  const [error, setError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<number | undefined>(undefined);

  const handleCopyResult = (value: boolean) => {
    window.clearTimeout(copyTimeout);
    setCopyTimeout(window.setTimeout(() => setCopied(false), timeout));
    setCopied(value);
  };

  const copy = (valueToCopy: string) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => setError(err));
    } else {
      setError(new Error('useClipboard: navigator.clipboard is not supported'));
    }
  };

  const reset = () => {
    setCopied(false);
    setError(null);
    window.clearTimeout(copyTimeout);
  };

  return { copy, reset, error, copied };
}
