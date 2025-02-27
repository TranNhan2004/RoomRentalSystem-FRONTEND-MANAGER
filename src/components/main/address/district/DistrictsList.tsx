'use client';

import React, { useRef } from 'react';
import { DistrictService, ProvinceService } from '@/services/Address.service';
import { useEffect, useState } from 'react';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { DistrictQueryType, DistrictType, ProvinceType } from '@/types/Address.type';
import { DisplayedDataType, Table } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { DistrictMessage, ProvinceMessage } from '@/messages/Address.message';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { AxiosError } from 'axios';
import { PublicMessage } from '@/messages/Public.message';
import { FilterModal } from '@/components/partial/data/FilterModal';
import { Select } from '@/components/partial/form/Select';
import { Label } from '@/components/partial/form/Label';
import { INITIAL_DISTRICT_QUERY } from '@/initials/Address.initial';

export const DistrictsList = () => {
  const router = useRouter();
  const originialDataRef = useRef<DistrictType[]>([]);
  const [data, setData] = useState<DistrictType[]>([]);
  const [provinceDataForFilter, setProvinceDataForFilter] = useState<ProvinceType[]>([]);
  const [query, setQuery] = useState<DistrictQueryType>(INITIAL_DISTRICT_QUERY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (new DistrictService()).getMany() ?? [];
        originialDataRef.current = data;
        setData(data);
      } catch {
        await toastError(DistrictMessage.GET_MANY_ERROR);
      }
    };

    const fetchDataForFilter = async () => {
      try {
        const data = await (new ProvinceService()).getMany() ?? [];
        setProvinceDataForFilter(data);
      } catch {
        await toastError(ProvinceMessage.GET_MANY_ERROR);
      }
    };

    const fetchAllData = async () => {
      setLoading(true); 
      await Promise.all([fetchData(), fetchDataForFilter()]); 
      setLoading(false); 
    };
  
    fetchAllData();
  }, []);

  const generateDataForTable = (): DisplayedDataType[] => {
    return data.map((item) => ({
      id: `${item.id}`,
      basicInfo: `${item.name}`,
    }));
  };

  const handleDeleteError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(PublicMessage.UNKNOWN_ERROR);
      return;
    }

    if (error.response?.data?.includes(PublicMessage.BACKEND_PROTECT_ERROR_PREFIX)) {
      await toastError(DistrictMessage.DELETE_PROTECT_ERROR);
      return;
    }

    await toastError(DistrictMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await (new DistrictService()).delete(id);
        await toastSuccess(DistrictMessage.DELETE_SUCCESS);
        originialDataRef.current = originialDataRef.current.filter((item) => item.id !== id);
        setData(originialDataRef.current); 
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
    setLoading(true);

    try {
      const data = await (new DistrictService()).getMany(query) ?? [];
      originialDataRef.current = data;
      setData(data);
    } catch {
      await toastError(DistrictMessage.GET_MANY_ERROR);
    }

    setLoading(false);
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_DISTRICT_QUERY);
  };

  return (
    <div>
      <Title>Danh sách các huyện</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo tên huyện'
            options={['name']}
            originalData={originialDataRef.current}
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
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[10px]'>
          <FilterModal 
            filterOnClick={filterOnClick}
            refreshOnClick={refreshOnClick}
          >
            <div className='flex items-center mt-1 mb-1'>
              <Label htmlFor='province-query'>Tỉnh: </Label>
              <Select 
                id='province-query'
                value={query.province}
                className='ml-2 w-[300px]'
                options={provinceDataForFilter.map(province => {
                  return { 
                    label: province.name || '', 
                    value: province.id || '' 
                  };
                })}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { 
                  setQuery({ ...query, province: e.target.value });
                }}
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
        deleteFunction={deleteFunction}
        detailsFunction={detailsFunction}
        editFunction={editFunction}
        loading={loading}
      />
    </div>
  );
};