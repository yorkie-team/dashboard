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

import React from 'react';
import classNames from 'classnames';
import './icon.scss';
import { ReactComponent as CircleSVG } from 'assets/icons/icon_circle.svg';
import { ReactComponent as SquareSVG } from 'assets/icons/icon_square.svg';
import { ReactComponent as CheckSVG } from 'assets/icons/icon_check.svg';
import { ReactComponent as LogoHorizontalGraySVG } from 'assets/icons/logo_horizontal_s_gray.svg';
import { ReactComponent as LogoMarkOnlySVG } from 'assets/icons/logo_no_text.svg';
import { ReactComponent as Logo3DMarkOnlySVG } from 'assets/icons/logo_3d_2.svg';
import { ReactComponent as InputHelperSVG } from 'assets/icons/icon_input.svg';
import { ReactComponent as AddSVG } from 'assets/icons/icon_plus.svg';
import { ReactComponent as CloseSVG } from 'assets/icons/icon_close.svg';
import { ReactComponent as HamburgerSVG } from 'assets/icons/icon_gnb_menu.svg';
import { ReactComponent as GridViewSVG } from 'assets/icons/icon_view_grid.svg';
import { ReactComponent as ListViewSVG } from 'assets/icons/icon_view_list.svg';
import { ReactComponent as ShortcutSVG } from 'assets/icons/icon_short_cut.svg';
import { ReactComponent as OpenSelectorSVG } from 'assets/icons/icon_open_selector.svg';

const svgMap = {
  shortcut: <ShortcutSVG />,
  circle: <CircleSVG />,
  square: <SquareSVG />,
  check: <CheckSVG />,
  LogoHorizontalGray: <LogoHorizontalGraySVG />,
  logoNoText: <LogoMarkOnlySVG />,
  logo3d: <Logo3DMarkOnlySVG />,
  input: <InputHelperSVG />,
  plus: <AddSVG />,
  close: <CloseSVG />,
  gnbMenu: <HamburgerSVG />,
  openSelector: <OpenSelectorSVG />,
  viewGrid: <GridViewSVG />,
  viewList: <ListViewSVG />,
};
type SVGType = keyof typeof svgMap;

export function Icon({
  type,
  color,
  className,
  fill,
}: {
  type: SVGType;
  color?: string;
  className?: string;
  fill?: boolean;
}) {
  return <span className={classNames({ icon: !fill }, className, color)}>{svgMap[type]}</span>;
}
