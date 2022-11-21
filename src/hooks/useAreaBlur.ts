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

import { useRef } from 'react';

/**
 * It calls the callback function when the user moves focus
 * to previous focusable element on the first focusable element
 * or to next focusable element on the last focusable element.
 */
export const useAreaBlur = (
  callback: () => void,
): [React.MutableRefObject<any>, React.MutableRefObject<any>, (e: any) => void] => {
  const firstRef = useRef<any>(null);
  const lastRef = useRef<any>(null);

  const onKeyDown = (e: any) => {
    if (e.key !== 'Tab') return;

    // shift + tab
    if (e.shiftKey && document.activeElement === firstRef.current) {
      callback();
    }
    if (document.activeElement === lastRef.current) {
      callback();
    }
  };

  return [firstRef, lastRef, onKeyDown];
};
