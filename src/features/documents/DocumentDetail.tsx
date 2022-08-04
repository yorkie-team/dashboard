import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactJson from 'react-json-view';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme, { getStringStyle } from './prismThemeLight';
import Slider from 'rc-slider';
import './rc-slider.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectDocumentDetail,
  getDocumentAsync,
  listDocumentHistoriesAsync,
  selectDocumentHistory,
  setHistory,
  resetHistory,
} from './documentsSlice';

export function DocumentDetail() {
  const { document, status } = useAppSelector(selectDocumentDetail);
  const { histories, status: historyStatus } = useAppSelector(selectDocumentHistory);
  const dispatch = useAppDispatch();
  const { projectName, documentKey } = useParams();
  const documentJSON = document ? JSON.parse(document.snapshot) : {};
  const documentJSONStr = JSON.stringify(documentJSON, null, '\t');
  const [viewType, SetViewType] = useState('code');

  const getHistories = useCallback(() => {
    dispatch(
      listDocumentHistoriesAsync({
        projectName: projectName!,
        documentKey: documentKey!,
      }),
    );
  }, [dispatch, projectName, documentKey]);
  const handleHistories = useCallback(
    (i) => {
      dispatch(setHistory(i));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(
      getDocumentAsync({
        projectName: projectName!,
        documentKey: documentKey!,
      }),
    );
    dispatch(resetHistory());
  }, [dispatch, projectName, documentKey]);

  return (
    <div
      className="w-full h-full px-6 py-6 overflow-y-auto"
      style={{ borderLeft: '1px #ddd solid', minWidth: '400px' }}
    >
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <>
          <Link
            to={'../'}
            className="float-right text-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm p-1 text-center inline-flex items-center dark:text-gray-500 dark:focus:ring-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <h2 className="text-lg font-semibold">{document?.key}</h2>
          <div className="flex w-full justify-between bg-stone-100 mt-6 p-2">
            <button
              type="button"
              className="flex justify-center items-center hover:bg-gray-200 text-xs text-gray-700 font-medium py-2 px-3"
              style={{ height: '32px', borderRadius: '4px', border: '1px #C2BDBA solid' }}
              onClick={getHistories}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.87935 1H8.12065C8.52313 0.999994 8.85532 0.999989 9.12591 1.0221C9.40696 1.04506 9.66531 1.09434 9.90798 1.21799C10.2843 1.40973 10.5903 1.7157 10.782 2.09202C10.9057 2.33469 10.9549 2.59304 10.9779 2.87409C11 3.14468 11 3.47686 11 3.87934V8.12066C11 8.52314 11 8.85532 10.9779 9.12591C10.9549 9.40696 10.9057 9.66531 10.782 9.90798C10.5903 10.2843 10.2843 10.5903 9.90798 10.782C9.66531 10.9057 9.40696 10.9549 9.12591 10.9779C8.85532 11 8.52314 11 8.12066 11H3.87934C3.47686 11 3.14468 11 2.87409 10.9779C2.59304 10.9549 2.33469 10.9057 2.09202 10.782C1.7157 10.5903 1.40973 10.2843 1.21799 9.90798C1.09434 9.66531 1.04506 9.40696 1.0221 9.12591C0.999989 8.85531 0.999994 8.52313 1 8.12065V3.87935C0.999994 3.47687 0.999989 3.14468 1.0221 2.87409C1.04506 2.59304 1.09434 2.33469 1.21799 2.09202C1.40973 1.7157 1.7157 1.40973 2.09202 1.21799C2.33469 1.09434 2.59304 1.04506 2.87409 1.0221C3.14468 0.999989 3.47687 0.999994 3.87935 1ZM2.95552 2.01878C2.73631 2.03669 2.62421 2.06915 2.54601 2.10899C2.35785 2.20487 2.20487 2.35785 2.10899 2.54601C2.06915 2.62421 2.03669 2.73631 2.01878 2.95552C2.00039 3.18056 2 3.47171 2 3.9V8.1C2 8.52829 2.00039 8.81944 2.01878 9.04448C2.03669 9.26369 2.06915 9.37579 2.10899 9.45399C2.20487 9.64215 2.35785 9.79513 2.54601 9.89101C2.62421 9.93085 2.73631 9.96331 2.95552 9.98122C3.18056 9.99961 3.47171 10 3.9 10H8.1C8.52829 10 8.81944 9.99961 9.04448 9.98122C9.26369 9.96331 9.37579 9.93085 9.45399 9.89101C9.64215 9.79513 9.79513 9.64215 9.89101 9.45399C9.93085 9.37579 9.96331 9.26369 9.98122 9.04448C9.99961 8.81944 10 8.52829 10 8.1V3.9C10 3.47171 9.99961 3.18056 9.98122 2.95552C9.96331 2.73631 9.93085 2.62421 9.89101 2.54601C9.79513 2.35785 9.64215 2.20487 9.45399 2.10899C9.37579 2.06915 9.26369 2.03669 9.04448 2.01878C8.81944 2.00039 8.52829 2 8.1 2H3.9C3.47171 2 3.18056 2.00039 2.95552 2.01878ZM5.62255 3.71652C5.62727 3.71956 5.63199 3.72259 5.63668 3.72561L7.99698 5.24294C8.00129 5.24571 8.00563 5.2485 8.00999 5.2513C8.08552 5.29982 8.16806 5.35285 8.23381 5.40413C8.30355 5.45852 8.41363 5.55446 8.47854 5.70809C8.5574 5.89471 8.5574 6.10529 8.47854 6.29191C8.41363 6.44554 8.30355 6.54148 8.23381 6.59587C8.16805 6.64715 8.08551 6.70018 8.00998 6.74871C8.00562 6.75151 8.00129 6.75429 7.99698 6.75706L5.63668 8.27439C5.63199 8.27741 5.62727 8.28044 5.62255 8.28348C5.53469 8.34 5.4423 8.39941 5.36094 8.44176C5.27909 8.48436 5.13056 8.55332 4.94657 8.54018C4.72957 8.52468 4.52999 8.41572 4.39961 8.24157C4.28907 8.09391 4.26675 7.93167 4.25832 7.83979C4.24995 7.74844 4.24997 7.6386 4.25 7.53413C4.25 7.52852 4.25 7.52292 4.25 7.51733V4.48267C4.25 4.47708 4.25 4.47148 4.25 4.46586C4.24997 4.3614 4.24995 4.25156 4.25832 4.16021C4.26675 4.06833 4.28907 3.90609 4.39961 3.75843C4.52999 3.58428 4.72957 3.47532 4.94657 3.45982C5.13056 3.44668 5.27909 3.51564 5.36094 3.55824C5.4423 3.60059 5.53469 3.66 5.62255 3.71652ZM5.25 4.66583V7.33417L7.32537 6L5.25 4.66583Z"
                  fill="#514C49"
                />
              </svg>
              <span className="ml-2">History</span>
            </button>
            <div className="flex">
              <button
                type="button"
                title="Switch to code highlighter"
                className={`flex justify-center items-center hover:bg-gray-200 ${
                  viewType === 'code' ? '!bg-blue-200' : ''
                }`}
                style={{ width: '32px', height: '32px', borderRadius: '4px' }}
                onClick={() => SetViewType('code')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.80482 3.52851C6.06517 3.78886 6.06517 4.21097 5.80482 4.47132L2.27622 7.99992L5.80482 11.5285C6.06517 11.7889 6.06517 12.211 5.80482 12.4713C5.54447 12.7317 5.12236 12.7317 4.86201 12.4713L0.86201 8.47132C0.601661 8.21097 0.601661 7.78886 0.86201 7.52851L4.86201 3.52851C5.12236 3.26816 5.54447 3.26816 5.80482 3.52851ZM10.1953 3.52851C10.4557 3.26816 10.8778 3.26816 11.1382 3.52851L15.1382 7.52851C15.3985 7.78886 15.3985 8.21097 15.1382 8.47132L11.1382 12.4713C10.8778 12.7317 10.4557 12.7317 10.1953 12.4713C9.93499 12.211 9.93499 11.7889 10.1953 11.5285L13.7239 7.99992L10.1953 4.47132C9.93499 4.21097 9.93499 3.78886 10.1953 3.52851Z"
                    fill={`${viewType === 'code' ? '#3C9AF1' : '#A6A19E'}`}
                  />
                </svg>
              </button>
              <button
                type="button"
                title="Switch to tree editor"
                className={`flex justify-center items-center hover:bg-gray-200 ${
                  viewType === 'tree' ? '!bg-blue-200' : ''
                }`}
                style={{ width: '32px', height: '32px', borderRadius: '4px' }}
                onClick={() => SetViewType('tree')}
              >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.49968 1.33325C2.86786 1.33325 3.16634 1.63173 3.16634 1.99992V4.66659L9.91702 4.66659C10.213 3.51643 11.2571 2.66659 12.4997 2.66659C13.9724 2.66659 15.1663 3.86049 15.1663 5.33325C15.1663 6.80601 13.9724 7.99992 12.4997 7.99992C11.2571 7.99992 10.213 7.15007 9.91702 5.99992L3.16634 5.99992V8.79992C3.16634 9.37097 3.16686 9.75917 3.19138 10.0592C3.21526 10.3515 3.25854 10.501 3.31167 10.6052C3.4395 10.8561 3.64347 11.0601 3.89435 11.1879C3.99862 11.2411 4.14809 11.2843 4.44037 11.3082C4.74043 11.3327 5.12862 11.3333 5.69968 11.3333H9.91702C10.213 10.1831 11.2571 9.33325 12.4997 9.33325C13.9724 9.33325 15.1663 10.5272 15.1663 11.9999C15.1663 13.4727 13.9724 14.6666 12.4997 14.6666C11.2571 14.6666 10.213 13.8167 9.91702 12.6666H5.67213C5.13549 12.6666 4.69258 12.6666 4.33179 12.6371C3.95706 12.6065 3.61259 12.5408 3.28903 12.3759C2.78727 12.1203 2.37932 11.7123 2.12366 11.2106C1.9588 10.887 1.89309 10.5425 1.86247 10.1678C1.83299 9.80701 1.833 9.3641 1.83301 8.82745L1.83301 1.99992C1.83301 1.63173 2.13149 1.33325 2.49968 1.33325ZM12.4997 3.99992C11.7633 3.99992 11.1663 4.59687 11.1663 5.33325C11.1663 6.06963 11.7633 6.66659 12.4997 6.66659C13.2361 6.66659 13.833 6.06963 13.833 5.33325C13.833 4.59687 13.2361 3.99992 12.4997 3.99992ZM12.4997 10.6666C11.7633 10.6666 11.1663 11.2635 11.1663 11.9999C11.1663 12.7363 11.7633 13.3333 12.4997 13.3333C13.2361 13.3333 13.833 12.7363 13.833 11.9999C13.833 11.2635 13.2361 10.6666 12.4997 10.6666Z"
                    fill={`${viewType === 'tree' ? '#3C9AF1' : '#A6A19E'}`}
                  />
                </svg>
              </button>
              <button
                type="button"
                title="Copy to clipboard"
                className="flex justify-center items-center hover:bg-gray-200 ml-4"
                style={{ width: '36px', height: '32px', borderRadius: '4px', border: '1px #C2BDBA solid' }}
                onClick={() => {
                  navigator.clipboard
                    .writeText(document?.snapshot || '')
                    .then(() => {
                      // TODO(chacha912): Replace `alert()` with alert component
                      alert('Copied!');
                    })
                    .catch(() => {
                      alert('Copy failed! Please try again.');
                    });
                }}
              >
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.08073 0.5H9.91927C10.1828 0.499991 10.4102 0.499984 10.5975 0.515286C10.7952 0.531436 10.9918 0.567094 11.181 0.663491C11.4632 0.807301 11.6927 1.03677 11.8365 1.31902C11.9329 1.5082 11.9686 1.70481 11.9847 1.90249C12 2.08977 12 2.31715 12 2.58072V6.41928C12 6.68285 12 6.91023 11.9847 7.09752C11.9686 7.29519 11.9329 7.4918 11.8365 7.68099C11.6927 7.96323 11.4632 8.1927 11.181 8.33651C10.9918 8.43291 10.7952 8.46857 10.5975 8.48472C10.4102 8.50002 10.1828 8.50001 9.91926 8.5H9V9.41926C9.00001 9.68284 9.00002 9.91023 8.98472 10.0975C8.96857 10.2952 8.93291 10.4918 8.83651 10.681C8.6927 10.9632 8.46323 11.1927 8.18099 11.3365C7.9918 11.4329 7.79519 11.4686 7.59752 11.4847C7.41023 11.5 7.18285 11.5 6.91928 11.5H3.08072C2.81715 11.5 2.58977 11.5 2.40249 11.4847C2.20481 11.4686 2.0082 11.4329 1.81902 11.3365C1.53677 11.1927 1.3073 10.9632 1.16349 10.681C1.06709 10.4918 1.03144 10.2952 1.01529 10.0975C0.999984 9.91023 0.999991 9.68285 1 9.41927V5.58073C0.999991 5.31715 0.999984 5.08977 1.01529 4.90249C1.03144 4.70481 1.06709 4.5082 1.16349 4.31902C1.3073 4.03677 1.53677 3.8073 1.81902 3.66349C2.0082 3.56709 2.20481 3.53144 2.40249 3.51529C2.58977 3.49998 2.81715 3.49999 3.08073 3.5L4 3.5L4 2.58073C3.99999 2.31715 3.99998 2.08977 4.01529 1.90249C4.03144 1.70481 4.06709 1.5082 4.16349 1.31902C4.3073 1.03677 4.53677 0.807301 4.81902 0.663491C5.0082 0.567094 5.20481 0.531436 5.40249 0.515286C5.58977 0.499984 5.81715 0.499991 6.08073 0.5ZM3.1 4.5C2.81172 4.5 2.62559 4.50039 2.48392 4.51196C2.34809 4.52306 2.29773 4.5419 2.27301 4.5545C2.17892 4.60243 2.10243 4.67892 2.0545 4.77301C2.0419 4.79773 2.02306 4.84809 2.01196 4.98392C2.00039 5.12559 2 5.31172 2 5.6V9.4C2 9.68828 2.00039 9.87441 2.01196 10.0161C2.02306 10.1519 2.0419 10.2023 2.0545 10.227C2.10243 10.3211 2.17892 10.3976 2.27301 10.4455C2.29773 10.4581 2.34809 10.4769 2.48392 10.488C2.62559 10.4996 2.81172 10.5 3.1 10.5H6.9C7.18828 10.5 7.37441 10.4996 7.51608 10.488C7.65191 10.4769 7.70227 10.4581 7.727 10.4455C7.82108 10.3976 7.89757 10.3211 7.9455 10.227C7.9581 10.2023 7.97694 10.1519 7.98804 10.0161C7.99961 9.87441 8 9.68828 8 9.4V5.6C8 5.31172 7.99961 5.12559 7.98804 4.98392C7.97694 4.84809 7.9581 4.79773 7.9455 4.77301C7.89757 4.67892 7.82108 4.60243 7.727 4.5545C7.70227 4.5419 7.65191 4.52306 7.51608 4.51196C7.37441 4.50039 7.18828 4.5 6.9 4.5H3.1ZM9 7.5V5.58074C9.00001 5.31716 9.00002 5.08978 8.98472 4.90249C8.96857 4.70481 8.93291 4.5082 8.83651 4.31902C8.6927 4.03677 8.46323 3.8073 8.18099 3.66349C7.9918 3.56709 7.79519 3.53144 7.59752 3.51529C7.41023 3.49998 7.18285 3.49999 6.91927 3.5L5 3.5V2.6C5 2.31172 5.00039 2.12559 5.01196 1.98392C5.02306 1.84809 5.0419 1.79773 5.0545 1.77301C5.10243 1.67892 5.17892 1.60243 5.27301 1.5545C5.29773 1.5419 5.34809 1.52306 5.48392 1.51196C5.62559 1.50039 5.81172 1.5 6.1 1.5H9.9C10.1883 1.5 10.3744 1.50039 10.5161 1.51196C10.6519 1.52306 10.7023 1.5419 10.727 1.5545C10.8211 1.60243 10.8976 1.67892 10.9455 1.77301C10.9581 1.79773 10.9769 1.84809 10.988 1.98392C10.9996 2.12559 11 2.31172 11 2.6V6.4C11 6.68828 10.9996 6.87441 10.988 7.01608C10.9769 7.15191 10.9581 7.20227 10.9455 7.227C10.8976 7.32108 10.8211 7.39757 10.727 7.4455C10.7023 7.4581 10.6519 7.47694 10.5161 7.48804C10.3744 7.49961 10.1883 7.5 9.9 7.5H9Z"
                    fill="#514C49"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex bg-stone-100 text-sm">
            {historyStatus === 'loading' && <span className="p-2">Loading...</span>}
            {historyStatus === 'failed' && <span className="p-2">Failed!</span>}
            {historyStatus === 'idle' && histories.length !== 0 && (
              <div className="w-full px-4 py-2">
                <Slider
                  dots
                  min={0}
                  max={histories.length - 1}
                  step={1}
                  defaultValue={histories.length - 1}
                  onChange={handleHistories}
                  included={false}
                  handleStyle={{ borderColor: '#3C9AF1' }}
                />
              </div>
            )}
          </div>
          <div
            className="bg-gray-50 py-4"
            style={{
              fontFamily: 'Menlo',
              fontSize: '0.9em',
              lineHeight: '1.5em',
            }}
          >
            {viewType === 'code' && (
              <Highlight {...defaultProps} theme={theme} code={documentJSONStr} language="json">
                {({ className, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`${className} table w-full flex-grow`}>
                    {tokens.map((line, i) => (
                      <div
                        key={i}
                        {...getLineProps({ line, key: i })}
                        style={{ display: 'table-row', minWidth: '100%' }}
                      >
                        <div
                          className="table-cell select-none text-right"
                          style={{
                            paddingRight: '1.5em',
                            paddingLeft: '1.5em',
                            color: '#767676',
                          }}
                        >
                          {i + 1}
                        </div>
                        <div className="table-cell w-full" style={{ paddingRight: '1.5em', paddingLeft: '0' }}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token, key })} {...getStringStyle(token.types)} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            )}
            {viewType === 'tree' && (
              <ReactJson
                src={documentJSON}
                displayObjectSize={false}
                displayDataTypes={false}
                // TODO(chacha912): Extract theme like `prisimThemeLight`
                theme={{
                  base00: 'transparent', // background
                  base01: 'black',
                  base02: 'rgb(240, 240, 240)', // indent-line
                  base03: 'black',
                  base04: 'black',
                  base05: 'black',
                  base06: 'black',
                  base07: 'rgb(140,140,140)', // property
                  base08: 'black',
                  base09: '#201f20', // string
                  base0A: '#218bff', // null
                  base0B: 'black',
                  base0C: 'black', // array key
                  base0D: 'rgb(200, 200, 200)', // expanded-icon
                  base0E: '#218bff', // boolean, collapsed-icon
                  base0F: '#2da44e', // number
                }}
                style={{
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  padding: '0 1em',
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
