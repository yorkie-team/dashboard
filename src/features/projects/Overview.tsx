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

import React, { useState } from 'react';
// TODO(chacha912): Extract to CodeBlock component
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme, { getStringStyle } from '../documents/prismThemeLight';
import { useAppSelector } from 'app/hooks';
import { selectProjectDetail } from './projectsSlice';
import { Icon } from 'components';

type Snippet = 'npm' | 'cdn';

export function Overview() {
  const { project, status } = useAppSelector(selectProjectDetail);
  const [snippetType, setSnippetType] = useState<Snippet>('npm');
  const snippet = {
    npm: `import yorkie from 'yorkie-js-sdk';

async function main() {
  const client = new yorkie.Client('${process.env.REACT_APP_API_ADDR}', {
    apiKey: '${project?.publicKey}',
  });
  await client.activate();

  const doc = new yorkie.Document('my-first-document');
  await client.attach(doc);

  client.subscribe((event) => {
    if (event.type === 'peers-changed') {
      const peers = event.value[doc.getKey()];
      document.getElementById('peersCount').innerHTML = Object.entries(peers).length;
    }
  });
}
main();`,
    cdn: `<div>There are currently <span id='peersCount'></span> peers!</div>

<!-- include yorkie js -->
<script src="${process.env.REACT_APP_JS_SDK_URL}"></script>
<script>
  async function main() {
    const client = new yorkie.Client('${process.env.REACT_APP_API_ADDR}', {
      apiKey: '${project?.publicKey}',
    });
    await client.activate();

    const doc = new yorkie.Document('my-first-document');
    await client.attach(doc);

    client.subscribe((event) => {
      if (event.type === 'peers-changed') {
        const peers = event.value[doc.getKey()];
        document.getElementById('peersCount').innerHTML = Object.entries(peers).length;
      }
    });
  }
  main();
</script>`,
  };

  return (
    <div className="init_area">
      <div className="init_box">
        <div className="title_box ">
          <Icon type="messageSmile" />
          <strong className="title">Your project is ready!</strong>
        </div>
        <p className="title_desc">Your project is now ready to use with its own APIs.</p>
      </div>
      <div className="init_box">
        <div className="title_box ">
          <Icon type="route" />
          <strong className="title">Add Yorkie SDK in your app</strong>
        </div>
      </div>
    </div>
  );

  // TODO(hackerwins): Add code snippet
  // return (
  //   <div>
  //     {status === 'loading' && <div>Loading...</div>}
  //     {status === 'failed' && <div>Failed!</div>}
  //     {status === 'idle' && (
  //       <div className="mt-16">
  //         <h2 className="flex items-center text-lg font-semibold mb-3">
  //           <svg
  //             className="inline mr-2"
  //             width="24"
  //             height="24"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               fillRule="evenodd"
  //               clipRule="evenodd"
  //               d="M5 3C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7C6.10457 7 7 6.10457 7 5C7 3.89543 6.10457 3 5 3ZM1 5C1 2.79086 2.79086 1 5 1C7.20914 1 9 2.79086 9 5C9 7.20914 7.20914 9 5 9C2.79086 9 1 7.20914 1 5ZM15.3531 6.06506C14.5699 6.00083 13.4768 6 11.9344 6H11.5C10.9477 6 10.5 5.55228 10.5 5C10.5 4.44772 10.9477 4 11.5 4L11.9846 4C13.4658 3.99999 14.6415 3.99998 15.5166 4.07176C15.9623 4.10831 16.3749 4.16645 16.736 4.26872C17.0962 4.37071 17.4673 4.53362 17.771 4.82093C18.5209 5.53055 18.8532 6.57592 18.6507 7.58832C18.5688 7.99821 18.3599 8.34552 18.1247 8.63678C17.8889 8.92882 17.5856 9.21455 17.2429 9.50177C16.5699 10.0657 15.61 10.7447 14.4007 11.6L10.2952 14.5039C9.0359 15.3946 8.14402 16.0264 7.54167 16.5312C7.24297 16.7815 7.0505 16.9721 6.9314 17.1196C6.83281 17.2417 6.81191 17.3009 6.80978 17.3071C6.74385 17.6425 6.8538 17.9884 7.1013 18.2241C7.10663 18.2279 7.15787 18.2642 7.30887 18.3069C7.49129 18.3586 7.75849 18.4031 8.1469 18.4349C8.93013 18.4992 10.0232 18.5 11.5656 18.5H12.5C13.0523 18.5 13.5 18.9477 13.5 19.5C13.5 20.0523 13.0523 20.5 12.5 20.5H11.5154C10.0343 20.5 8.85853 20.5 7.98341 20.4282C7.53771 20.3917 7.12511 20.3335 6.76395 20.2313C6.40378 20.1293 6.03267 19.9664 5.72904 19.6791C4.97912 18.9694 4.64679 17.9241 4.84925 16.9117C4.93123 16.5018 5.14013 16.1545 5.37529 15.8632C5.61108 15.5712 5.91437 15.2854 6.25714 14.9982C6.93015 14.4343 7.89004 13.7553 9.09927 12.9L13.2048 9.99611C14.4641 9.1054 15.356 8.47355 15.9583 7.96881C16.257 7.71851 16.4495 7.5279 16.5686 7.38039C16.6672 7.25833 16.6881 7.19915 16.6902 7.1929C16.7562 6.85751 16.6462 6.51165 16.3987 6.2759C16.3934 6.27206 16.3421 6.23581 16.1911 6.19305C16.0087 6.1414 15.7415 6.09692 15.3531 6.06506ZM19 17C17.8954 17 17 17.8954 17 19C17 20.1046 17.8954 21 19 21C20.1046 21 21 20.1046 21 19C21 17.8954 20.1046 17 19 17ZM15 19C15 16.7909 16.7909 15 19 15C21.2091 15 23 16.7909 23 19C23 21.2091 21.2091 23 19 23C16.7909 23 15 21.2091 15 19Z"
  //               fill="#514C49"
  //             />
  //           </svg>
  //           Add Yorkie SDK in your app
  //         </h2>
  //         <div className="flex w-full bg-stone-100 mt-6 p-2">
  //           <button
  //             type="button"
  //             className={`flex justify-center items-center hover:text-gray-700 text-xs text-gray-500 font-medium py-2 px-3 ${snippetType === 'npm' ? '!bg-gray-600 !text-white' : ''
  //               }`}
  //             style={{ height: '32px', borderRadius: '8px' }}
  //             onClick={() => setSnippetType('npm')}
  //           >
  //             Use npm
  //           </button>
  //           <button
  //             type="button"
  //             className={`flex justify-center items-center hover:text-gray-700 text-xs text-gray-500 font-medium py-2 px-3 ${snippetType === 'cdn' ? '!bg-gray-600 !text-white' : ''
  //               }`}
  //             style={{ height: '32px', borderRadius: '8px' }}
  //             onClick={() => setSnippetType('cdn')}
  //           >
  //             Use a &lt;script&gt; tag
  //           </button>
  //         </div>
  //         {snippetType === 'npm' && (
  //           <>
  //             <p className="text-gray-400 text-sm my-4">
  //               If you&#39;re already using npm and a module bundler such as webpack or Rollup, you can run the
  //               following command to install the latest SDK:
  //             </p>
  //             <div
  //               className="relative bg-gray-50 py-4"
  //               style={{
  //                 fontFamily: 'Menlo',
  //                 fontSize: '0.8em',
  //                 lineHeight: '1.5em',
  //               }}
  //             >
  //               <Highlight {...defaultProps} theme={theme} code={'$ npm install yorkie-js-sdk'} language="bash">
  //                 {({ className, tokens, getLineProps, getTokenProps }) => (
  //                   <pre className={`${className} table w-full flex-grow`}>
  //                     {tokens.map((line, i) => (
  //                       <div
  //                         key={i}
  //                         {...getLineProps({ line, key: i })}
  //                         style={{ display: 'table-row', minWidth: '100%' }}
  //                       >
  //                         <div className="table-cell w-full" style={{ paddingRight: '1.5em', paddingLeft: '1.5em' }}>
  //                           {line.map((token, key) => (
  //                             <span key={key} {...getTokenProps({ token, key })} {...getStringStyle(token.types)} />
  //                           ))}
  //                         </div>
  //                       </div>
  //                     ))}
  //                   </pre>
  //                 )}
  //               </Highlight>
  //               <button
  //                 type="button"
  //                 title="Copy to clipboard"
  //                 className="absolute right-2 top-2 flex justify-center items-center hover:bg-gray-200 ml-4"
  //                 style={{ width: '36px', height: '32px', borderRadius: '4px', border: '1px #C2BDBA solid' }}
  //                 onClick={() => {
  //                   navigator.clipboard
  //                     .writeText('npm install yorkie-js-sdk')
  //                     .then(() => {
  //                       // TODO(chacha912): Replace `alert()` with alert component
  //                       alert('Copied!');
  //                     })
  //                     .catch(() => {
  //                       alert('Copy failed! Please try again.');
  //                     });
  //                 }}
  //               >
  //                 <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                   <path
  //                     fillRule="evenodd"
  //                     clipRule="evenodd"
  //                     d="M6.08073 0.5H9.91927C10.1828 0.499991 10.4102 0.499984 10.5975 0.515286C10.7952 0.531436 10.9918 0.567094 11.181 0.663491C11.4632 0.807301 11.6927 1.03677 11.8365 1.31902C11.9329 1.5082 11.9686 1.70481 11.9847 1.90249C12 2.08977 12 2.31715 12 2.58072V6.41928C12 6.68285 12 6.91023 11.9847 7.09752C11.9686 7.29519 11.9329 7.4918 11.8365 7.68099C11.6927 7.96323 11.4632 8.1927 11.181 8.33651C10.9918 8.43291 10.7952 8.46857 10.5975 8.48472C10.4102 8.50002 10.1828 8.50001 9.91926 8.5H9V9.41926C9.00001 9.68284 9.00002 9.91023 8.98472 10.0975C8.96857 10.2952 8.93291 10.4918 8.83651 10.681C8.6927 10.9632 8.46323 11.1927 8.18099 11.3365C7.9918 11.4329 7.79519 11.4686 7.59752 11.4847C7.41023 11.5 7.18285 11.5 6.91928 11.5H3.08072C2.81715 11.5 2.58977 11.5 2.40249 11.4847C2.20481 11.4686 2.0082 11.4329 1.81902 11.3365C1.53677 11.1927 1.3073 10.9632 1.16349 10.681C1.06709 10.4918 1.03144 10.2952 1.01529 10.0975C0.999984 9.91023 0.999991 9.68285 1 9.41927V5.58073C0.999991 5.31715 0.999984 5.08977 1.01529 4.90249C1.03144 4.70481 1.06709 4.5082 1.16349 4.31902C1.3073 4.03677 1.53677 3.8073 1.81902 3.66349C2.0082 3.56709 2.20481 3.53144 2.40249 3.51529C2.58977 3.49998 2.81715 3.49999 3.08073 3.5L4 3.5L4 2.58073C3.99999 2.31715 3.99998 2.08977 4.01529 1.90249C4.03144 1.70481 4.06709 1.5082 4.16349 1.31902C4.3073 1.03677 4.53677 0.807301 4.81902 0.663491C5.0082 0.567094 5.20481 0.531436 5.40249 0.515286C5.58977 0.499984 5.81715 0.499991 6.08073 0.5ZM3.1 4.5C2.81172 4.5 2.62559 4.50039 2.48392 4.51196C2.34809 4.52306 2.29773 4.5419 2.27301 4.5545C2.17892 4.60243 2.10243 4.67892 2.0545 4.77301C2.0419 4.79773 2.02306 4.84809 2.01196 4.98392C2.00039 5.12559 2 5.31172 2 5.6V9.4C2 9.68828 2.00039 9.87441 2.01196 10.0161C2.02306 10.1519 2.0419 10.2023 2.0545 10.227C2.10243 10.3211 2.17892 10.3976 2.27301 10.4455C2.29773 10.4581 2.34809 10.4769 2.48392 10.488C2.62559 10.4996 2.81172 10.5 3.1 10.5H6.9C7.18828 10.5 7.37441 10.4996 7.51608 10.488C7.65191 10.4769 7.70227 10.4581 7.727 10.4455C7.82108 10.3976 7.89757 10.3211 7.9455 10.227C7.9581 10.2023 7.97694 10.1519 7.98804 10.0161C7.99961 9.87441 8 9.68828 8 9.4V5.6C8 5.31172 7.99961 5.12559 7.98804 4.98392C7.97694 4.84809 7.9581 4.79773 7.9455 4.77301C7.89757 4.67892 7.82108 4.60243 7.727 4.5545C7.70227 4.5419 7.65191 4.52306 7.51608 4.51196C7.37441 4.50039 7.18828 4.5 6.9 4.5H3.1ZM9 7.5V5.58074C9.00001 5.31716 9.00002 5.08978 8.98472 4.90249C8.96857 4.70481 8.93291 4.5082 8.83651 4.31902C8.6927 4.03677 8.46323 3.8073 8.18099 3.66349C7.9918 3.56709 7.79519 3.53144 7.59752 3.51529C7.41023 3.49998 7.18285 3.49999 6.91927 3.5L5 3.5V2.6C5 2.31172 5.00039 2.12559 5.01196 1.98392C5.02306 1.84809 5.0419 1.79773 5.0545 1.77301C5.10243 1.67892 5.17892 1.60243 5.27301 1.5545C5.29773 1.5419 5.34809 1.52306 5.48392 1.51196C5.62559 1.50039 5.81172 1.5 6.1 1.5H9.9C10.1883 1.5 10.3744 1.50039 10.5161 1.51196C10.6519 1.52306 10.7023 1.5419 10.727 1.5545C10.8211 1.60243 10.8976 1.67892 10.9455 1.77301C10.9581 1.79773 10.9769 1.84809 10.988 1.98392C10.9996 2.12559 11 2.31172 11 2.6V6.4C11 6.68828 10.9996 6.87441 10.988 7.01608C10.9769 7.15191 10.9581 7.20227 10.9455 7.227C10.8976 7.32108 10.8211 7.39757 10.727 7.4455C10.7023 7.4581 10.6519 7.47694 10.5161 7.48804C10.3744 7.49961 10.1883 7.5 9.9 7.5H9Z"
  //                     fill="#514C49"
  //                   />
  //                 </svg>
  //               </button>
  //             </div>
  //             <p className="text-gray-400 text-sm my-4">Then, import yorkie and begin using the SDKs.</p>
  //             <div
  //               className="relative bg-gray-50 py-4"
  //               style={{
  //                 fontFamily: 'Menlo',
  //                 fontSize: '0.8em',
  //                 lineHeight: '1.5em',
  //               }}
  //             >
  //               <Highlight {...defaultProps} theme={theme} code={snippet.npm} language="javascript">
  //                 {({ className, tokens, getLineProps, getTokenProps }) => (
  //                   <pre className={`${className} table w-full flex-grow`}>
  //                     {tokens.map((line, i) => (
  //                       <div
  //                         key={i}
  //                         {...getLineProps({ line, key: i })}
  //                         style={{ display: 'table-row', minWidth: '100%' }}
  //                       >
  //                         <div
  //                           className="table-cell select-none text-right"
  //                           style={{
  //                             paddingRight: '1.5em',
  //                             paddingLeft: '1.5em',
  //                             color: '#767676',
  //                           }}
  //                         >
  //                           {i + 1}
  //                         </div>
  //                         <div className="table-cell w-full" style={{ paddingRight: '1.5em', paddingLeft: '0' }}>
  //                           {line.map((token, key) => (
  //                             <span key={key} {...getTokenProps({ token, key })} {...getStringStyle(token.types)} />
  //                           ))}
  //                         </div>
  //                       </div>
  //                     ))}
  //                   </pre>
  //                 )}
  //               </Highlight>
  //               <button
  //                 type="button"
  //                 title="Copy to clipboard"
  //                 className="absolute right-2 top-2 flex justify-center items-center hover:bg-gray-200 ml-4"
  //                 style={{ width: '36px', height: '32px', borderRadius: '4px', border: '1px #C2BDBA solid' }}
  //                 onClick={() => {
  //                   navigator.clipboard
  //                     .writeText(snippet.npm)
  //                     .then(() => {
  //                       // TODO(chacha912): Replace `alert()` with alert component
  //                       alert('Copied!');
  //                     })
  //                     .catch(() => {
  //                       alert('Copy failed! Please try again.');
  //                     });
  //                 }}
  //               >
  //                 <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                   <path
  //                     fillRule="evenodd"
  //                     clipRule="evenodd"
  //                     d="M6.08073 0.5H9.91927C10.1828 0.499991 10.4102 0.499984 10.5975 0.515286C10.7952 0.531436 10.9918 0.567094 11.181 0.663491C11.4632 0.807301 11.6927 1.03677 11.8365 1.31902C11.9329 1.5082 11.9686 1.70481 11.9847 1.90249C12 2.08977 12 2.31715 12 2.58072V6.41928C12 6.68285 12 6.91023 11.9847 7.09752C11.9686 7.29519 11.9329 7.4918 11.8365 7.68099C11.6927 7.96323 11.4632 8.1927 11.181 8.33651C10.9918 8.43291 10.7952 8.46857 10.5975 8.48472C10.4102 8.50002 10.1828 8.50001 9.91926 8.5H9V9.41926C9.00001 9.68284 9.00002 9.91023 8.98472 10.0975C8.96857 10.2952 8.93291 10.4918 8.83651 10.681C8.6927 10.9632 8.46323 11.1927 8.18099 11.3365C7.9918 11.4329 7.79519 11.4686 7.59752 11.4847C7.41023 11.5 7.18285 11.5 6.91928 11.5H3.08072C2.81715 11.5 2.58977 11.5 2.40249 11.4847C2.20481 11.4686 2.0082 11.4329 1.81902 11.3365C1.53677 11.1927 1.3073 10.9632 1.16349 10.681C1.06709 10.4918 1.03144 10.2952 1.01529 10.0975C0.999984 9.91023 0.999991 9.68285 1 9.41927V5.58073C0.999991 5.31715 0.999984 5.08977 1.01529 4.90249C1.03144 4.70481 1.06709 4.5082 1.16349 4.31902C1.3073 4.03677 1.53677 3.8073 1.81902 3.66349C2.0082 3.56709 2.20481 3.53144 2.40249 3.51529C2.58977 3.49998 2.81715 3.49999 3.08073 3.5L4 3.5L4 2.58073C3.99999 2.31715 3.99998 2.08977 4.01529 1.90249C4.03144 1.70481 4.06709 1.5082 4.16349 1.31902C4.3073 1.03677 4.53677 0.807301 4.81902 0.663491C5.0082 0.567094 5.20481 0.531436 5.40249 0.515286C5.58977 0.499984 5.81715 0.499991 6.08073 0.5ZM3.1 4.5C2.81172 4.5 2.62559 4.50039 2.48392 4.51196C2.34809 4.52306 2.29773 4.5419 2.27301 4.5545C2.17892 4.60243 2.10243 4.67892 2.0545 4.77301C2.0419 4.79773 2.02306 4.84809 2.01196 4.98392C2.00039 5.12559 2 5.31172 2 5.6V9.4C2 9.68828 2.00039 9.87441 2.01196 10.0161C2.02306 10.1519 2.0419 10.2023 2.0545 10.227C2.10243 10.3211 2.17892 10.3976 2.27301 10.4455C2.29773 10.4581 2.34809 10.4769 2.48392 10.488C2.62559 10.4996 2.81172 10.5 3.1 10.5H6.9C7.18828 10.5 7.37441 10.4996 7.51608 10.488C7.65191 10.4769 7.70227 10.4581 7.727 10.4455C7.82108 10.3976 7.89757 10.3211 7.9455 10.227C7.9581 10.2023 7.97694 10.1519 7.98804 10.0161C7.99961 9.87441 8 9.68828 8 9.4V5.6C8 5.31172 7.99961 5.12559 7.98804 4.98392C7.97694 4.84809 7.9581 4.79773 7.9455 4.77301C7.89757 4.67892 7.82108 4.60243 7.727 4.5545C7.70227 4.5419 7.65191 4.52306 7.51608 4.51196C7.37441 4.50039 7.18828 4.5 6.9 4.5H3.1ZM9 7.5V5.58074C9.00001 5.31716 9.00002 5.08978 8.98472 4.90249C8.96857 4.70481 8.93291 4.5082 8.83651 4.31902C8.6927 4.03677 8.46323 3.8073 8.18099 3.66349C7.9918 3.56709 7.79519 3.53144 7.59752 3.51529C7.41023 3.49998 7.18285 3.49999 6.91927 3.5L5 3.5V2.6C5 2.31172 5.00039 2.12559 5.01196 1.98392C5.02306 1.84809 5.0419 1.79773 5.0545 1.77301C5.10243 1.67892 5.17892 1.60243 5.27301 1.5545C5.29773 1.5419 5.34809 1.52306 5.48392 1.51196C5.62559 1.50039 5.81172 1.5 6.1 1.5H9.9C10.1883 1.5 10.3744 1.50039 10.5161 1.51196C10.6519 1.52306 10.7023 1.5419 10.727 1.5545C10.8211 1.60243 10.8976 1.67892 10.9455 1.77301C10.9581 1.79773 10.9769 1.84809 10.988 1.98392C10.9996 2.12559 11 2.31172 11 2.6V6.4C11 6.68828 10.9996 6.87441 10.988 7.01608C10.9769 7.15191 10.9581 7.20227 10.9455 7.227C10.8976 7.32108 10.8211 7.39757 10.727 7.4455C10.7023 7.4581 10.6519 7.47694 10.5161 7.48804C10.3744 7.49961 10.1883 7.5 9.9 7.5H9Z"
  //                     fill="#514C49"
  //                   />
  //                 </svg>
  //               </button>
  //             </div>
  //           </>
  //         )}
  //         {snippetType === 'cdn' && (
  //           <>
  //             <p className="text-gray-400 text-sm my-4">
  //               Copy and paste the following script into the bottom of your &lt;body&gt; tag.
  //             </p>
  //             <div
  //               className="relative bg-gray-50 py-4"
  //               style={{
  //                 fontFamily: 'Menlo',
  //                 fontSize: '0.8em',
  //                 lineHeight: '1.5em',
  //               }}
  //             >
  //               <Highlight {...defaultProps} theme={theme} code={snippet.cdn} language="markup">
  //                 {({ className, tokens, getLineProps, getTokenProps }) => (
  //                   <pre className={`${className} table w-full flex-grow`}>
  //                     {tokens.map((line, i) => (
  //                       <div
  //                         key={i}
  //                         {...getLineProps({ line, key: i })}
  //                         style={{ display: 'table-row', minWidth: '100%' }}
  //                       >
  //                         <div
  //                           className="table-cell select-none text-right"
  //                           style={{
  //                             paddingRight: '1.5em',
  //                             paddingLeft: '1.5em',
  //                             color: '#767676',
  //                           }}
  //                         >
  //                           {i + 1}
  //                         </div>
  //                         <div className="table-cell w-full" style={{ paddingRight: '1.5em', paddingLeft: '0' }}>
  //                           {line.map((token, key) => (
  //                             <span key={key} {...getTokenProps({ token, key })} {...getStringStyle(token.types)} />
  //                           ))}
  //                         </div>
  //                       </div>
  //                     ))}
  //                   </pre>
  //                 )}
  //               </Highlight>
  //               <button
  //                 type="button"
  //                 title="Copy to clipboard"
  //                 className="absolute right-2 top-2 flex justify-center items-center hover:bg-gray-200 ml-4"
  //                 style={{ width: '36px', height: '32px', borderRadius: '4px', border: '1px #C2BDBA solid' }}
  //                 onClick={() => {
  //                   navigator.clipboard
  //                     .writeText(snippet.cdn)
  //                     .then(() => {
  //                       // TODO(chacha912): Replace `alert()` with alert component
  //                       alert('Copied!');
  //                     })
  //                     .catch(() => {
  //                       alert('Copy failed! Please try again.');
  //                     });
  //                 }}
  //               >
  //                 <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                   <path
  //                     fillRule="evenodd"
  //                     clipRule="evenodd"
  //                     d="M6.08073 0.5H9.91927C10.1828 0.499991 10.4102 0.499984 10.5975 0.515286C10.7952 0.531436 10.9918 0.567094 11.181 0.663491C11.4632 0.807301 11.6927 1.03677 11.8365 1.31902C11.9329 1.5082 11.9686 1.70481 11.9847 1.90249C12 2.08977 12 2.31715 12 2.58072V6.41928C12 6.68285 12 6.91023 11.9847 7.09752C11.9686 7.29519 11.9329 7.4918 11.8365 7.68099C11.6927 7.96323 11.4632 8.1927 11.181 8.33651C10.9918 8.43291 10.7952 8.46857 10.5975 8.48472C10.4102 8.50002 10.1828 8.50001 9.91926 8.5H9V9.41926C9.00001 9.68284 9.00002 9.91023 8.98472 10.0975C8.96857 10.2952 8.93291 10.4918 8.83651 10.681C8.6927 10.9632 8.46323 11.1927 8.18099 11.3365C7.9918 11.4329 7.79519 11.4686 7.59752 11.4847C7.41023 11.5 7.18285 11.5 6.91928 11.5H3.08072C2.81715 11.5 2.58977 11.5 2.40249 11.4847C2.20481 11.4686 2.0082 11.4329 1.81902 11.3365C1.53677 11.1927 1.3073 10.9632 1.16349 10.681C1.06709 10.4918 1.03144 10.2952 1.01529 10.0975C0.999984 9.91023 0.999991 9.68285 1 9.41927V5.58073C0.999991 5.31715 0.999984 5.08977 1.01529 4.90249C1.03144 4.70481 1.06709 4.5082 1.16349 4.31902C1.3073 4.03677 1.53677 3.8073 1.81902 3.66349C2.0082 3.56709 2.20481 3.53144 2.40249 3.51529C2.58977 3.49998 2.81715 3.49999 3.08073 3.5L4 3.5L4 2.58073C3.99999 2.31715 3.99998 2.08977 4.01529 1.90249C4.03144 1.70481 4.06709 1.5082 4.16349 1.31902C4.3073 1.03677 4.53677 0.807301 4.81902 0.663491C5.0082 0.567094 5.20481 0.531436 5.40249 0.515286C5.58977 0.499984 5.81715 0.499991 6.08073 0.5ZM3.1 4.5C2.81172 4.5 2.62559 4.50039 2.48392 4.51196C2.34809 4.52306 2.29773 4.5419 2.27301 4.5545C2.17892 4.60243 2.10243 4.67892 2.0545 4.77301C2.0419 4.79773 2.02306 4.84809 2.01196 4.98392C2.00039 5.12559 2 5.31172 2 5.6V9.4C2 9.68828 2.00039 9.87441 2.01196 10.0161C2.02306 10.1519 2.0419 10.2023 2.0545 10.227C2.10243 10.3211 2.17892 10.3976 2.27301 10.4455C2.29773 10.4581 2.34809 10.4769 2.48392 10.488C2.62559 10.4996 2.81172 10.5 3.1 10.5H6.9C7.18828 10.5 7.37441 10.4996 7.51608 10.488C7.65191 10.4769 7.70227 10.4581 7.727 10.4455C7.82108 10.3976 7.89757 10.3211 7.9455 10.227C7.9581 10.2023 7.97694 10.1519 7.98804 10.0161C7.99961 9.87441 8 9.68828 8 9.4V5.6C8 5.31172 7.99961 5.12559 7.98804 4.98392C7.97694 4.84809 7.9581 4.79773 7.9455 4.77301C7.89757 4.67892 7.82108 4.60243 7.727 4.5545C7.70227 4.5419 7.65191 4.52306 7.51608 4.51196C7.37441 4.50039 7.18828 4.5 6.9 4.5H3.1ZM9 7.5V5.58074C9.00001 5.31716 9.00002 5.08978 8.98472 4.90249C8.96857 4.70481 8.93291 4.5082 8.83651 4.31902C8.6927 4.03677 8.46323 3.8073 8.18099 3.66349C7.9918 3.56709 7.79519 3.53144 7.59752 3.51529C7.41023 3.49998 7.18285 3.49999 6.91927 3.5L5 3.5V2.6C5 2.31172 5.00039 2.12559 5.01196 1.98392C5.02306 1.84809 5.0419 1.79773 5.0545 1.77301C5.10243 1.67892 5.17892 1.60243 5.27301 1.5545C5.29773 1.5419 5.34809 1.52306 5.48392 1.51196C5.62559 1.50039 5.81172 1.5 6.1 1.5H9.9C10.1883 1.5 10.3744 1.50039 10.5161 1.51196C10.6519 1.52306 10.7023 1.5419 10.727 1.5545C10.8211 1.60243 10.8976 1.67892 10.9455 1.77301C10.9581 1.79773 10.9769 1.84809 10.988 1.98392C10.9996 2.12559 11 2.31172 11 2.6V6.4C11 6.68828 10.9996 6.87441 10.988 7.01608C10.9769 7.15191 10.9581 7.20227 10.9455 7.227C10.8976 7.32108 10.8211 7.39757 10.727 7.4455C10.7023 7.4581 10.6519 7.47694 10.5161 7.48804C10.3744 7.49961 10.1883 7.5 9.9 7.5H9Z"
  //                     fill="#514C49"
  //                   />
  //                 </svg>
  //               </button>
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
}
