'use client';

import React, { useState, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline'; 
import { ActionButton } from '../button/ActionButton';

type FilterModalProps = {
  filterOnClick: () => void;
  refreshOnClick: () => void;
  children: React.ReactNode;
}

export const FilterModal = (props: FilterModalProps) => {
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden'); 
    };
  }, [isOpen]);

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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[60%] h-[80%] relative flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Lọc dữ liệu</h2>

              <div className="flex-1 overflow-y-auto max-h-[72%] pb-20 space-y-4">
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
