'use client';

import React, { useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { CommuneMessage } from '@/messages/Address.message';
import { CommuneService } from '@/services/Address.service';
import { CommuneType } from '@/types/Address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { CommuneForm } from './CommuneForm';
import { INITIAL_COMMUNE } from '@/initials/Address.initial';
import { PublicMessage } from '@/messages/Public.message';

export const CommuneAdd = () => {
  const router = useRouter();
  const [reqData, setReqData] = useState<CommuneType>(INITIAL_COMMUNE);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(PublicMessage.UNKNOWN_ERROR);
      return;
    }

    if (error.response?.data?.district[0] === PublicMessage.BACKEND_REQUIRED_ERROR) {
      await toastError(CommuneMessage.REQUIRED_DISTRICT_ERROR);
      return;
    }

    await toastError(CommuneMessage.POST_ERROR);
  };

  const postData = async (actionAfter: () => void) => {
    try {
      await (new CommuneService()).post(reqData);
      await toastSuccess(CommuneMessage.POST_SUCCESS);
      actionAfter();
    } catch (error) {
      await handlePostError(error);
    }
  };

  const saveOnClick = async () => {
    await postData(() => {
      setReqData(INITIAL_COMMUNE);
    });
  };

  const saveAndExitOnClick = async () => {
    await postData(() => {
      router.push('/addresses/communes');
    });
  };

  return (
    <>
      <CommuneForm 
        formLabel='Thêm xã mới'
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        reqData={reqData}
        setReqData={setReqData}
      />
    </>
  );
};