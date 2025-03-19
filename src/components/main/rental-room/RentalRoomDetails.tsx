'use client';
                          
import React, { useEffect, useState } from 'react';
import { ChargesType, RoomImageType, RentalRoomType } from '@/types/RentalRoom.type';
import { INITIAL_CHARGES, INITIAL_RENTAL_ROOM } from '@/initials/RentalRoom.initial';
import { CommuneType, DistrictType, ProvinceType } from '@/types/Address.type';
import { INITIAL_COMMUNE, INITIAL_DISTRICT, INITIAL_PROVINCE } from '@/initials/Address.initial';
import { chargesService, roomImageService, rentalRoomService } from '@/services/RentalRoom.service';
import { communeService, districtService, provinceService } from '@/services/Address.service';
import { useRouter } from 'next/navigation';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { Loading } from '@/components/partial/data/Loading';
import { formatCurrency, formatDate } from '@/lib/client/format';
import { DataDetails } from '@/components/partial/data/DataDetails';
import { UserType } from '@/types/UserAccount.type';
import { INITIAL_USER } from '@/initials/UserAccount.initial';
import { userService } from '@/services/UserAccount.service';
import Image from 'next/image';
import { getImageSrc } from '@/lib/client/getImageSrc';

type RentalRoomDetailsProps = {
  id: string;
}
                          
export const RentalRoomDetails = (props: RentalRoomDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<RentalRoomType>(INITIAL_RENTAL_ROOM);
  const [provinceData, setProvinceData] = useState<ProvinceType>(INITIAL_PROVINCE);
  const [districtData, setDistrictData] = useState<DistrictType>(INITIAL_DISTRICT);
  const [communeData, setCommuneData] = useState<CommuneType>(INITIAL_COMMUNE);
  const [lessorData, setLessorData] = useState<UserType>(INITIAL_USER);
  const [managerData, setManagerData] = useState<UserType>(INITIAL_USER);
  const [imageData, setImageData] = useState<RoomImageType[]>([]);
  const [chargesData, setChargesData] = useState<ChargesType>(INITIAL_CHARGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await rentalRoomService.get(props.id);
        const communeData = await communeService.get(data.commune ?? '');
        const districtData = await districtService.get(communeData.district ?? '');
        const provinceData = await provinceService.get(districtData.province?? '');

        const [lessorData, managerData, imageData, chargesData] = await Promise.all([
          userService.get(data.lessor ?? ''),
          data.manager ? userService.get(data.manager) : INITIAL_USER,
          roomImageService.getMany({ rental_room: props.id }),
          chargesService.getMany({ rental_room: props.id, first_only: true }),
        ]);
      
        setData(data);
        setCommuneData(communeData);
        setDistrictData(districtData);
        setProvinceData(provinceData);
        setLessorData(lessorData);
        setManagerData(managerData);
        setImageData(imageData);
        setChargesData(chargesData[0]);
  
      } catch {
        router.push(NOT_FOUND_URL);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.id, router]);

  const cancelOnClick = () => {
    router.push('/rental-rooms');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <DataDetails
        title={`Chi tiết của ${data.name}`}
        data={[
          {
            label: 'ID',
            value: data.id,
          },
          {
            label: 'Tên phòng trọ',
            value: data.name,
          },
          {
            label: 'Thuộc tỉnh/thành phố',
            value: provinceData.name,
          },
          {
            label: 'Thuộc huyện/quận/thị xã',
            value: districtData.name,
          },
          {
            label: 'Thuộc xã/phường/thị trấn',
            value: communeData.name,
          },
          {
            label: 'Địa chỉ cụ thể',
            value: data.additional_address,
          },
          {
            label: 'Tổng số phòng',
            value: data.total_number
          },
          {
            label: 'Chủ trọ',
            value: lessorData.first_name + ' ' + lessorData.last_name + ' - ' + lessorData.phone_number
          },
          {
            label: 'Người phê duyệt',
            value: data.manager ? 
                managerData.first_name + ' ' + managerData.last_name + ' - ' + managerData.phone_number :
                'Chưa xác định'
          },
          {
            label: 'Ngày tạo',
            value: formatDate(data.created_at, 'dmy')
          },
          {
            label: 'Ngày cập nhật',
            value: formatDate(data.updated_at, 'dmy')
          }
        ]}
      />

      <div className='p-8 mt-10 ml-[-3%]'>
        <h2 className='text-left text-2xl mb-5 font-bold'>Danh sách các ảnh của phòng trọ</h2>
        <div className='ml-2 flex flex-wrap items-center gap-4'>
          {
            imageData && imageData.length > 0 ? imageData.map(item => (
              <div key={item.id} className='w-48 h-64'>
                <Image
                  src={item.image as string ?? getImageSrc('not-found.png')}
                  alt='Image'
                  width={200}
                  height={200} 
                  className='w-full h-full object-cover'
                  unoptimized
                />
              </div>
            )) : 'Không có dữ liệu'
          }
        </div>
      </div>

      <div className='mt-10'>
        <DataDetails
          title={`Thông tin chi tiết các mức giá `}
          data={chargesData ? [
            {
              label: 'Giá phòng',
              value: formatCurrency(chargesData.room_charge)
            },
            {
              label: 'Giá đặt cọc',
              value: formatCurrency(chargesData.deposit)
            },
            {
              label: 'Giá điện',
              value: formatCurrency(chargesData.electricity_charge)
            },
            {
              label: 'Giá nước',
              value: formatCurrency(chargesData.water_charge)
            },
            {
              label: 'Giá wifi',
              value: chargesData.wifi_charge === -1 ? 
                      'Không cung cấp wifi' : 
                      formatCurrency(chargesData.wifi_charge)
            },
            {
              label: 'Giá thu dọn rác',
              value: formatCurrency(chargesData.rubbish_charge)
            },
            {
              label: 'Ngày bắt đầu áp dụng',
              value: formatDate(chargesData.start_date, 'dmy')
            },
            {
              label: 'Ngày kết thúc áp dụng',
              value: chargesData.end_date ? formatDate(chargesData.end_date, 'dmy') : 'Chưa xác định'
            }
          ]: [
            { value: 'Không có dữ liệu' }
          ]}
          cancelOnClick={cancelOnClick}
        />
      </div>
    </>
  );
};