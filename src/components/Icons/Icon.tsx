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
import CircleSVG from 'assets/icons/icon_circle.svg?react';
import SquareSVG from 'assets/icons/icon_square.svg?react';
import CheckSVG from 'assets/icons/icon_check.svg?react';
import LogoHorizontalGraySVG from 'assets/icons/logo_horizontal_s_gray.svg?react';
import LogoMarkOnlySVG from 'assets/icons/logo_no_text.svg?react';
import Logo3DMarkOnlySVG from 'assets/icons/logo_3d_2.svg?react';
import InputHelperSVG from 'assets/icons/icon_input.svg?react';
import AddSVG from 'assets/icons/icon_plus.svg?react';
import CloseSVG from 'assets/icons/icon_close.svg?react';
import HamburgerSVG from 'assets/icons/icon_gnb_menu.svg?react';
import GridViewSVG from 'assets/icons/icon_view_grid.svg?react';
import ListViewSVG from 'assets/icons/icon_view_list.svg?react';
import ShortcutSVG from 'assets/icons/icon_short_cut.svg?react';
import OpenSelectorSVG from 'assets/icons/icon_open_selector.svg?react';
import StarSVG from 'assets/icons/icon_star.svg?react';
import StarFullSVG from 'assets/icons/icon_star_full.svg?react';
import ChartSVG from 'assets/icons/icon_chart.svg?react';
import KeynoteSVG from 'assets/icons/icon_keynote.svg?react';
import KeySVG from 'assets/icons/icon_key.svg?react';
import MessageSmileSVG from 'assets/icons/icon_message_smile.svg?react';
import RouteSVG from 'assets/icons/icon_route.svg?react';
import SearchSVG from 'assets/icons/icon_search.svg?react';
import TrashSVG from 'assets/icons/icon_trash.svg?react';
import ArrowBackSVG from 'assets/icons/icon_arrow_back.svg?react';
import CodeSnippetSVG from 'assets/icons/icon_code_snippet.svg?react';
import PlaySVG from 'assets/icons/icon_play.svg?react';
import BranchSVG from 'assets/icons/icon_branch.svg?react';
import CopySVG from 'assets/icons/icon_copy.svg?react';
import LockSmallSVG from 'assets/icons/icon_lock_small.svg?react';
import Arrow2SVG from 'assets/icons/icon_arrow2.svg?react';
import ArrowSVG from 'assets/icons/icon_arrow.svg?react';
import CloseSmallSVG from 'assets/icons/icon_close_small.svg?react';
import SlackSVG from 'assets/icons/icon_slack.svg?react';
import GitHubSVG from 'assets/icons/icon_github.svg?react';
import BackHomeSVG from 'assets/icons/icon_back_home.svg?react';
import AlertSVG from 'assets/icons/icon_alert.svg?react';
import AddMemberSVG from 'assets/icons/icon_add_member.svg?react';
import MemberEmailSVG from 'assets/icons/icon_member_email.svg?react';
import SettingSVG from 'assets/icons/icon_setting.svg?react';
import PreviousSVG from 'assets/icons/icon_previous.svg?react';
import NextSVG from 'assets/icons/icon_next.svg?react';
import DiscordSVG from 'assets/icons/icon_discord.svg?react';
import MoreLargeSVG from 'assets/icons/icon_more_large.svg?react';
import RepeatSVG from 'assets/icons/icon_repeat.svg?react';
import LightningSVG from 'assets/icons/icon_lightning.svg?react';

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
  setting: <SettingSVG />,
  previous: <PreviousSVG />,
  next: <NextSVG />,
  discord: <DiscordSVG />,
  moreLarge: <MoreLargeSVG />,
  repeat: <RepeatSVG />,
  lightning: <LightningSVG />,
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
