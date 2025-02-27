'use client';

import React, { useEffect, useState } from 'react';
import { PaginationNav } from './PaginationNav';
import { ActionButton, ActionButtonProps } from '../button/ActionButton';
import { Loading } from './Loading';

export type DisplayedDataType = {
  id: string;
  basicInfo: string | number;
}

export type TableProps = {
  data: DisplayedDataType[];
  detailsFunction?: (id: string) => void;
  editFunction?: (id: string) => void;
  deleteFunction?: (id: string) => void;
  loading: boolean;
  otherFunctions?: {
    rowName: string;
    function: (id: string) => void;
    buttonConfig: Omit<ActionButtonProps, 'onClick'>;
  }[];
}

export const Table = (props: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(props.data.length / rowsPerPage);
  const basicInfoData = props.data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log(`Page ${currentPage}`);
  };

  const generateOtherRowNames = () => {
    return props.otherFunctions && props.otherFunctions.map((other, index) => (
      <th key={index} className='p-2 border w-[8%]'>{other.rowName}</th>
    ));
  };

  const generateOtherFunctions = (item: DisplayedDataType) => {
    return props.otherFunctions && props.otherFunctions.map((other, index) => (
      <td key={index} className='p-2 border text-center'>
        <div className='flex justify-center'>
          <ActionButton {...other.buttonConfig } onClick={() => other.function(item.id)} />
        </div>
      </td>
    ));
  };

  const generateBody = () => {
    let colSpan = 2;
    if (props.detailsFunction) colSpan += 1;
    if (props.editFunction) colSpan += 1;
    if (props.deleteFunction) colSpan += 1;
    if (props.otherFunctions) colSpan += props.otherFunctions.length;

    if (loading) {
      return (
        <tr className='italic'>
          <td colSpan={colSpan} className='p-2 border text-center'>
              <div className='flex items-center justify-center'>
                <Loading textSize={12} />
              </div>
          </td>
        </tr>
      );
    }

    if (props.data.length === 0) {
      return (
        <tr className='italic'>
          <td colSpan={colSpan} className='p-2 border text-center'>
            Không có dữ liệu
          </td>
        </tr>
      );
    }

    return basicInfoData.map((item, index) => (
      <tr key={item.id} className='border'>
        <td className='p-2 border'>{(currentPage - 1) * rowsPerPage + index + 1}</td>
        <td className='p-2 border'>{item.basicInfo}</td>
        {
          props.detailsFunction && (
            <td className='p-2 border text-center'>
              <div className='flex justify-center'>
                <ActionButton mode='details' onClick={() => props.detailsFunction?.(item.id)} />
              </div>
            </td>
          )
        }
        {generateOtherFunctions(item)}
        {
          props.editFunction && (
            <td className='p-2 border text-center'>
              <div className='flex justify-center'>
                <ActionButton mode='edit' onClick={() => props.editFunction?.(item.id)} />
              </div>
            </td>
          )
        }
        {
          props.deleteFunction && (
            <td className='p-2 border text-center'>
              <div className='flex justify-center'>
                <ActionButton mode='delete' onClick={() => props.deleteFunction?.(item.id)} />
              </div>
            </td>
          )
        }
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
              {props.detailsFunction && <th className='p-2 border w-[8%]'>Chi tiết</th>}
              {generateOtherRowNames()}
              {props.editFunction && <th className='p-2 border w-[8%]'>Sửa</th>}
              {props.detailsFunction && <th className='p-2 border w-[8%]'>Xóa</th>}
            </tr>
          </thead>
          <tbody>
            {generateBody()}
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