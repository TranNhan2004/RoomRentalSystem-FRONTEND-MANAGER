'use client';

import React, { useEffect, useState } from 'react';
import { DataDetails } from '@/components/partial/data/DataDetails';
import { Loading } from '@/components/partial/data/Loading';
import { INITIAL_DISTRICT, INITIAL_PROVINCE } from '@/initials/Address.initial';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
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
  const [isLoading, setIsLoading] = useState(true);

  const cancelOnClick = () => {
    router.push('/addresses/districts');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await districtService.get(props.id);
        const provinceData = await provinceService.get(data.province ?? '');
        
        setData(data);
        setProvinceData(provinceData);
      
      } catch {
        router.push(NOT_FOUND_URL);
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.id, router]);

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