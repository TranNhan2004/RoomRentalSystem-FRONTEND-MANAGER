'use client';

import React, { useEffect, useRef, useState } from 'react';
import { communeService, districtService, provinceService } from '@/services/Address.service';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { CommuneQueryType, CommuneType, DistrictQueryType, DistrictType } from '@/types/Address.type';
import { DisplayedDataType, Table } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { CommuneMessage } from '@/messages/Address.message';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { FilterModal } from '@/components/partial/data/FilterModal';
import { OptionType, Select } from '@/components/partial/form/Select';
import { Label } from '@/components/partial/form/Label';
import { INITIAL_COMMUNE_QUERY, INITIAL_DISTRICT_QUERY } from '@/initials/Address.initial';
import { mapOptions } from '@/lib/client/handleOptions';

export const CommunesList = () => {
  const router = useRouter();
  
  const [data, setData] = useState<CommuneType[]>([]);
  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);
  const [districtQuery, setDistrictQuery] = useState<DistrictQueryType>(INITIAL_DISTRICT_QUERY);
  const [query, setQuery] = useState<CommuneQueryType>(INITIAL_COMMUNE_QUERY);
  const [loading, setLoading] = useState(true);
  
  const originialDataRef = useRef<CommuneType[]>([]);
  const originalDistrictDataRef = useRef<DistrictType[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [data, provinceData, districtData] = await Promise.all([
          communeService.getMany(),
          provinceService.getMany(),
          districtService.getMany(),
        ]);
        
        setData(data);
        setProvinceOptions(mapOptions(provinceData, 'name', 'id'));
        setDistrictOptions(mapOptions(districtData, 'name', 'id'));

        originialDataRef.current = data;
        originalDistrictDataRef.current = districtData;
    
      } catch {
        await toastError(CommuneMessage.GET_MANY_ERROR);
    
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
      error.response?.status === 400 &&
      error.response.data?.includes(GeneralMessage.BACKEND_PROTECTED_ERROR_PREFIX)
    ) {
      await toastError(CommuneMessage.DELETE_PROTECTED_ERROR);
      return;
    }

    await toastError(CommuneMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await communeService.delete(id);
        await toastSuccess(CommuneMessage.DELETE_SUCCESS);
        originialDataRef.current = originialDataRef.current.filter((item) => item.id !== id);
        setData(originialDataRef.current); 
      
      } catch (error) {
        await handleDeleteError(error);
      }
    });
  };

  const detailsFunction = (id: string) => {
    router.push(`communes/${id}`, { scroll: true });
  };

  const editFunction = (id: string) => {
    router.push(`communes/${id}/edit`);
  };

  const addOnClick = () => {
    router.push('communes/add');
  };

  const filterOnClick = async () => {
    try {
      setLoading(true);
      if (query.district === '' && districtQuery.province !== '') {
        const districtData = await districtService.getMany(districtQuery);
        const dataArray = await Promise.all(districtData.map(district => communeService.getMany({
          district: district.id
        })));
        setData(dataArray.flat());
      
      } else {
        const data = await communeService.getMany(query);
        originialDataRef.current = data;
        setData(data);
      }
  
    } catch {
      await toastError(CommuneMessage.GET_MANY_ERROR);
    
    } finally {
      setLoading(false);
    }
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_COMMUNE_QUERY);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrictQuery({ ...query, province: e.target.value });

    if (e.target.value == '') {
      setDistrictOptions(mapOptions(originalDistrictDataRef.current, 'name', 'id'));
    } else {
      const districts = originalDistrictDataRef.current.filter(
        district => district.province === e.target.value
      );
      setDistrictOptions(mapOptions(districts, 'name', 'id'));
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, district: e.target.value });
  };

  return (
    <div>
      <Title>Danh sách các xã</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo tên xã'
            options={['name']}
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Tên xã (A-Z)', value: 'asc-name' },
              { label: 'Tên xã (Z-A)', value: 'desc-name' },
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
            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='province-query'>Tỉnh: </Label>
              <Select 
                id='province-query'
                className='ml-[-200px] w-[300px]'
                value={districtQuery.province}
                options={provinceOptions}
                onChange={handleProvinceChange}
              />
            </div>    

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='district-query'>Huyện: </Label>
              <Select 
                id='district-query'
                value={query.district}
                className='ml-[-200px] w-[300px]'
                options={districtOptions}
                onChange={handleDistrictChange}
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