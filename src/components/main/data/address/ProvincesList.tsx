'use client';

import React from 'react';
import { ProvinceService } from '@/services/Address';
import { useEffect, useState } from 'react';
import { handleDeleteAlert } from '@/lib/client/alert';
import { ProvinceType } from '@/types/Address';
import Title from '@/components/partial/data/Title';
import InputSearch from '@/components/partial/data/InputSearch';
import Sorting from '@/components/partial/data/Sorting';
import Filter from '@/components/partial/data/Filter';
import Table from '@/components/partial/data/Table';
import { AddButton } from '@/components/partial/button/FeatureButton';

const ProvincesList = () => {
  const [data, setData] = useState<ProvinceType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await (new ProvinceService()).getMany();
      setData(data);
    };

    fetchData();
  }, []);

  const generateDataForTable = () => {
    const dataForTable = [];
    for (const item of data) {
      dataForTable.push({
        id: `${item.id}`,
        display: `${item.name}`
      });
    }
    return dataForTable;
  };

  const onSearch = (searchQuery: string) => {
    console.log(`Search query: ${searchQuery}`);
  };

  const onSort = (optionValue: string) => {
    console.log(`Sort by: ${optionValue}`);
  };

  const onFilter = (selectedFilters: Set<string>) => {
    selectedFilters.forEach((filter) => {
      console.log(`Filter by ${filter}`);
    });
  };

  const deleteOnClick = async () => {
    await handleDeleteAlert('success', 'Xóa tỉnh thành công!');
  };

  const addOnClick = () => {
    console.log('Add new province');
  };

  return (
    <div>
      <Title>Danh sách các tỉnh</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo tên tỉnh'
            onSearch={onSearch}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Tên tỉnh (A-Z)', value: 'inc-name' },
              { label: 'Tên tỉnh (Z-A)', value: 'dec-name' },
            ]}
            onSort={onSort}
          />
        </div>
        
        <div className='ml-[20px]'>
          <Filter 
            onFilter={onFilter}
            filterOptionsGroups={[
              { 
                category: 'ABC', 
                options: [
                  { label: 'a', value: 'a' },
                  { label: 'b', value: 'b' },
                  { label: 'c', value: 'c' },
                ]
              },
              { 
                category: 'DEF', 
                options: [
                  { label: 'd', value: 'd' },
                  { label: 'e', value: 'e' },
                  { label: 'f', value: 'f' },
                ] 

              },
              { 
                category: 'GHI', 
                options: [
                  { label: 'g', value: 'g' },
                  { label: 'h', value: 'h' },
                  { label: 'i', value: 'i' },
                  { label: 'j', value: 'j' },
                  { label: 'k', value: 'k' },
                  { label: 'l', value: 'l' },
                  { label: 'm', value: 'm' },
                  { label: 'n', value: 'n' },
                  { label: 'o', value: 'o' },
                  { label: 'p', value: 'p' },
                  { label: 'q', value: 'q' },
                  { label: 'r', value: 'r' },
                  { label: 's', value: 's' },
                  { label: 't', value: 't' },
                ]  
              },
            ]}
          />
        </div>

        <div className='ml-auto'>
          <AddButton onClick={addOnClick}>Thêm mới</AddButton>
        </div>
      </div>

    <Table 
      data={generateDataForTable()}
      deleteOnClick={deleteOnClick}
    />
  </div>
  );
};

export default ProvincesList;