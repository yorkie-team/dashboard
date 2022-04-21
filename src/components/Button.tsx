import React, { ReactNode } from 'react';

export function Button({
  children,
  onClickHandler,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className='relative inline-flex items-center justify-center text-center py-1.5 px-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-200 font-medium text-gray-900 text-sm'
      type='button'
      onClick={onClickHandler}
      {...restProps}
    >
      <span className='flex items-center'>{children}</span>
    </button>
  );
}

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}
