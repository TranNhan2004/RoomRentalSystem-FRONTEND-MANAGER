'use client';

import React from 'react';
import { FirstButton, LastButton, NextButton, PrevButton } from '../button/ChangePageButton';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  step: number;
  onPageChange: (page: number) => void;
}

export const PaginationNav = (props: PaginationProps) => {

  const getPaginationRange = () => {
    const range: number[] = [];
    const half = Math.ceil(props.step / 2);
    let start = 0, end = 0;

    if (props.currentPage <= half) {
      start = 1;
      end = Math.min(props.step, props.totalPages);
    } else {
      start = Math.max(1, props.currentPage - half + 1);
      end = Math.min(start + props.step - 1, props.totalPages);
    }

    if (end == props.totalPages) {
      start = Math.max(1, end - props.step + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= props.totalPages) {
      props.onPageChange(page);
    }
  };

  return (
    <div className='flex items-center justify-center space-x-3 p-6'>
      <FirstButton
        onClick={() => handlePageChange(1)}
        disabled={props.currentPage === 1}
      />

      <PrevButton
        onClick={() => handlePageChange(props.currentPage - 1)}
        disabled={props.currentPage === 1}
      />

      {
        getPaginationRange().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-100 ease-in-out ${
              page === props.currentPage
                ? 'bg-blue-200'
                : 'bg-white text-gray-600 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))
        
      }

      <NextButton
        onClick={() => handlePageChange(props.currentPage + 1)}
        disabled={props.currentPage === props.totalPages}
      />

      <LastButton
        onClick={() => handlePageChange(props.totalPages)}
        disabled={props.currentPage === props.totalPages}
      />
    </div>
  );
};