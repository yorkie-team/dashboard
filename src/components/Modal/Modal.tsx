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

import React, { useEffect } from 'react';
import { Icon } from 'components';
import classNames from 'classnames';

export function Modal({ children, large }: { children: React.ReactNode; large?: boolean }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className="dimmed"></div>
      <div className={classNames('modal', { modal_l: large })}>{children}</div>
    </>
  );
}

function Top({ children }: { children: React.ReactNode }) {
  return <div className="modal_top">{children}</div>;
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="modal_content">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
  return <p className="modal_title fontsize_24 fontweight_600">{children}</p>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <p className="modal_desc fontsize_14 gray600">{children}</p>;
}

function Bottom({ children, combine }: { children: React.ReactNode; combine?: boolean }) {
  return <div className={classNames('modal_bottom', { combine_box: combine })}>{children}</div>;
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="btn_close" onClick={onClick}>
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
