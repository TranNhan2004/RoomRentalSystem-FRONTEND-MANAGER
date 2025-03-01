'use client';

import React, { useEffect, useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { DistrictMessage } from '@/messages/Address.message';
import { districtService } from '@/services/Address.service';
import { DistrictType } from '@/types/Address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { DistrictForm } from './DistrictForm';
import { INITIAL_DISTRICT } from '@/initials/Address.initial';
import { GeneralMessage } from '@/messages/General.message';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { objectEquals } from '@/lib/client/objectEquals';
import { Loading } from '@/components/partial/data/Loading';

type DistrictEditProps = {
  id: string;
}

export const DistrictEdit = (props: DistrictEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<DistrictType>(INITIAL_DISTRICT);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await districtService.get(props.id);
        setReqData(data);
      } catch {
        router.push(NOT_FOUND_URL);
      }
    };

    fetchData();
  }, [router, props.id]);

  const handlePatchError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    await toastError(DistrictMessage.PATCH_ERROR);
  };

  const patchData = async (actionAfter?: () => void) => {
    try {
      const data = await districtService.patch(props.id, reqData);
      setReqData(data);
      await toastSuccess(DistrictMessage.PATCH_SUCCESS);
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
      router.push('/addresses/districts');
    });
  };

  if (objectEquals(reqData, INITIAL_DISTRICT)) {
    return <Loading />;
  }

  return (
    <>
      <DistrictForm 
        formLabel={`Chỉnh sửa thông tin của ${reqData.name}`}
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        reqData={reqData}
        setReqData={setReqData}
      />
    </>
  );
};