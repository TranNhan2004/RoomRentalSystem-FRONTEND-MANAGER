'use client';

import React, { useEffect, useRef, useState } from 'react';
import { districtService, provinceService } from '@/services/Address.service';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { DistrictQueryType, DistrictType } from '@/types/Address.type';
import { DisplayedDataType, Table } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { DistrictMessage } from '@/messages/Address.message';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { FilterModal } from '@/components/partial/data/FilterModal';
import { OptionType, Select } from '@/components/partial/form/Select';
import { Label } from '@/components/partial/form/Label';
import { INITIAL_DISTRICT_QUERY } from '@/initials/Address.initial';
import { mapOptions } from '@/lib/client/handleOptions';

export const DistrictsList = () => {
  const router = useRouter();
  const originalDataRef = useRef<DistrictType[]>([]);
  const [data, setData] = useState<DistrictType[]>([]);
  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);
  const [query, setQuery] = useState<DistrictQueryType>(INITIAL_DISTRICT_QUERY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [data, provinceData] = await Promise.all([
          districtService.getMany(),
          provinceService.getMany(),
        ]);

        setData(data);
        originalDataRef.current = data;
        setProvinceOptions(mapOptions(provinceData, ['name'], 'id'));
      
      } catch {
        await toastError(DistrictMessage.GET_MANY_ERROR);
      
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
      await toastError(DistrictMessage.DELETE_PROTECTED_ERROR);
      return;
    }

    await toastError(DistrictMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await districtService.delete(id);
        await toastSuccess(DistrictMessage.DELETE_SUCCESS);
        originalDataRef.current = originalDataRef.current.filter((item) => item.id !== id);
        setData(originalDataRef.current); 
      
      } catch (error) {
        await handleDeleteError(error);
      }
    });
  };

  const detailsFunction = (id: string) => {
    router.push(`districts/${id}`);
  };

  const editFunction = (id: string) => {
    router.push(`districts/${id}/edit`);
  };

  const addOnClick = () => {
    router.push('districts/add');
  };

  const filterOnClick = async () => {
    try {
      setLoading(true);
      const data = await districtService.getMany(query);
      originalDataRef.current = data;
      setData(data);
    
    } catch {
      await toastError(DistrictMessage.GET_MANY_ERROR);

    } finally {
      setLoading(false);
    }
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_DISTRICT_QUERY);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    setQuery({ ...query, province: e.target.value });
  };

  return (
    <div>
      <Title>Danh sách các huyện</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo tên huyện'
            options={['name']}
            originalData={originalDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Tên huyện (A-Z)', value: 'asc-name' },
              { label: 'Tên huyện (Z-A)', value: 'desc-name' },
            ]}
            originalData={originalDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[10px]'>
          <FilterModal 
            filterOnClick={filterOnClick}
            refreshOnClick={refreshOnClick}
          >
            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='province-query'>Tỉnh: </Label>
              <Select 
                id='province-query'
                value={query.province}
                className='ml-[-250px] w-[300px]'
                options={provinceOptions}
                onChange={handleProvinceChange}
              />
            </div>      
          </FilterModal>
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