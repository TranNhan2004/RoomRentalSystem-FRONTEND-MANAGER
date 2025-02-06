'use client';

import React, { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline'; 
import FilterButton from '../button/FilterButton';
import CancelButton from '../button/CancelButton';

interface FilterOptionType {
  category: string;
  options: string[];
}

interface FilterProps {
  onFilter: (selectedFilters: string[]) => void; 
  filterOptions: FilterOptionType[]; 
}

const Filter = (props: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]); 

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const newFilters = [...prev];
      const filterKey = `${category}-${option}`;
      if (!newFilters.includes(filterKey)) {
        newFilters.push(filterKey); 
      }

      return newFilters;
    });
  };

  const handleApplyFilter = () => {
    const appliedFilters = selectedFilters.map((filter) => filter.split('-')[1]);
    props.onFilter(appliedFilters); 
    setIsOpen(false); 
  };

  const handleExitModal = () => {
    setIsOpen(false);
    setSelectedFilters([]);
  };

  const getOptionsInTSX = (filterOption: FilterOptionType) => {
    return filterOption.options.map((option, index) => {
      const key = `${option}-${index.toString()}`;

      return (
        <div key={key} className='inline-flex items-center mr-5'>
          <input
            id={key}
            name={key}
            type="checkbox"
            className="h-4 w-4 accent-blue-600"
            onChange={() => handleCheckboxChange(filterOption.category, option)}
          />
          <label htmlFor={key} className="ml-3">{option}</label>
        </div>
      );
    });
  };


  return (
    <div>
      <button
        onClick={toggleFilter}
        className="border border-gray-300 hover:bg-green-50 p-2 rounded-lg 
                    flex items-center justify-center mt-5 ml-[40px]"
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
                  props.filterOptions.map((filterOption) => (
                    <div key={filterOption.category}>
                      <h3 className="font-medium text-base">{filterOption.category}</h3>
                      <div className="border-t border-gray-300 mb-[2%] mr-[3%]"></div>
                      <div className="grid grid-cols-3 gap-x-8 gap-y-3 mt-2">
                        {getOptionsInTSX(filterOption)}
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className='flex justify-end'>
                <div className="mt-6 mr-2">
                  <FilterButton onClick={handleApplyFilter} />
                </div>

                <div className="mt-6">
                  <CancelButton onClick={handleExitModal} />
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
