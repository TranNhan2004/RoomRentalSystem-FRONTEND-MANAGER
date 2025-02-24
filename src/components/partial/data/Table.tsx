'use client';

import React, { useState } from 'react';
import PaginationNav from './PaginationNav';
import { ActionButton, ActionButtonProps } from '../button/ActionButton';

export type DisplayDataType = {
  id: string;
  basicInfo: string | number;
}

export type TableProps = {
  data: DisplayDataType[];
  detailFunction: (id: string) => void;
  editFunction: (id: string) => void;
  deleteFunction: (id: string) => void;
  otherFunctions?: {
    rowName: string;
    function: (id: string) => void;
    buttonMode: ActionButtonProps['mode'];
  }[];
}

export const Table = (props: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(props.data.length / rowsPerPage);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log(`Page ${currentPage}`);
  };

  const basicInfoData = props.data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const generateOtherRowNames = () => {
    return props.otherFunctions && props.otherFunctions.map((otherFunction, index) => (
      <th key={index} className='p-2 border w-[8%]'>{otherFunction.rowName}</th>
    ));
  };

  const generateOtherFunctions = (item: DisplayDataType) => {
    return props.otherFunctions && props.otherFunctions.map((otherFunction, index) => (
      <td key={index} className='p-2 border text-center'>
        <div className='flex justify-center'>
          <ActionButton mode={otherFunction.buttonMode} onClick={() => otherFunction.function(item.id)}/>
        </div>
      </td>
    ));
  };

  const generateBody = () => {
    return basicInfoData.map((item, index) => (
      <tr key={item.id} className='border'>
        <td className='p-2 border'>{(currentPage - 1) * rowsPerPage + index + 1}</td>
        <td className='p-2 border'>{item.basicInfo}</td>
        <td className='p-2 border text-center'>
          <div className='flex justify-center'>
            <ActionButton mode='detail' onClick={() => props.detailFunction(item.id)} />
          </div>
        </td>
        {generateOtherFunctions(item)}
        <td className='p-2 border text-center'>
          <div className='flex justify-center'>
            <ActionButton mode='edit' onClick={() => props.editFunction(item.id)} />
          </div>
        </td>
        <td className='p-2 border text-center'>
          <div className='flex justify-center'>
            <ActionButton mode='delete' onClick={() => props.deleteFunction(item.id)} />
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
              <th className='p-2 border'>Thông tin cơ bản</th>
              <th className='p-2 border w-[8%]'>Chi tiết</th>
              {generateOtherRowNames()}
              <th className='p-2 border w-[8%]'>Sửa</th>
              <th className='p-2 border w-[8%]'>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {
              props.data.length === 0 ? (
                <tr className='italic'>
                  <td colSpan={5 + (props.otherFunctions?.length ?? 0)} className='p-2 border text-center'>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : generateBody()  
            }
          </tbody>
        </table>
        <p className='italic mt-2 flex justify-end'>Tổng cộng {props.data.length} dòng</p>
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