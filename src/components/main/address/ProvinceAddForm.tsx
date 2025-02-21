'use client';

import AddDataForm from '@/components/partial/data/AddDataForm';
import Input from '@/components/partial/form/Input';
import Label from '@/components/partial/form/Label';
import { handleCancelAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ProvinceMessage } from '@/messages/Address';
import { ProvinceService } from '@/services/Address';
import { ProvinceType } from '@/types/Address';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const INITIAL_STATE: ProvinceType = {
  name: ''
};

const ProvinceAddForm = () => {
  const router = useRouter();
  const [reqData, setReqData] = useState<ProvinceType>(INITIAL_STATE);

  const errorHandler = async(error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(ProvinceMessage.POST_ERROR);
      return;
    }

    if (error.response?.status !== 400) {
      await toastError(ProvinceMessage.POST_ERROR);
      return;
    }

    if (error.response.data.name[0] === ProvinceMessage.BACKEND_NAME_UNIQUE_ERROR) {
      await toastError(ProvinceMessage.NAME_UNIQUE_ERROR);
      return;
    } 
  };

  const postData = async (actionAfter: () => void) => {
    try {
      await (new ProvinceService()).post(reqData);
      await toastSuccess(ProvinceMessage.POST_SUCCESS);
      actionAfter();
    } catch (error) {
      await errorHandler(error);
    }
  };

  const saveOnClick = async () => {
    await postData(() => {
      setReqData(INITIAL_STATE);
    });
  };

  const saveAndExitOnClick = async () => {
    await postData(() => {
      router.push('/data/addresses/provinces');
    });
  };

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push('/data/addresses/provinces');
    });
  };

  return (
    <>
      <AddDataForm 
        formLabel='Thêm tỉnh mới'
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        cancelOnClick={cancelOnClick}
      >
        <div className='flex items-center'>
          <Label htmlFor='name' required>Tên tỉnh: </Label>
          <Input 
            id='name'
            name='name'
            type='text'
            value={reqData.name}
            onChange={(e) => handleInputChange(e, setReqData)}
            className='ml-2 w-[40%]'
            required
          />
        </div>
      </AddDataForm>
    </>
  );
};

export default ProvinceAddForm;
