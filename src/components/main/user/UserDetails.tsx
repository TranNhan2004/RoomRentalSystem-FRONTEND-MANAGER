'use client';

import React, { useEffect, useState } from 'react';
import { DataDetails } from '@/components/partial/data/DataDetails';
import { Loading } from '@/components/partial/data/Loading';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { useRouter } from 'next/navigation';
import { UserType } from '@/types/UserAccount.type';
import { userService } from '@/services/UserAccount.service';
import { displayGender, displayRole } from '@/lib/client/display';
import { INITIAL_USER } from '@/initials/UserAccount.initial';
import { formatDate } from '@/lib/client/format';

type UserDetailsProps = {
  id: string;
}

export const UserDetails = (props: UserDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<UserType>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await userService.get(props.id);
        setData(data);

      } catch {
        router.push(NOT_FOUND_URL);
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.id, router]);

  const cancelOnClick = () => {
    router.push('/users');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DataDetails
        title={`Thông tin chi tiết của người dùng ${data.last_name + ' ' + data.first_name}`}
        data={[
          {
            label: 'ID',
            value: data.id,
          },
          {
            label: 'Họ',
            value: data.last_name,
          },
          {
            label: 'Tên',
            value: data.first_name,
          },
          {
            label: 'Email',
            value: data.email,
          },
          {
            label: 'Số điện thoại',
            value: data.phone_number,
          },
          {
            label: 'Số CCCD',
            value: data.citizen_number,
          },
          {
            label: 'Giới tính',
            value: displayGender(data.gender),
          },
          {
            label: 'Ngày sinh',
            value: formatDate(data.date_of_birth, 'dmy'),
          },
          {
            label: 'Trạng thái tài khoản',
            value: data.is_active ? 'Đang kích hoạt' : 'Bị vô hiệu',
          },
          {
            label: 'Vai trò',
            value: displayRole(data.role),
          },
        ]}
        cancelOnClick={cancelOnClick}
      />
    </>
  );
};