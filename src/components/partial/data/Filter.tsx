'use client';

import React, { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline'; 
import { ActionButton } from '../button/ActionButton';

type FilterOptionsGroupType = {
  category: string;
  options: {
    label: string;
    value: string;
  }[];
}

type FilterProps = {
  onFilter: (selectedFilters: Set<string>) => void; 
  filterOptionsGroups: FilterOptionsGroupType[]; 
}

const Filter = (props: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set()); 

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (category: string, optionLabel: string, optionValue: string) => {
    setSelectedFilters((prev) => {
      const newFilters = new Set(prev);
      const filterKey = `${category}-${optionLabel}-${optionValue}`;
      if (newFilters.has(filterKey)) {
        newFilters.delete(filterKey); 
      } else {
        newFilters.add(filterKey);  
      }

      return newFilters;
    });
  };

  const handleApplyFilter = () => {
    const appliedFilters = new Set(Array.from(selectedFilters).map((filter) => {
      const filterArray = filter.split('-');
      return `${filterArray[0]}-${filterArray[2]}`; 
    }));
    props.onFilter(appliedFilters); 
    setIsOpen(false); 
  };

  const handleExitModal = () => {
    setIsOpen(false);
  };

  const getOptionsInTSX = (group: FilterOptionsGroupType) => {
    return group.options.map((option) => {
      const filterKey = `${group.category}-${option.label}-${option.value}`;
      const isChecked = selectedFilters.has(filterKey);

      return (
        <div key={filterKey} className='inline-flex items-center mr-5'>
          <input
            id={filterKey}
            name={filterKey}
            type="checkbox"
            className="h-4 w-4 accent-blue-600"
            onChange={() => handleCheckboxChange(group.category, option.label, option.value)}
            checked={isChecked}
          />
          <label htmlFor={filterKey} className="ml-3">{option.label}</label>
        </div>
      );
    });
  };


  return (
    <div>
      <button
        onClick={toggleFilter}
        className="border border-gray-300 hover:bg-gray-100 p-2 rounded-lg 
                    flex items-center justify-center"
      >
        <FunnelIcon className="w-5 h-5 text-gray-600" />
      </button>

      {
        isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[60%] h-[80%]">
              <h2 className="text-xl font-semibold mb-6">Lọc kết quả</h2>

              <div className="space-y-6 max-h-[73%] overflow-y-auto">
                {
                  props.filterOptionsGroups.map((group) => (
                    <div key={group.category}>
                      <h3 className="font-medium text-base">{group.category}</h3>
                      <div className="border-t border-gray-300 mb-[2%] mr-[3%]"></div>
                      <div className="grid grid-cols-3 gap-x-8 gap-y-3 mt-2">
                        {getOptionsInTSX(group)}
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className='flex justify-end'>
                <div className="mt-6 mr-2">
                  <ActionButton mode='filter' onClick={handleApplyFilter}>Lọc</ActionButton>
                </div>

                <div className="mt-6">
                  <ActionButton mode='cancel' onClick={handleExitModal}>Thoát</ActionButton>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Filter;
