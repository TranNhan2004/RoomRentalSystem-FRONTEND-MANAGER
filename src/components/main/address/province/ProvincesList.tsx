'use client';

import React, { useRef } from 'react';
import { ProvinceService } from '@/services/Address.service';
import { useEffect, useState } from 'react';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { ProvinceType } from '@/types/Address.type';
import { Table, DisplayDataType } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { ProvinceMessage } from '@/messages/Address.message';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { AxiosError } from 'axios';
import { PublicMessage } from '@/messages/Public.message';

export const ProvincesList = () => {
  const router = useRouter();
  const originialDataRef = useRef<ProvinceType[]>([]);
  const [data, setData] = useState<ProvinceType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (new ProvinceService()).getMany() ?? [];
        originialDataRef.current = data;
        setData(data);
      } catch {
        await toastError(ProvinceMessage.GET_MANY_ERROR);
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

  const handleDeleteError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(PublicMessage.UNKNOWN_ERROR);
      return;
    }

    if (error.response?.status !== 500) {
      await toastError(ProvinceMessage.DELETE_ERROR);
      return;
    }

    if (error.response.data.includes(PublicMessage.BACKEND_PROTECT_ERROR_PREFIX)) {
      await toastError(ProvinceMessage.DELETE_PROTECT_ERROR);
      return;
    }
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await (new ProvinceService()).delete(id);
        await toastSuccess(ProvinceMessage.DELETE_SUCCESS);
        originialDataRef.current = originialDataRef.current.filter((item) => item.id !== id);
        setData(originialDataRef.current); 
      } catch (error) {
        await handleDeleteError(error);
      }
    });
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
            options={['name']}
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Tên tỉnh (A-Z)', value: 'asc-name' },
              { label: 'Tên tỉnh (Z-A)', value: 'desc-name' },
            ]}
            data={data}
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