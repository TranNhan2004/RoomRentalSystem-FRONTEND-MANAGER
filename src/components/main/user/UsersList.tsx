'use client';

import React, { useEffect, useRef, useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { Table, DisplayedDataType } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { UserQueryType, UserType } from '@/types/UserAccount.type';
import { UserMessage } from '@/messages/UserAccount.message';
import { DataLine } from '@/components/partial/data/DataLine';
import { INITIAL_USER_QUERY } from '@/initials/UserAccount.initial';
import { userService } from '@/services/UserAccount.service';
import { FilterModal } from '@/components/partial/data/FilterModal';
import { Label } from '@/components/partial/form/Label';
import { Select } from '@/components/partial/form/Select';
import { getMyInfo } from '@/lib/client/authToken';
import { displayRole } from '@/lib/client/display';


const ROLE_INCLUDE = ['ADMIN', 'MANAGER'];

export const UsersList = () => {
  const router = useRouter();
  const originialDataRef = useRef<UserType[]>([]);
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<UserQueryType>(INITIAL_USER_QUERY); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { id } = await getMyInfo();
        const data = await userService.getMany({ id_not: id, role_include: ROLE_INCLUDE });
        originialDataRef.current = data;
        setData(data);
      
      } catch {
        await toastError(UserMessage.GET_MANY_ERROR);
      
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
            <DataLine label='Họ tên' value={item.first_name + ' ' + item.last_name} />
            <DataLine label='Số điện thoại' value={item.phone_number} />
            <DataLine label='Số CCCD' value={item.citizen_number} />
            <DataLine label='Vai trò' value={displayRole(item.role)} />
            <DataLine label='Trạng thái tài khoản' value={item.is_active ? 'Đang kích hoạt' : 'Bị vô hiệu'} />
          </div>
        )
      };
    });
  };

  const detailsFunction = (id: string) => {
    router.push(`users/${id}`);
  };

  const deactiveFunction = async (id: string) => {
    try {
      await userService.patch(id, { is_active: false });
      await toastSuccess(UserMessage.DEACTIVE_SUCCESS);
      const data = originialDataRef.current.find(data => data.id === id);
      if (data && data.is_active !== false) {  
        data.is_active = false;
        setData([...originialDataRef.current]);  
      }

    } catch {
      await toastError(UserMessage.DEACTIVE_ERROR);
    }
  };

  const activeFunction = async (id: string) => {
    try {
      await userService.patch(id, { is_active: true });
      await toastSuccess(UserMessage.ACTIVE_SUCCESS);
      const data = originialDataRef.current.find(data => data.id === id);
      if (data && data.is_active !== true) {  
        data.is_active = true;
        setData([...originialDataRef.current]);  
      }

    } catch {
      await toastError(UserMessage.ACTIVE_ERROR);
    }
  };

  const disabledFunctionForDeactive = (id: string) => {
    return !data.find(data => data.id === id)?.is_active;
  };

  const disabledFunctionForActive = (id: string) => {
    return data.find(data => data.id === id)?.is_active;
  };

  const filterOnClick = async () => {
    try {
      setLoading(true);
      const role_include = (query.role_include && query.role_include[0] !== '') ? 
                            query.role_include : 
                            ROLE_INCLUDE;

      const data = await userService.getMany({ ...query, role_include: role_include });
      originialDataRef.current = data;
      setData(data);
    
    } catch {
      await toastError(UserMessage.GET_MANY_ERROR);

    } finally {
      setLoading(false);
    }
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_USER_QUERY);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    setQuery({ ...query, role_include: [e.target.value] });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({...query, is_active: e.target.value === 'true' });
  };
  
  const addOnClick = () => {
    router.push('users/add');
  };

  return (
    <div>
      <Title>Danh sách người dùng</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo họ tên hoặc sđt của người dùng'
            options={['first_name', 'last_name', 'phone_number']}
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Tên người dùng (A-Z)', value: 'asc-first_name' },
              { label: 'Tên người dùng (Z-A)', value: 'desc-first_name' },
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
              <Label htmlFor='role-query'>Vai trò: </Label>
              <Select
                id='role-query'
                value={query.role_include ? query.role_include[0] : ''}
                className='ml-[-250px] w-[300px]'
                options={[
                  { label: 'Người thuê', value: 'RENTER' },
                  { label: 'Chủ trọ', value: 'LESSOR' }
                ]}
                onChange={handleRoleChange}
              />
            </div>      

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='status-query'>Trạng thái: </Label>
              <Select
                id='status-query'
                value={query.is_active ? 'true' : 'false'}
                className='ml-[-250px] w-[300px]'
                options={[
                  { label: 'Đang kích hoạt', value: 'true' },
                  { label: 'Bị vô hiệu', value: 'false' }
                ]}
                onChange={handleStatusChange}
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
        detailsFunction={detailsFunction}
        otherFunctions={[
          { 
            rowName: 'Vô hiệu',
            function: deactiveFunction,
            disabledFunction: disabledFunctionForDeactive,
            buttonConfig: { mode: 'deactive' }
          },
          { 
            rowName: 'Kích hoạt',
            function: activeFunction,
            disabledFunction: disabledFunctionForActive,
            buttonConfig: { mode: 'active' }
          },
        ]}
        loading={loading}
      />
    </div>
  );
};