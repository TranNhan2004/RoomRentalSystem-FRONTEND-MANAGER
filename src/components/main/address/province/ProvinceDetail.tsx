'use client';

import DataDetail from '@/components/partial/data/DataDetail';
import Loading from '@/components/partial/data/Loading';
import { INITIAL_PROVINCE } from '@/initials/Address.initial';
import { objectEquals } from '@/lib/client/objectEquals';
import { ProvinceService } from '@/services/Address.service';
import { ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type ProvinceDetailProps = {
  id: string;
}

const ProvinceDetail = (props: ProvinceDetailProps) => {
  const router = useRouter();
  const [data, setData] = useState<ProvinceType>(INITIAL_PROVINCE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (new ProvinceService()).get(props.id);
        setData(data);
      } catch {
        router.push('/404');
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
      <DataDetail 
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

export default ProvinceDetail;
