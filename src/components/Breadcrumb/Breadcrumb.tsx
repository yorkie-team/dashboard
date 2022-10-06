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

import React, { ReactNode } from 'react';

export function Breadcrumb({ children }: { children: ReactNode }) {
  return (
    <div className="shortcut team_view">{children}</div>
  );
}

export function Inner({ children }: { children: ReactNode }) {
  return (
    <div className="shortcut_inner">{children}</div>
  )
}

export function Item({ children }: { children: ReactNode }) {
  return (
    <button type="button" className="shortcut_item">{children}</button>
  )
}

export function Thumb({ src }: { src: string }) {
  return (
    <div className="shortcut_thumb">
      <img src={src} alt="" />
    </div>
  )
}

export function Text({ children }: { children: ReactNode }) {
  return (
    <div className="shortcut_text">{children}</div>
  )
}

Breadcrumb.Item = Item;
Breadcrumb.Inner = Inner;
Breadcrumb.Thumb = Thumb;
Breadcrumb.Text = Text;
