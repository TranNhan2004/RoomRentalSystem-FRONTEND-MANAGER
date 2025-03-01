'use client';

import React, { useEffect, useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { ProvinceMessage } from '@/messages/Address.message';
import { provinceService } from '@/services/Address.service';
import { ProvinceType } from '@/types/Address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ProvinceForm } from './ProvinceForm';
import { INITIAL_PROVINCE } from '@/initials/Address.initial';
import { objectEquals } from '@/lib/client/objectEquals';
import { Loading } from '@/components/partial/data/Loading';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { PublicMessage } from '@/messages/Public.message';

type ProvinceEditProps = {
  id: string;
}

export const ProvinceEdit = (props: ProvinceEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<ProvinceType>(INITIAL_PROVINCE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const province = await provinceService.get(props.id);
        setReqData(province);
      } catch {
        router.push(NOT_FOUND_URL);
      }
    };

    fetchData();
  }, [props.id, router]);

  const handlePatchError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(PublicMessage.UNKNOWN_ERROR);
      return;
    }
    
    if (
      error.response?.status === 400 &&
      error.response.data?.name[0] === ProvinceMessage.BACKEND_NAME_UNIQUE_ERROR
    ) {
      await toastError(ProvinceMessage.NAME_UNIQUE_ERROR);
      return;
    }
    
    await toastError(ProvinceMessage.PATCH_ERROR);
  };

  const patchData = async (actionAfter?: () => void) => {
    try {
      const data = await provinceService.patch(props.id, reqData);
      setReqData(data);
      
      await toastSuccess(ProvinceMessage.PATCH_SUCCESS);
      actionAfter?.();
    } catch (error) {
      await handlePatchError(error);
    }
  };

  const saveOnClick = async () => {
    await patchData();
  };

  const saveAndExitOnClick = async () => {
    await patchData(() => {
      router.push('/addresses/provinces');
    });
  };

  if (objectEquals(reqData, INITIAL_PROVINCE)) {
    return <Loading />;
  }

  return (
    <>
      <ProvinceForm 
        formLabel={`Chỉnh sửa thông tin của ${reqData.name}`}
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        reqData={reqData}
        setReqData={setReqData}
      />
    </>
  );
};