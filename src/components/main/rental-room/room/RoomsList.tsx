'use client';

import React, { useEffect, useRef, useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { Table, DisplayedDataType } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { DataLine } from '@/components/partial/data/DataLine';
import { FilterModal } from '@/components/partial/data/FilterModal';
import { Label } from '@/components/partial/form/Label';
import { OptionType, Select } from '@/components/partial/form/Select';
import { getMyInfo } from '@/lib/client/authToken';
import { RentalRoomQueryType, RentalRoomType } from '@/types/RentalRoom.type';
import { INITIAL_RENTAL_ROOM_QUERY } from '@/initials/RentalRoom.initial';
import { rentalRoomService } from '@/services/RentalRoom.service';
import { RentalRoomMessage } from '@/messages/RentalRoom.message';
import { formatDate } from '@/lib/client/formatDate';
import { userService } from '@/services/UserAccount.service';
import { communeService, districtService, provinceService } from '@/services/Address.service';
import { mapOptions } from '@/lib/client/handleOptions';
import { CommuneType, DistrictType } from '@/types/Address.type';


export const RoomsList = () => {
  const router = useRouter();
  const originialDataRef = useRef<RentalRoomType[]>([]);
  const myIdRef = useRef<string | undefined>(undefined);
  const [data, setData] = useState<RentalRoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<RentalRoomQueryType>(INITIAL_RENTAL_ROOM_QUERY);  
  
  const [lessorOptions, setLessorOptions] = useState<OptionType[]>([]);
  const [managerOptions, setManagerOptions] = useState<OptionType[]>([]);
  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);
  const [communeOptions, setCommuneOptions] = useState<OptionType[]>([]);

  const originalDistrictDataRef = useRef<DistrictType[]>([]);
  const originalCommuneDataRef = useRef<CommuneType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [data, lessorData, managerData, provinceData, districtData, communeData] = await Promise.all([
          rentalRoomService.getMany(),
          userService.getMany({ role_include: ['LESSOR'] }),
          userService.getMany({ role_include: ['MANAGER'] }),
          provinceService.getMany(),
          districtService.getMany(),
          communeService.getMany(),
        ]);
        
        originialDataRef.current = data;
        myIdRef.current = (await getMyInfo()).id;
        setData(data);
      
        setLessorOptions(mapOptions(lessorData, ['first_name', 'last_name', 'phone_number'], 'id'));
        setManagerOptions(mapOptions(managerData, ['first_name', 'last_name', 'phone_number'], 'id'));
        setProvinceOptions(mapOptions(provinceData, ['name'], 'id'));
        setDistrictOptions(mapOptions(districtData, ['name'], 'id'));
        setCommuneOptions(mapOptions(communeData, ['name'], 'id'));

        originalDistrictDataRef.current = districtData;
        originalCommuneDataRef.current = communeData;

      } catch {
        await toastError(RentalRoomMessage.GET_MANY_ERROR);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateDataForTable = (): DisplayedDataType[] => {
    return data.map((item) => {
      return {
        id: `${item.id}`,
        basicInfo: (
          <div>
            <DataLine label='Tên phòng' value={item.name} />
            <DataLine label='Thời gian tạo' value={formatDate(item.created_at, 'dmy')} />
          </div>
        )
      };
    });
  };

  const detailsFunction = (id: string) => {
    router.push(`rooms/${id}`);
  };

  const approveFunction = async (id: string) => {
    try {
      await rentalRoomService.patch(id, { manager: myIdRef.current });
      await toastSuccess(RentalRoomMessage.APPROVE_SUCCESS);
      const data = originialDataRef.current.find(data => data.id === id);
      if (data && !data.manager) {  
        data.manager = myIdRef.current;
        setData([...originialDataRef.current]);  
      }

    } catch {
      await toastError(RentalRoomMessage.APPROVE_ERROR);
    }
  };

  const disabledFunctionForApprove = (id: string) => {
    return !!data.find(data => data.id === id)?.manager?.trim();
  };
  
  const filterOnClick = async () => {
    try {
      setLoading(true);
      if (query._province !== '' && query._district === '' && query.commune === '') {
        const districts = await districtService.getMany({ province: query._province });
        
        const communesArray = await Promise.all(districts.map(
          district => communeService.getMany({ district: district.id })
        ));
        const communes = communesArray.flat();
        
        const dataArray = await Promise.all(communes.map(
          commune => rentalRoomService.getMany({ commune: commune.id })
        ));
        setData(dataArray.flat());

      } else if (query._district !== '' && query.commune === '') {
        const communes = await communeService.getMany({ district: query._district });
        const dataArray = await Promise.all(communes.map(
          commune => rentalRoomService.getMany({ commune: commune.id })
        ));
        setData(dataArray.flat());

      } else {
        const data = await rentalRoomService.getMany(query);
        originialDataRef.current = data;
        setData(data);
      }
    } catch {
      await toastError(RentalRoomMessage.GET_MANY_ERROR);

    } finally {
      setLoading(false);
    }
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_RENTAL_ROOM_QUERY);
  };

  const handleLessorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, lessor: e.target.value });
  };

  const handleManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, manager: e.target.value });
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, _province: e.target.value });
    if (e.target.value === '') {
      setDistrictOptions(mapOptions(originalDistrictDataRef.current, ['name'], 'id'));
    } else {
      const districts = originalDistrictDataRef.current.filter(district => district.province === e.target.value);
      setDistrictOptions(mapOptions(districts, ['name'], 'id'));
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, _district: e.target.value });
    if (e.target.value === '') {
      setCommuneOptions(mapOptions(originalCommuneDataRef.current, ['name'], 'id'));
    } else {
      const communes = originalCommuneDataRef.current.filter(commune => commune.district === e.target.value);
      setCommuneOptions(mapOptions(communes, ['name'], 'id'));
    }
  };

  const handleCommuneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, commune: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'pending') {
      setQuery({ ...query, manager_is_null: true });
    
    } else if (value === 'approved') {
      setQuery({ ...query, manager_is_null: false });
    
    } else {
      setQuery({...query, manager_is_null: undefined });
    }
  };

  return (
    <div>
      <Title>Danh sách phòng trọ</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo tên phòng trọ'
            options={['name']}
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Tên phòng trọ (A-Z)', value: 'asc-name' },
              { label: 'Tên phòng trọ (Z-A)', value: 'desc-name' },
              { label: 'Mới nhất', value: 'desc-created_at' },
              { label: 'Cũ nhất', value: 'asc-created_at' },
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
                value={query._province}
                className='ml-[-200px] w-[300px]'
                options={provinceOptions}
                onChange={handleProvinceChange}
              />
            </div>    

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='district-query'>Huyện: </Label>
              <Select
                id='district-query'
                value={query._district}
                className='ml-[-200px] w-[300px]'
                options={districtOptions}
                onChange={handleDistrictChange}
              />
            </div> 

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='commune-query'>Xã: </Label>
              <Select
                id='commune-query'
                value={query.commune}
                className='ml-[-200px] w-[300px]'
                options={communeOptions}
                onChange={handleCommuneChange}
              />
            </div> 

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='lessor-query'>Chủ trọ: </Label>
              <Select
                id='lessor-query'
                value={query.lessor}
                className='ml-[-200px] w-[300px]'
                options={lessorOptions}
                onChange={handleLessorChange}
              />
            </div>   

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='manager-query'>Quản lý phê duyệt: </Label>
              <Select
                id='manager-query'
                value={query.manager}
                className='ml-[-200px] w-[300px]'
                options={managerOptions}
                onChange={handleManagerChange}
              />
            </div> 

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='status-query'>Trạng thái: </Label>
              <Select
                id='status-query'
                className='ml-[-200px] w-[300px]'
                options={[
                  { label: 'Đã được duyệt', value: 'approved' },
                  { label: 'Đang chờ duyệt', value: 'pending' }
                ]}
                onChange={handleStatusChange}
              />
            </div>  
          </FilterModal>
        </div>
      </div>

      <Table 
        data={generateDataForTable()}
        detailsFunction={detailsFunction}
        otherFunctions={[
          { 
            rowName: 'Duyệt',
            function: approveFunction,
            disabledFunction: disabledFunctionForApprove,
            buttonConfig: { mode: 'active' }
          },
        ]}
        loading={loading}
      />
    </div>
  );
};