'use client';

import React, { useEffect, useRef, useState } from 'react';
import { provinceService } from '@/services/Address.service';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { ProvinceType } from '@/types/Address.type';
import { Table, DisplayedDataType } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { ProvinceMessage } from '@/messages/Address.message';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';

export const ProvincesList = () => {
  const router = useRouter();
  const originalDataRef = useRef<ProvinceType[]>([]);
  const [data, setData] = useState<ProvinceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await provinceService.getMany();
        originalDataRef.current = data;
        setData(data);
      
      } catch {
        await toastError(ProvinceMessage.GET_MANY_ERROR);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateDataForTable = (): DisplayedDataType[] => {
    return data.map((item) => ({
      id: `${item.id}`,
      basicInfo: `${item.name}`,
    }));
  };

  const handleDeleteError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (
      error.response?.status === 500 && 
      error.response.data?.includes(GeneralMessage.BACKEND_PROTECTED_ERROR_PREFIX)
    ) {
      await toastError(ProvinceMessage.DELETE_PROTECTED_ERROR);
      return;
    }
    
    await toastError(ProvinceMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await provinceService.delete(id);
        await toastSuccess(ProvinceMessage.DELETE_SUCCESS);
        originalDataRef.current = originalDataRef.current.filter((item) => item.id !== id);
        setData(originalDataRef.current); 
      
      } catch (error) {
        await handleDeleteError(error);
      }
    });
  };

  const detailsFunction = (id: string) => {
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
      <Title>Danh sách các tỉnh/thành phố</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo tên tỉnh/thành phố'
            options={['name']}
            originalData={originalDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Tên tỉnh/thành phố (A-Z)', value: 'asc-name' },
              { label: 'Tên tỉnh/thành phố (Z-A)', value: 'desc-name' },
            ]}
            originalData={originalDataRef.current}
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
        loading={loading}
        actions={[
          {
            rowName: 'Chi tiết',
            function: detailsFunction,
            buttonConfig: { mode: 'details' }
          },
          {
            rowName: 'Sửa',
            function: editFunction,
            buttonConfig: { mode: 'edit' }
          },
          {
            rowName: 'Xóa',
            function: deleteFunction,
            buttonConfig: { mode: 'delete' }
          }
        ]}
      />
    </div>
  );
};