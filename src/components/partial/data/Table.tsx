'use client';

import React, { useState } from 'react';
import { DeleteButton, EditButton, InfoButton } from '../button/FeatureButton';
import PaginationNav from './PaginationNav';

interface TableProps {
  data: Array<{ id: string; display: string }>;
  detailOnClick?: () => void;
  editOnClick?: () => void;
  deleteOnClick?: () => void;
}

const Table = (props: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(props.data.length / rowsPerPage);

  const getOnClick = (onClick: (() => void) | undefined, type: string) => {
    if (onClick) {
      return onClick;
    } 
    return () => console.log(`No ${type} function provided`);
  };

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log(`Page ${currentPage}`);
  };

  const displayedData = props.data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow overflow-x-auto mt-10'>
        <table className='min-w-full border border-gray-200'>
          <thead>
            <tr className='bg-gray-100 text-center'>
              <th className='p-2 border w-[6%]'>STT</th>
              <th className='p-2 border'>Dữ liệu hiển thị</th>
              <th className='p-2 border w-[8%]'>Chi tiết</th>
              <th className='p-2 border w-[8%]'>Sửa</th>
              <th className='p-2 border w-[8%]'>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {
              displayedData.map((item, index) => (
                <tr key={item.id} className='border'>
                  <td className='p-2 border'>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td className='p-2 border'>{item.display}</td>
                  <td className='p-2 border text-center'>
                    <div className='flex justify-center'>
                      <InfoButton onClick={getOnClick(props.detailOnClick, 'detail')} />
                    </div>
                  </td>
                  <td className='p-2 border text-center'>
                    <div className='flex justify-center'>
                      <EditButton onClick={getOnClick(props.editOnClick, 'edit')} />
                    </div>
                  </td>
                  <td className='p-2 border text-center'>
                    <div className='flex justify-center'>
                      <DeleteButton onClick={getOnClick(props.deleteOnClick, 'delete')} />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <PaginationNav 
        totalPages={totalPages} 
        currentPage={currentPage} 
        onPageChange={onPageChange}
        step={6}
      />
    </div>
  );
};

export default Table;
