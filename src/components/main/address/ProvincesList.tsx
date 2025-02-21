'use client';

import React from 'react';
import { ProvinceService } from '@/services/Address';
import { useEffect, useState } from 'react';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { ProvinceType } from '@/types/Address';
import Title from '@/components/partial/data/Title';
import InputSearch from '@/components/partial/data/InputSearch';
import Sorting from '@/components/partial/data/Sorting';
import Table from '@/components/partial/data/Table';
import { AddButton } from '@/components/partial/button/FeatureButton';
import { useRouter } from 'next/navigation';
import { ProvinceMessage } from '@/messages/Address';

const ProvincesList = () => {
  const router = useRouter();
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

  const deleteElement = async (id: string) => {
    try {
      await handleDeleteAlert(async () => {
        setData(data.filter((item) => item.id !== id)); 
        await (new ProvinceService()).delete(id);
      });
      await toastSuccess(ProvinceMessage.DELETE_SUCCESS);
    } catch {
      await toastError(ProvinceMessage.DELETE_ERROR);
    }
  };

  const detailElement = (id: string) => {
    router.push(`provinces/${id}`);
  };

  const editElement = (id: string) => {
    router.push(`provinces/${id}/edit`);
  };

  const routeToDistrictsOfProvince = (id: string) => {
    router.push(`provinces/${id}/districts`);
  };

  const addOnClick = () => {
    router.push('provinces/new');
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

        <div className='ml-auto'>
          <AddButton onClick={addOnClick}>Thêm mới</AddButton>
        </div>
      </div>

    <Table 
      data={generateDataForTable()}
      deleteElement={deleteElement}
      detailElement={detailElement}
      editElement={editElement}
      otherDetails={[
        {
          rowName: 'DS huyện',
          detailElement: routeToDistrictsOfProvince 
        }
      ]}
    />
  </div>
  );
};

export default ProvincesList;