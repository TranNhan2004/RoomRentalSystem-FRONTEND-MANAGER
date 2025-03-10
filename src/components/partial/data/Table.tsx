'use client';

import React, { useEffect, useState } from 'react';
import { PaginationNav } from './PaginationNav';
import { ActionButton, ActionButtonProps } from '../button/ActionButton';
import { Loading } from './Loading';

export type DisplayedDataType = {
  id: string;
  basicInfo: React.ReactNode;
}

export type TableProps = {
  data: DisplayedDataType[];
  loading: boolean;
  actions: {
    rowName: string;
    function: (id: string) => void;
    buttonConfig: Omit<ActionButtonProps, 'onClick'>;
    disabledFunction?: (id: string) => boolean | undefined;
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

  const generateActionRowNames = () => {
    return props.actions.map((action, index) => (
      <th key={index} className='p-2 border w-[8%]'>{action.rowName}</th>
    ));
  };

  const generateActionButtons = (item: DisplayedDataType) => {
    return props.actions.map((action, index) => (
      <td key={index} className='p-2 border text-center'>
        <div className='flex justify-center'>
          <ActionButton 
            { ...action.buttonConfig } 
            onClick={() => action.function(item.id)} 
            disabled={action.disabledFunction?.(item.id)}
          />
        </div>
      </td>
    ));
  };

  const generateBody = () => {
    const colSpan = props.actions.length + 2;
    
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
        {generateActionButtons(item)}
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
              {generateActionRowNames()}
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