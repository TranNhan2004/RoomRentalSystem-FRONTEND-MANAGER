'use client';

import React, { useEffect, useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { CommuneMessage } from '@/messages/Address.message';
import { communeService } from '@/services/Address.service';
import { CommuneType } from '@/types/Address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { CommuneForm } from './CommuneForm';
import { INITIAL_COMMUNE } from '@/initials/Address.initial';
import { GeneralMessage } from '@/messages/General.message';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { Loading } from '@/components/partial/data/Loading';

type CommuneEditProps = {
  id: string;
}

export const CommuneEdit = (props: CommuneEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<CommuneType>(INITIAL_COMMUNE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await communeService.get(props.id);
        setReqData(data);
      
      } catch {
        router.push(NOT_FOUND_URL);

      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, props.id]);

  const handlePatchError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    await toastError(CommuneMessage.PATCH_ERROR);
  };

  const patchData = async (actionAfter?: () => void) => {
    try {
      const data = await communeService.patch(props.id, reqData);
      setReqData(data);
      await toastSuccess(CommuneMessage.PATCH_SUCCESS);
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
      router.push('/addresses/communes');
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <CommuneForm 
        formLabel={`Chỉnh sửa thông tin của ${reqData.name}`}
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        reqData={reqData}
        setReqData={setReqData}
      />
    </>
  );
};