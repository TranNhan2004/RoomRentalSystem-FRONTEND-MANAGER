'use client';

import React, { useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { DistrictMessage } from '@/messages/Address.message';
import { DistrictService } from '@/services/Address.service';
import { DistrictType } from '@/types/Address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { DistrictForm } from './DistrictForm';
import { INITIAL_DISTRICT } from '@/initials/Address.initial';
import { PublicMessage } from '@/messages/Public.message';

export const DistrictAdd = () => {
  const router = useRouter();
  const [reqData, setReqData] = useState<DistrictType>(INITIAL_DISTRICT);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(PublicMessage.UNKNOWN_ERROR);
      return;
    }

    if (error.response?.status !== 400) {
      await toastError(DistrictMessage.POST_ERROR);
      return;
    }

    if (error.response.data.province[0] === PublicMessage.BACKEND_REQUIRED_ERROR) {
      await toastError(DistrictMessage.REQUIRED_PROVINCE_ERROR);
      return;
    }
  };

  const postData = async (actionAfter: () => void) => {
    try {
      await (new DistrictService()).post(reqData);
      await toastSuccess(DistrictMessage.POST_SUCCESS);
      actionAfter();
    } catch (error) {
      await handlePostError(error);
    }
  };

  const saveOnClick = async () => {
    await postData(() => {
      setReqData(INITIAL_DISTRICT);
    });
  };

  const saveAndExitOnClick = async () => {
    await postData(() => {
      router.push('/addresses/districts');
    });
  };

  return (
    <>
      <DistrictForm 
        formLabel='Thêm huyện mới'
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        reqData={reqData}
        setReqData={setReqData}
      />
    </>
  );
};