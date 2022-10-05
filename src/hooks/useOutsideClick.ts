import { useEffect, useRef } from 'react';

/**
 * It calls the callback function when the user clicks outside of the ref element
 * @param {any} ref - The ref of the element you want to detect clicks outside of.
 * @param callback - The function to call when the user clicks outside of the element.
 * @param {any[]} excludedRefs - The refs of the elements or selectors you want to exclude from the callback.
 */
export const useOutsideClick = (ref: any, callback: (event: MouseEvent) => void, ...excludedElems: any[]): void => {
  const callBackRef = useRef<(event: MouseEvent) => void>();
  callBackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current?.contains(target)) {
        return;
      }
      for (const excludedElem of excludedElems) {
        if (!excludedElem) continue;
        if (typeof excludedElem === 'string') {
          if (target.closest(excludedElem)) {
            return;
          }
        }
        if (excludedElem.current?.contains(target)) {
          return;
        }
      }

      callBackRef.current && callBackRef.current(event);
    };

    document.addEventListener('click', handleClickOutside);

    return (): void => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback, excludedElems]);
};
