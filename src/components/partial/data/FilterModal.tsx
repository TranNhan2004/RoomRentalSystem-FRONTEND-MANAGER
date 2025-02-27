'use client';
                           
import React, { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline'; 
import { ActionButton } from '../button/ActionButton';

type FilterModalProps = {
  filterOnClick: () => void;
  refreshOnClick: () => void;
  children: React.ReactNode;
}
                           
export const FilterModal = (props: FilterModalProps) => {
  const [isOpen, setIsOpen] = useState(false); 

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleFilter = () => {
    setIsOpen(false);
    props.filterOnClick();
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 hover:bg-gray-100 p-2 rounded-lg 
                    flex items-center justify-center"
      >
        <FunnelIcon className="w-5 h-5 text-gray-600" />
      </button>

      {
        isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[60%] h-[80%] relative">
              <h2 className="text-xl font-semibold mb-8">Lọc dữ liệu</h2>

              <div className="space-y-6 max-h-[70%] overflow-y-auto pb-20">
                {props.children}
              </div>

              <div className='absolute bottom-6 right-6 flex gap-4'>
                <div className="mt-6">
                  <ActionButton mode='filter' onClick={handleFilter}>Lọc</ActionButton>
                </div>

                <div className="mt-6">
                  <ActionButton mode='refresh' onClick={props.refreshOnClick}>Làm mới</ActionButton>
                </div>

                <div className="mt-6">
                  <ActionButton mode='cancel' onClick={handleCancel}>Thoát</ActionButton>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};
