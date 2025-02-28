'use client';

import { DataDetail } from '@/components/partial/data/DataDetail';
import { Loading } from '@/components/partial/data/Loading';
import { INITIAL_COMMUNE, INITIAL_DISTRICT, INITIAL_PROVINCE } from '@/initials/Address.initial';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { objectEquals } from '@/lib/client/objectEquals';
import { CommuneService, DistrictService, ProvinceService } from '@/services/Address.service';
import { CommuneType, DistrictType, ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type CommuneDetailsProps = {
  id: string;
}

export const CommuneDetails = (props: CommuneDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<CommuneType>(INITIAL_COMMUNE);
  const [provinceData, setProvinceData] = useState<ProvinceType>(INITIAL_PROVINCE);
  const [districtData, setDistrictData] = useState<DistrictType>(INITIAL_DISTRICT);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (new CommuneService()).get(props.id);
        const districtData = await (new DistrictService()).get(data.district ?? '');
        const provinceData = await (new ProvinceService()).get(districtData.province ?? '');
        
        setData(data);
        setDistrictData(districtData);
        setProvinceData(provinceData);
      } catch {
        router.push(NOT_FOUND_URL);
      }
    };

    fetchData();
  }, [props.id, router]);

  const cancelOnClick = () => {
    router.push('/addresses/communes');
  };

  if (objectEquals(data, INITIAL_COMMUNE)) {
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