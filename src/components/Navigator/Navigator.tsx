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

import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

export const Navigator = ({ navList }: { navList: Array<{ name: string; id: string }> }) => {
  const [activeId, setActiveId] = useState(navList[0].id);
  const contentRef = useRef<any>({});

  useEffect(() => {
    const callback: IntersectionObserverCallback = (observedContent) => {
      observedContent.forEach((content) => {
        contentRef.current[content.target.id] = content;
      });

      const visibleContents = Object.values(contentRef.current).filter((content: any) => content.isIntersecting) as any;
      setActiveId(visibleContents[0]?.target.id);
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-20% 0px',
    });

    const contents = document.querySelectorAll('.section');
    contents.forEach((content) => {
      observer.observe(content);
    });

    return () => observer.disconnect();
  }, [setActiveId]);

  return (
    <nav className="navigator">
      <ul className="navigator_list">
        {navList.map(({ name, id }) => {
          return (
            <li key={id} className={classNames('navigator_group', { is_active: activeId === id })}>
              <a href={`#${id}`} className="navigator_item">
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
