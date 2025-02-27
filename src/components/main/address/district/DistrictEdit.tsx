'use client';

import React, { useEffect, useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { DistrictMessage } from '@/messages/Address.message';
import { DistrictService } from '@/services/Address.service';
import { DistrictType } from '@/types/Address.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { DistrictForm } from './DistrictForm';
import { INITIAL_DISTRICT } from '@/initials/Address.initial';
import { PublicMessage } from '@/messages/Public.message';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { objectEquals } from '@/lib/client/objectEquals';
import { Loading } from '@/components/partial/data/Loading';

type DistrictEditProps = {
  id: string;
}

export const DistrictEdit = (props: DistrictEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<DistrictType>(INITIAL_DISTRICT);

  const handlePatchError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(PublicMessage.UNKNOWN_ERROR);
      return;
    }

    if (error.response?.data?.province[0] === PublicMessage.BACKEND_REQUIRED_ERROR) {
      await toastError(DistrictMessage.REQUIRED_PROVINCE_ERROR);
      return;
    }

    await toastError(DistrictMessage.PATCH_ERROR);
  };

  const patchData = async (actionAfter?: () => void) => {
    try {
      const data = await (new DistrictService()).patch(props.id, reqData);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (new DistrictService()).get(props.id);
        setReqData(data);
      } catch {
        router.push(NOT_FOUND_URL);
      }
    };

    fetchData();
  }, [router, props.id]);

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