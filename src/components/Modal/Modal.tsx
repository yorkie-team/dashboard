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

import { createContext, useContext, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from 'components';
import classNames from 'classnames';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';

type ModalContextValue = {
  titleId: string;
  // The close button registers its handler here so Escape can close the modal the same way.
  closeRef: React.MutableRefObject<(() => void) | null>;
};
const ModalContext = createContext<ModalContextValue | null>(null);

export function Modal({
  children,
  large,
  onClose,
}: {
  children: React.ReactNode;
  large?: boolean;
  /** Called when Escape is pressed. Defaults to the handler of Modal.CloseButton, if there is one. */
  onClose?: () => void;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<(() => void) | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  // Read during the first render: by the time effects run, an autofocused field inside the modal already has focus.
  const returnFocusRef = useRef<HTMLElement | null>(document.activeElement as HTMLElement | null);
  const titleId = useId();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Move focus into the dialog, keep Tab inside it, close on Escape, and restore focus on close.
  useEffect(() => {
    const $modal = modalRef.current;
    if (!$modal) return;

    // Skip elements that cannot take focus (the `hidden` attribute, display: none, hidden ancestors).
    const focusables = () =>
      Array.from($modal.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hidden && el.getClientRects().length > 0,
      );
    const $first = focusables().find((el) => el.tagName === 'INPUT') || $modal;
    $first.focus();

    // Listen on the document so the keys still work after a click on the dimmer moved focus out of the dialog.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing) return;

      // Only the topmost dialog reacts, e.g. an error modal shown over another modal.
      const $modals = document.querySelectorAll('.modal');
      if ($modals[$modals.length - 1] !== $modal) return;

      if (e.key === 'Escape') {
        const close = onCloseRef.current || closeRef.current;
        if (!close) return;
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const items = focusables();
      const active = document.activeElement;
      if (items.length === 0) {
        e.preventDefault();
        $modal.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (!$modal.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && (active === first || active === $modal)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // The trigger may be gone by now (a deleted row, a closed dropdown item).
      const $return = returnFocusRef.current;
      if ($return?.isConnected) $return.focus();
    };
  }, []);

  return createPortal(
    <ModalContext.Provider value={{ titleId, closeRef }}>
      <div className="dimmed"></div>
      <div
        ref={modalRef}
        className={classNames('modal', { modal_l: large })}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        {children}
      </div>
    </ModalContext.Provider>,
    document.body,
  );
}

function Top({ children }: { children: React.ReactNode }) {
  return <div className="modal_top">{children}</div>;
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="modal_content">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
  const ctx = useContext(ModalContext);
  return (
    <p id={ctx?.titleId} className="modal_title fontsize_24 fontweight_600">
      {children}
    </p>
  );
}

function Description({ children }: { children: React.ReactNode }) {
  return <p className="modal_desc fontsize_14 gray600">{children}</p>;
}

function Bottom({ children, combine }: { children: React.ReactNode; combine?: boolean }) {
  return <div className={classNames('modal_bottom', { combine_box: combine })}>{children}</div>;
}

function CloseButton({ onClick }: { onClick: () => void }) {
  const ctx = useContext(ModalContext);
  useEffect(() => {
    if (!ctx) return;
    ctx.closeRef.current = onClick;
    return () => {
      ctx.closeRef.current = null;
    };
  });

  return (
    <button type="button" className="btn_close" onClick={onClick} aria-label="Close">
      <Icon type="close" className="gray600" />
    </button>
  );
}

Modal.Top = Top;
Modal.Content = Content;
Modal.Title = Title;
Modal.Description = Description;
Modal.Bottom = Bottom;
Modal.CloseButton = CloseButton;
