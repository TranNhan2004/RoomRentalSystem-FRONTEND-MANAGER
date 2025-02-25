'use client';

import React, { useEffect, useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { ProvinceMessage } from '@/messages/Address.message';
import { ProvinceService } from '@/services/Address.service';
import { ProvinceType } from '@/types/Address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ProvinceForm } from './ProvinceForm';
import { INITIAL_PROVINCE } from '@/initials/Address.initial';
import { objectEquals } from '@/lib/client/objectEquals';
import { Loading } from '@/components/partial/data/Loading';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';

type ProvinceEditProps = {
  id: string;
}

export const ProvinceEdit = (props: ProvinceEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<ProvinceType>(INITIAL_PROVINCE);

  const handlePatchError = async(error: unknown) => {
    if (!(error instanceof AxiosError) || error.response?.status !== 400) {
      await toastError(ProvinceMessage.PATCH_ERROR);
      return;
    }

    if (error.response.data.name[0] === ProvinceMessage.BACKEND_NAME_UNIQUE_ERROR) {
      await toastError(ProvinceMessage.NAME_UNIQUE_ERROR);
      return;
    } 
  };

  const patchData = async (actionAfter?: () => void) => {
    try {
      await (new ProvinceService()).patch(props.id, reqData);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const province = await (new ProvinceService()).get(props.id);
        setReqData(province);
      } catch {
        router.push(NOT_FOUND_URL);
      }
    };

    fetchData();
  }, [props.id, router]);

  if (objectEquals(reqData, INITIAL_PROVINCE)) {
    return <Loading />;
  }

  return (
    <>
      <ProvinceForm 
        formLabel='Chỉnh sửa thông tin tỉnh'
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        reqData={reqData}
        setReqData={setReqData}
      />
    </>
  );
};