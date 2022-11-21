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

import { useEffect, useRef } from 'react';

/**
 * It calls the callback function when the user clicks outside of the ref element
 * @param {any} ref - The ref of the element you want to detect clicks outside of.
 * @param callback - The function to call when the user clicks outside of the element.
 * @param {any[]} excludedRefs - The refs of the elements you want to exclude from the callback.
 */
export const useOutsideClick = (ref: any, callback: (event: MouseEvent) => void, ...excludedRefs: any[]): void => {
  const callBackRef = useRef<(event: MouseEvent) => void>();
  callBackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current?.contains(target)) {
        return;
      }
      for (const excludedRef of excludedRefs) {
        if (excludedRef.current?.contains(target)) {
          return;
        }
      }

      callBackRef.current && callBackRef.current(event);
    };

    document.addEventListener('click', handleClickOutside);

    return (): void => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback, excludedRefs]);
};
