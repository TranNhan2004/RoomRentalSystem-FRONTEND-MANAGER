'use client';

import React, { useEffect, useState } from 'react';
import { DataDetails } from '@/components/partial/data/DataDetails';
import { Loading } from '@/components/partial/data/Loading';
import { INITIAL_PROVINCE } from '@/initials/Address.initial';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { provinceService } from '@/services/Address.service';
import { ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';

type UserDetailsProps = {
  id: string;
}

export const UserDetails = (props: UserDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<ProvinceType>(INITIAL_PROVINCE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await provinceService.get(props.id);
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
    router.push('/addresses/provinces');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DataDetails
        title={`Thông tin chi tiết của ${data.name}`}
        data={[
          {
            label: 'ID',
            value: data.id,
          },
          {
            label: 'Tên',
            value: data.name,
          }
        ]}
        cancelOnClick={cancelOnClick}
      />
    </>
  );
};