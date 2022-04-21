import React from 'react';
import { DocumentList } from '../features/documents/DocumentList';
import { Button } from 'components';

export function Documents() {
  return (
    <div className='px-12 py-6'>
      <h2 className='text-lg font-semibold'>Documents</h2>
      <DocumentList />
      <div className='flex items-center space-x-2'>
        <Button disabled onClickHandler={() => console.log('prev')}>
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
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M13 9.75L3.5 9.65L3.5 8.3501L13 8.25V9.75Z'
            ></path>
          </svg>
          Previous
        </Button>
        <Button onClickHandler={() => console.log('next')}>
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
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3 8.25L12.5 8.35V9.65L3 9.75V8.25Z'
            ></path>
          </svg>
        </Button>
      </div>
    </div>
  );
}
