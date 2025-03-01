'use client';

import React, { useEffect, useState } from 'react';
import { DataDetail } from '@/components/partial/data/DataDetail';
import { Loading } from '@/components/partial/data/Loading';
import { INITIAL_DISTRICT, INITIAL_PROVINCE } from '@/initials/Address.initial';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { objectEquals } from '@/lib/client/objectEquals';
import { districtService, provinceService } from '@/services/Address.service';
import { DistrictType, ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';

type DistrictDetailsProps = {
  id: string;
}

export const DistrictDetails = (props: DistrictDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<DistrictType>(INITIAL_DISTRICT);
  const [provinceData, setProvinceData] = useState<ProvinceType>(INITIAL_PROVINCE);

  const cancelOnClick = () => {
    router.push('/addresses/districts');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await districtService.get(props.id);
        const provinceData = await provinceService.get(data.province ?? '');
        
        setData(data);
        setProvinceData(provinceData);
      } catch {
        router.push(NOT_FOUND_URL);
      }
    };

    fetchData();
  }, [props.id, router]);

  if (objectEquals(data, INITIAL_DISTRICT)) {
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
          },
          {
            label: 'Thuộc tỉnh',
            value: provinceData.name,
          },
        ]}
        cancelOnClick={cancelOnClick}
      />
    </>
  );
};