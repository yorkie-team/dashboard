import React, { useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDocuments, listDocumentsAsync } from './documentsSlice';

// DocumentList represents the list of documents in the application.
export function DocumentList() {
  const { documents, hasPrevious, hasNext, status } = useAppSelector(selectDocuments);
  const dispatch = useAppDispatch();
  const path = useLocation().pathname.replace(/^\/documents\//, '');

  const handlePrevBtnClicked = useCallback(() => {
    dispatch(listDocumentsAsync({ isForward: true, previousID: documents[0].id }));
  }, [dispatch, documents]);

  const handleNextBtnClicked = useCallback(() => {
    const lastDocument = documents[documents.length - 1];
    dispatch(listDocumentsAsync({ isForward: false, previousID: lastDocument.id }));
  }, [dispatch, documents]);

  useEffect(() => {
    dispatch(listDocumentsAsync({ isForward: false }));
  }, [dispatch]);

  return (
    <div className='py-6 w-80'>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <ul>
          {documents.map((document, idx) => {
            const {
              id,
              key: { collection, document: documentKey },
              snapshot,
            } = document;
            return (
              <li key={id}>
                <Link
                  to={`./${documentKey}`}
                  state={{ snapshot }}
                  className={`flex justify-between items-center p-2 w-full font-medium text-left text-gray-500 border border-gray-200 hover:bg-gray-100 break-all ${
                    idx === documents.length - 1 ? '' : 'border-b-0'
                  } ${path === documentKey && '!bg-gray-200'}`}
                >
                  {collection}${documentKey}
                  {snapshot}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <div className='flex items-center space-x-2 mt-6'>
        <button
          className='relative inline-flex items-center justify-center text-center py-1.5 px-3 bg-gray-100 hover:bg-gray-200 disabled:!bg-gray-300 border border-gray-300 rounded-lg focus:outline-no
          ne focus-visible:ring-4 focus-visible:ring-gray-200 font-medium text-gray-900 text-sm disabled:text-gray-400 disabled:cursor-not-allowed'
          type='button'
          onClick={handlePrevBtnClicked}
          disabled={!hasPrevious}
        >
          <span className='flex items-center'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='mr-1.5 -ml-0.5 h-auto w-3.5 fill-current'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6.46961 13.5303L1.93928 8.99994L6.46961 4.46961L7.53027 5.53027L3.86 8.99994L7.53027 12.4696L6.46961 13.5303Z'
              ></path>
              <path fillRule='evenodd' clipRule='evenodd' d='M13 9.75L3.5 9.65L3.5 8.3501L13 8.25V9.75Z'></path>
            </svg>
            Previous
          </span>
        </button>
        <button
          className='relative inline-flex items-center justify-center text-center py-1.5 px-3 bg-gray-100 hover:bg-gray-200 disabled:!bg-gray-300 border border-gray-300 rounded-lg focus:outline-no
          ne focus-visible:ring-4 focus-visible:ring-gray-200 font-medium text-gray-900 text-sm disabled:text-gray-400 disabled:cursor-not-allowed'
          type='button'
          onClick={handleNextBtnClicked}
          disabled={!hasNext}
        >
          <span className='flex items-center'>
            Next
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='ml-1.5 -mr-0.5 h-auto w-3.5 fill-current'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M9.53039 4.46973L14.0607 9.00006L9.53039 13.5304L8.46973 12.4697L12.14 9.00006L8.46973 5.53039L9.53039 4.46973Z'
              ></path>
              <path fillRule='evenodd' clipRule='evenodd' d='M3 8.25L12.5 8.35V9.65L3 9.75V8.25Z'></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
