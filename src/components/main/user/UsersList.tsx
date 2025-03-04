'use client';

import React, { useEffect, useRef, useState } from 'react';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { Table, DisplayedDataType } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { UserQueryType, UserType } from '@/types/UserAccount.type';
import { UserMessage } from '@/messages/UserAccount.message';
import { DataLine } from '@/components/partial/data/DataLine';
import { INITIAL_USER_QUERY } from '@/initials/UserAccount.initial';
import { userService } from '@/services/UserAccount.service';


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
        const data = await userService.getMany({ role_include: ['RENTER', 'LESSOR'] });
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
            <DataLine label='Trạng thái tài khoản' value={item.is_active ? 'Đang kích hoạt' : 'Bị vô hiệu'} />
          </div>
        )
      };
    });
  };

  // const handleDeleteError = async (error: unknown) => {
  //   if (!(error instanceof AxiosError)) {
  //     await toastError(GeneralMessage.UNKNOWN_ERROR);
  //     return;
  //   }

  //   if (
  //     error.response?.status === 500 && 
  //     error.response.data?.includes(GeneralMessage.BACKEND_PROTECTED_ERROR_PREFIX)
  //   ) {
  //     await toastError(UserMessage.DELETE_PROTECTED_ERROR);
  //     return;
  //   }
    
  //   await toastError(UserMessage.DELETE_ERROR);
  // };

  // const deleteFunction = async (id: string) => {
  //   await handleDeleteAlert(async () => {
  //     try {
  //       await userService.delete(id);
  //       await toastSuccess(UserMessage.DELETE_SUCCESS);
  //       originialDataRef.current = originialDataRef.current.filter((item) => item.id !== id);
  //       setData(originialDataRef.current); 
      
  //     } catch (error) {
  //       await handleDeleteError(error);
  //     }
  //   });
  // };

  const detailsFunction = (id: string) => {
    router.push(`provinces/${id}`);
  };

  const inactiveFunction = async (id: string) => {
    alert(id);
  };

  const activeFunction = async (id: string) => {
    alert(id);
  };

  const disabledFunctionForInactive = (id: string) => {
    return !data.find(data => data.id === id)?.is_active;
  };

  const disabledFunctionForActive = (id: string) => {
    return data.find(data => data.id === id)?.is_active;
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
              { label: 'Tên tỉnh (A-Z)', value: 'asc-name' },
              { label: 'Tên tỉnh (Z-A)', value: 'desc-name' },
            ]}
            originalData={originialDataRef.current}
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
        detailsFunction={detailsFunction}
        otherFunctions={[
          { 
            rowName: 'Vô hiệu',
            function: inactiveFunction,
            disabledFunction: disabledFunctionForInactive,
            buttonConfig: { mode: 'inactive' }
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