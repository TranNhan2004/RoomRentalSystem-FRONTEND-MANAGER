'use client';

import React, { useState } from 'react';
import { DeleteButton, EditButton, DetailButton } from '../button/FeatureButton';
import PaginationNav from './PaginationNav';

type TableProps = {
  data: Array<{ id: string; display: string }>;
  detailElement: (id: string) => void;
  editElement: (id: string) => void;
  deleteElement: (id: string) => void;
  otherDetails?: {
    rowName: string;
    detailElement: (id: string) => void;
  }[];
}

const Table = (props: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(props.data.length / rowsPerPage);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log(`Page ${currentPage}`);
  };

  const displayedData = props.data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const generateOtherDetailsRowName = () => {
    return props.otherDetails && props.otherDetails.map((otherDetail, index) => (
      <th key={index} className='p-2 border w-[6%]'>{otherDetail.rowName}</th>
    ));
  };

  const generateOtherDetailsElementFunction = (item: { id: string, display: string }) => {
    return props.otherDetails && props.otherDetails.map((otherDetail, index) => (
      <td key={index} className='p-2 border text-center'>
        <div className='flex justify-center'>
          <DetailButton onClick={() => otherDetail.detailElement(item.id)} />
        </div>
      </td>
    ));
  };

  const generateBody = () => {
    return displayedData.map((item, index) => (
      <tr key={item.id} className='border'>
        <td className='p-2 border'>{(currentPage - 1) * rowsPerPage + index + 1}</td>
        <td className='p-2 border'>{item.display}</td>
        <td className='p-2 border text-center'>
          <div className='flex justify-center'>
            <DetailButton onClick={() => props.detailElement(item.id)} />
          </div>
        </td>
        {generateOtherDetailsElementFunction(item)}
        <td className='p-2 border text-center'>
          <div className='flex justify-center'>
            <EditButton onClick={() => props.editElement(item.id)} />
          </div>
        </td>
        <td className='p-2 border text-center'>
          <div className='flex justify-center'>
            <DeleteButton onClick={() => props.deleteElement(item.id)} />
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow overflow-x-auto mt-8'>
        <table className='min-w-full border border-gray-200'>
          <thead>
            <tr className='bg-gray-100 text-center'>
              <th className='p-2 border w-[6%]'>STT</th>
              <th className='p-2 border'>Dữ liệu hiển thị</th>
              <th className='p-2 border w-[6%]'>Chi tiết</th>
              {generateOtherDetailsRowName()}
              <th className='p-2 border w-[6%]'>Sửa</th>
              <th className='p-2 border w-[6%]'>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {generateBody()}
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
