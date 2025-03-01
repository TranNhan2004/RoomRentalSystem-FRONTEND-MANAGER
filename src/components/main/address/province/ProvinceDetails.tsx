'use client';

import React, { useEffect, useState } from 'react';
import { DataDetails } from '@/components/partial/data/DataDetails';
import { Loading } from '@/components/partial/data/Loading';
import { INITIAL_PROVINCE } from '@/initials/Address.initial';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { objectEquals } from '@/lib/client/objectEquals';
import { provinceService } from '@/services/Address.service';
import { ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';

type ProvinceDetailsProps = {
  id: string;
}

export const ProvinceDetails = (props: ProvinceDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<ProvinceType>(INITIAL_PROVINCE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await provinceService.get(props.id);
        setData(data);
      } catch {
        router.push(NOT_FOUND_URL);
      }
    };

    fetchData();
  }, [props.id, router]);

  const cancelOnClick = () => {
    router.push('/addresses/provinces');
  };

  if (objectEquals(data, INITIAL_PROVINCE)) {
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