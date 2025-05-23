'use client';

import React, { useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { ProvinceMessage } from '@/messages/Address.message';
import { provinceService } from '@/services/Address.service';
import { ProvinceType } from '@/types/Address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ProvinceForm } from './ProvinceForm';
import { INITIAL_PROVINCE } from '@/initials/Address.initial';
import { GeneralMessage } from '@/messages/General.message';

export const ProvinceAdd = () => {
  const router = useRouter();
  const [reqData, setReqData] = useState<ProvinceType>(INITIAL_PROVINCE);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (
      error.response?.status === 400 &&
      error.response.data?.name[0] === ProvinceMessage.BACKEND_NAME_UNIQUE_ERROR
    ) {
      await toastError(ProvinceMessage.NAME_UNIQUE_ERROR);
      return;
    }
    
    await toastError(ProvinceMessage.POST_ERROR);
  };

  const postData = async (actionAfter: () => void) => {
    try {
      await provinceService.post(reqData);
      await toastSuccess(ProvinceMessage.POST_SUCCESS);
      actionAfter();
    } catch (error) {
      await handlePostError(error);
    }
  };

  const saveOnClick = async () => {
    await postData(() => {
      setReqData(INITIAL_PROVINCE);
    });
  };

  const saveAndExitOnClick = async () => {
    await postData(() => {
      router.push('/addresses/provinces');
    });
  };

  return (
    <>
      <ProvinceForm 
        formLabel='Thêm tỉnh/thành phố mới'
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        reqData={reqData}
        setReqData={setReqData}
      />
    </>
  );
};