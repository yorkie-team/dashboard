import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as moment from 'moment';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectDocumentList, listDocumentsAsync, searchDocumentsAsync } from './documentsSlice';

export function DocumentList() {
  const dispatch = useAppDispatch();
  const documentKey = useLocation().pathname.replace(/^\/projects\/(.*)\/documents\//, '');
  const projectName = useParams().projectName!;
  const { type: queryType, documents, hasPrevious, hasNext, status } = useAppSelector(selectDocumentList);

  const [query, SetQuery] = useState('');
  const handleChangeQuery = useCallback((e) => {
    SetQuery(e.target.value);
  }, []);

  const navigate = useNavigate();
  const handleRowClicked = useCallback(
    (key: string) => {
      navigate(`./${key}`);
    },
    [navigate],
  );

  const handlePrevBtnClicked = useCallback(() => {
    if (queryType === 'all') {
      dispatch(
        listDocumentsAsync({
          projectName,
          isForward: true,
          previousID: documents[0].id,
        }),
      );
    } else if (queryType === 'search') {
      dispatch(
        searchDocumentsAsync({
          projectName,
          documentQuery: query,
          isForward: true,
          previousID: documents[0].id,
        }),
      );
    }
  }, [dispatch, projectName, documents, query, queryType]);

  const handleNextBtnClicked = useCallback(() => {
    const lastDocument = documents[documents.length - 1];
    if (queryType === 'all') {
      dispatch(
        listDocumentsAsync({
          projectName,
          isForward: false,
          previousID: lastDocument.id,
        }),
      );
    } else if (queryType === 'search') {
      dispatch(
        searchDocumentsAsync({
          projectName,
          documentQuery: query,
          isForward: false,
          previousID: lastDocument.id,
        }),
      );
    }
  }, [dispatch, projectName, documents, query, queryType]);

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      await dispatch(
        searchDocumentsAsync({
          projectName,
          documentQuery: query,
          isForward: false,
        }),
      );
    },
    [dispatch, projectName, query],
  );

  useEffect(() => {
    dispatch(listDocumentsAsync({ projectName, isForward: false }));
  }, [dispatch, projectName]);

  return (
    <div className="py-6">
      <div className="px-5">
        <h2 className="text-lg font-semibold">Documents</h2>
        <form className="relative mt-12 mb-8 w-48" onSubmit={handleSearch}>
          <button type="submit" className="absolute top-0 right-0 flex items-center justify-center w-8 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.3335 2.66659C4.75617 2.66659 2.66683 4.75592 2.66683 7.33325C2.66683 9.91058 4.75617 11.9999 7.3335 11.9999C8.59079 11.9999 9.73196 11.5027 10.5711 10.6942C10.5886 10.6714 10.6079 10.6494 10.6288 10.6285C10.6497 10.6076 10.6716 10.5884 10.6944 10.5708C11.5029 9.73172 12.0002 8.59055 12.0002 7.33325C12.0002 4.75592 9.91083 2.66659 7.3335 2.66659ZM12.0214 11.0784C12.8425 10.0519 13.3335 8.74993 13.3335 7.33325C13.3335 4.01954 10.6472 1.33325 7.3335 1.33325C4.01979 1.33325 1.3335 4.01954 1.3335 7.33325C1.3335 10.647 4.01979 13.3333 7.3335 13.3333C8.75017 13.3333 10.0522 12.8423 11.0786 12.0212L13.5288 14.4713C13.7891 14.7317 14.2112 14.7317 14.4716 14.4713C14.7319 14.211 14.7319 13.7889 14.4716 13.5285L12.0214 11.0784Z"
                fill="#514C49"
              />
            </svg>
          </button>
          <input
            type="text"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8"
            value={query}
            onChange={handleChangeQuery}
          />
        </form>
      </div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <div className="relative">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Key
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document, idx) => {
                const { key, createdAt, updatedAt } = document;
                return (
                  <tr
                    key={key}
                    className={`cursor-pointer ${documentKey === key ? 'bg-gray-100' : 'hover:bg-gray-200'}`}
                    onClick={() => handleRowClicked(key)}
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{key}</td>
                    <td className="px-6 py-4">{moment.unix(createdAt).format('YYYY-MM-DD')}</td>
                    <td className="px-6 py-4">{moment.unix(updatedAt).format('YYYY-MM-DD')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex items-center space-x-2 mt-6">
        <button
          className="relative inline-flex items-center justify-center text-center py-1.5 px-3 bg-gray-100 hover:bg-gray-200 disabled:!bg-gray-300 border border-gray-300 rounded-lg focus:outline-no
          ne focus-visible:ring-4 focus-visible:ring-gray-200 font-medium text-gray-900 text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
          type="button"
          onClick={handlePrevBtnClicked}
          disabled={!hasPrevious}
        >
          <span className="flex items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1.5 -ml-0.5 h-auto w-3.5 fill-current"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.46961 13.5303L1.93928 8.99994L6.46961 4.46961L7.53027 5.53027L3.86 8.99994L7.53027 12.4696L6.46961 13.5303Z"
              ></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M13 9.75L3.5 9.65L3.5 8.3501L13 8.25V9.75Z"></path>
            </svg>
            Previous
          </span>
        </button>
        <button
          className="relative inline-flex items-center justify-center text-center py-1.5 px-3 bg-gray-100 hover:bg-gray-200 disabled:!bg-gray-300 border border-gray-300 rounded-lg focus:outline-no
          ne focus-visible:ring-4 focus-visible:ring-gray-200 font-medium text-gray-900 text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
          type="button"
          onClick={handleNextBtnClicked}
          disabled={!hasNext}
        >
          <span className="flex items-center">
            Next
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1.5 -mr-0.5 h-auto w-3.5 fill-current"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.53039 4.46973L14.0607 9.00006L9.53039 13.5304L8.46973 12.4697L12.14 9.00006L8.46973 5.53039L9.53039 4.46973Z"
              ></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M3 8.25L12.5 8.35V9.65L3 9.75V8.25Z"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
