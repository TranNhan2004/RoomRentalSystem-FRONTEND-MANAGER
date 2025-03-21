'use client';

import React, { useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { DistrictMessage } from '@/messages/Address.message';
import { districtService } from '@/services/Address.service';
import { DistrictType } from '@/types/Address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { DistrictForm } from './DistrictForm';
import { INITIAL_DISTRICT } from '@/initials/Address.initial';
import { GeneralMessage } from '@/messages/General.message';

export const DistrictAdd = () => {
  const router = useRouter();
  const [reqData, setReqData] = useState<DistrictType>(INITIAL_DISTRICT);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    await toastError(DistrictMessage.POST_ERROR);
  };

  const postData = async (actionAfter: () => void) => {
    try {
      await districtService.post(reqData);
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
        formLabel='Thêm huyện/quận/thị xã mới'
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        reqData={reqData}
        setReqData={setReqData}
      />
    </>
  );
};