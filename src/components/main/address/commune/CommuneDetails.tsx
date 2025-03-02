'use client';

import React, { useEffect, useState } from 'react';
import { DataDetails } from '@/components/partial/data/DataDetails';
import { Loading } from '@/components/partial/data/Loading';
import { INITIAL_COMMUNE, INITIAL_DISTRICT, INITIAL_PROVINCE } from '@/initials/Address.initial';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { communeService, districtService, provinceService } from '@/services/Address.service';
import { CommuneType, DistrictType, ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';

type CommuneDetailsProps = {
  id: string;
}

export const CommuneDetails = (props: CommuneDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<CommuneType>(INITIAL_COMMUNE);
  const [provinceData, setProvinceData] = useState<ProvinceType>(INITIAL_PROVINCE);
  const [districtData, setDistrictData] = useState<DistrictType>(INITIAL_DISTRICT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await communeService.get(props.id);
        const districtData = await districtService.get(data.district ?? '');
        const provinceData = await provinceService.get(districtData.province ?? '');
        
        setData(data);
        setDistrictData(districtData);
        setProvinceData(provinceData);
      
      } catch {
        router.push(NOT_FOUND_URL);
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.id, router]);

  const cancelOnClick = () => {
    router.push('/addresses/communes');
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
          },
          {
            label: 'Thuộc tỉnh',
            value: provinceData.name,
          },
          {
            label: 'Thuộc huyện',
            value: districtData.name,
          },
        ]}
        cancelOnClick={cancelOnClick}
      />
    </>
  );
};