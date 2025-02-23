'use client';

import React from 'react';
import { ProvinceService } from '@/services/Address.service';
import { useEffect, useState } from 'react';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { ProvinceType } from '@/types/Address.type';
import Title from '@/components/partial/data/Title';
import InputSearch from '@/components/partial/data/InputSearch';
import Sorting from '@/components/partial/data/Sorting';
import { Table, DisplayDataType } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { ProvinceMessage } from '@/messages/Address.message';
import { ActionButton } from '@/components/partial/button/ActionButton';

const ProvincesList = () => {
  const router = useRouter();
  const [data, setData] = useState<ProvinceType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (new ProvinceService()).getMany();
        setData(data);
      } catch {
        toastError(ProvinceMessage.GET_MANY_ERROR);
      }
    };

    fetchData();
  }, []);

  const generateDataForTable = () => {
    const dataForTable: DisplayDataType[] = [];
    for (const item of data) {
      dataForTable.push({
        id: `${item.id}`,
        basicInfo: `${item.name}`
      });
    }
    return dataForTable;
  };

  const onSearch = (searchQuery: string) => {
    console.log(`Search query: ${searchQuery}`);
  };

  const deleteFunction = async (id: string) => {
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

  const detailFunction = (id: string) => {
    router.push(`provinces/${id}`);
  };

  const editFunction = (id: string) => {
    router.push(`provinces/${id}/edit`);
  };

  const addOnClick = () => {
    router.push('provinces/add');
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
              { label: 'Tên tỉnh (A-Z)', value: 'asc-name' },
              { label: 'Tên tỉnh (Z-A)', value: 'desc-name' },
            ]}
            setData={setData}
          />
        </div>

        <div className='ml-auto'>
          <ActionButton mode='add' onClick={addOnClick}>Thêm mới</ActionButton>
        </div>
      </div>

    <Table 
      data={generateDataForTable()}
      deleteFunction={deleteFunction}
      detailFunction={detailFunction}
      editFunction={editFunction}
    />
  </div>
  );
};

export default ProvincesList;