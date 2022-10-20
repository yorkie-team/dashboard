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

import React, { useState, useEffect } from 'react';
import { Icon } from 'components';

export function InputHelperText({
  state,
  message,
  onSuccessEnd,
}: {
  state?: 'success' | 'error';
  message: string;
  onSuccessEnd?: () => void;
}) {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    if (state === 'error') return;
    const timer = setTimeout(() => {
      setAlert(false);
      onSuccessEnd && onSuccessEnd();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [state, onSuccessEnd]);

  if (state === 'success' && !alert) {
    return null;
  }

  return (
    <div className="input_guide">
      {state && <Icon type="input" />}
      <p className="input_guide_desc">{message}</p>
    </div>
  );
}
