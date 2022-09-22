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
