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

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';

export const Navigator = ({ navList }: { navList: Array<{ name: string; id: string }> }) => {
  const SCROLL_OFFSET_PX = 120;

  const [activeId, setActiveId] = useState(navList[0].id);
  const contentRef = useRef<any>({});
  const scrollRootRef = useRef<HTMLElement | null>(null);

  const getScrollableParent = useCallback((el: HTMLElement | null) => {
    if (!el) return null;
    let parent: HTMLElement | null = el.parentElement;

    while (parent && parent !== document.body) {
      const style = window.getComputedStyle(parent);
      const overflowY = style.overflowY;
      const isScrollable =
        (overflowY === 'auto' || overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight;
      if (isScrollable) return parent;
      parent = parent.parentElement;
    }
    return null;
  }, []);

  const ensureScrollRoot = useCallback(() => {
    if (scrollRootRef.current) return scrollRootRef.current;
    const first = document.querySelector('.section') as HTMLElement | null;
    const root = getScrollableParent(first) || null;
    scrollRootRef.current = root;
    return root;
  }, [getScrollableParent]);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const root = ensureScrollRoot();

      if (root) {
        const rootRect = root.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const top = elRect.top - rootRect.top + root.scrollTop - SCROLL_OFFSET_PX;
        root.scrollTo({ top, behavior: 'smooth' });
      } else {
        const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }

      const url = new URL(window.location.href);
      url.hash = id;
      window.history.replaceState(null, '', url.toString());
    },
    [ensureScrollRoot],
  );

  useEffect(() => {
    const root = ensureScrollRoot();

    const callback: IntersectionObserverCallback = (observedContent) => {
      observedContent.forEach((content) => {
        contentRef.current[content.target.id] = content;
      });

      const visibleContents = Object.values(contentRef.current).filter((content: any) => content.isIntersecting) as any;
      setActiveId(visibleContents[0]?.target.id);
    };

    const observer = new IntersectionObserver(callback, {
      root: root ?? null,
      rootMargin: `-${SCROLL_OFFSET_PX}px 0px -80% 0px`,
    });

    const contents = document.querySelectorAll('.section');
    contents.forEach((content) => {
      observer.observe(content);
    });

    return () => observer.disconnect();
  }, [ensureScrollRoot]);

  useEffect(() => {
    const id = window.location.hash?.replace('#', '');
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    scrollToId(id);
  }, [scrollToId]);

  return (
    <nav className="navigator">
      <ul className="navigator_list">
        {navList.map(({ name, id }) => {
          return (
            <li key={id} className={classNames('navigator_group', { is_active: activeId === id })}>
              <a
                href={`#${id}`}
                className="navigator_item"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(id);
                }}
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
