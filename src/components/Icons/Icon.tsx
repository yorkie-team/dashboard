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
import { ReactComponent as StarSVG } from 'assets/icons/icon_star.svg';
import { ReactComponent as StarFullSVG } from 'assets/icons/icon_star_full.svg';
import { ReactComponent as ChartSVG } from 'assets/icons/icon_chart.svg';
import { ReactComponent as KeynoteSVG } from 'assets/icons/icon_keynote.svg';
import { ReactComponent as KeySVG } from 'assets/icons/icon_key.svg';
import { ReactComponent as MessageSmileSVG } from 'assets/icons/icon_message_smile.svg';
import { ReactComponent as RouteSVG } from 'assets/icons/icon_route.svg';
import { ReactComponent as SearchSVG } from 'assets/icons/icon_search.svg';
import { ReactComponent as TrashSVG } from 'assets/icons/icon_trash.svg';
import { ReactComponent as ArrowBackSVG } from 'assets/icons/icon_arrow_back.svg';
import { ReactComponent as CodeSnippetSVG } from 'assets/icons/icon_code_snippet.svg';
import { ReactComponent as PlaySVG } from 'assets/icons/icon_play.svg';
import { ReactComponent as BranchSVG } from 'assets/icons/icon_branch.svg';
import { ReactComponent as CopySVG } from 'assets/icons/icon_copy.svg';
import { ReactComponent as LockSmallSVG } from 'assets/icons/icon_lock_small.svg';
import { ReactComponent as Arrow2SVG } from 'assets/icons/icon_arrow2.svg';
import { ReactComponent as ArrowSVG } from 'assets/icons/icon_arrow.svg';
import { ReactComponent as CloseSmallSVG } from 'assets/icons/icon_close_small.svg';
import { ReactComponent as SlackSVG } from 'assets/icons/icon_slack.svg';
import { ReactComponent as GitHubSVG } from 'assets/icons/icon_github.svg';
import { ReactComponent as BackHomeSVG } from 'assets/icons/icon_back_home.svg';
import { ReactComponent as AlertSVG } from 'assets/icons/icon_alert.svg';
import { ReactComponent as AddMemberSVG } from 'assets/icons/icon_add_member.svg';
import { ReactComponent as MemberEmailSVG } from 'assets/icons/icon_member_email.svg';

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
  star: <StarSVG />,
  starFull: <StarFullSVG />,
  chart: <ChartSVG />,
  keynote: <KeynoteSVG />,
  key: <KeySVG />,
  messageSmile: <MessageSmileSVG />,
  route: <RouteSVG />,
  search: <SearchSVG />,
  trash: <TrashSVG />,
  arrowBack: <ArrowBackSVG />,
  codeSnippet: <CodeSnippetSVG />,
  play: <PlaySVG />,
  branch: <BranchSVG />,
  copy: <CopySVG />,
  lockSmall: <LockSmallSVG />,
  arrow2: <Arrow2SVG />,
  arrow: <ArrowSVG />,
  closeSmall: <CloseSmallSVG />,
  slack: <SlackSVG />,
  github: <GitHubSVG />,
  backHome: <BackHomeSVG />,
  alert: <AlertSVG />,
  addMember: <AddMemberSVG />,
  memberEmail: <MemberEmailSVG />,
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
