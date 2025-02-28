'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CommuneService, DistrictService, ProvinceService } from '@/services/Address.service';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { CommuneQueryType, CommuneType, DistrictType } from '@/types/Address.type';
import { DisplayedDataType, Table } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { CommuneMessage, DistrictMessage, ProvinceMessage } from '@/messages/Address.message';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { AxiosError } from 'axios';
import { PublicMessage } from '@/messages/Public.message';
import { FilterModal } from '@/components/partial/data/FilterModal';
import { OptionType, Select } from '@/components/partial/form/Select';
import { Label } from '@/components/partial/form/Label';
import { INITIAL_COMMUNE_QUERY } from '@/initials/Address.initial';
import { mapOptions } from '@/lib/client/handleOptions';

export const CommunesList = () => {
  const router = useRouter();
  const originialDataRef = useRef<CommuneType[]>([]);
  const [data, setData] = useState<CommuneType[]>([]);
  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);
  const originalDistrictDataRef = useRef<DistrictType[]>([]);
  const [query, setQuery] = useState<CommuneQueryType>(INITIAL_COMMUNE_QUERY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (new CommuneService()).getMany();
        originialDataRef.current = data;
        setData(data);
      } catch {
        await toastError(CommuneMessage.GET_MANY_ERROR);
      }
    };

    const fetchProvince = async () => {
      try {
        const data = await (new ProvinceService()).getMany();
        setProvinceOptions(mapOptions(data, 'name', 'id'));
      } catch {
        await toastError(ProvinceMessage.GET_MANY_ERROR);
      }
    };

    const fetchDistrict = async () => {
      try {
        const data = await (new DistrictService()).getMany();
        setDistrictOptions(mapOptions(data, 'name', 'id'));
        originalDistrictDataRef.current = data;
      } catch {
        await toastError(DistrictMessage.GET_MANY_ERROR);
      }
    };

    const fetchAllData = async () => {
      setLoading(true); 
      await Promise.all([fetchData(), fetchProvince(), fetchDistrict()]); 
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
      await toastError(CommuneMessage.DELETE_PROTECT_ERROR);
      return;
    }

    await toastError(CommuneMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await (new CommuneService()).delete(id);
        await toastSuccess(CommuneMessage.DELETE_SUCCESS);
        originialDataRef.current = originialDataRef.current.filter((item) => item.id !== id);
        setData(originialDataRef.current); 
      } catch (error) {
        await handleDeleteError(error);
      }
    });
  };

  const detailsFunction = (id: string) => {
    router.push(`communes/${id}`);
  };

  const editFunction = (id: string) => {
    router.push(`communes/${id}/edit`);
  };

  const addOnClick = () => {
    router.push('communes/add');
  };

  const filterOnClick = async () => {
    setLoading(true);

    try {
      const data = await (new CommuneService()).getMany(query);
      originialDataRef.current = data;
      setData(data);
    } catch {
      await toastError(CommuneMessage.GET_MANY_ERROR);
    }

    setLoading(false);
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_COMMUNE_QUERY);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <Title>Danh sách các huyện</Title>
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
                options={provinceOptions}
                onChange={handleProvinceChange}
              />
            </div>    

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='district-query'>Huyện: </Label>
              <Select 
                id='district-query'
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