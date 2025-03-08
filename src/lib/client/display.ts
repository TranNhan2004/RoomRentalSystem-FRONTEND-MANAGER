import { UserType } from "@/types/UserAccount.type";

export const displayRole = (role: UserType['role']) => {
  switch(role) {
    case 'MANAGER':
      return 'Quản lý';
    case 'LESSOR':
      return 'Chủ trọ';
    case 'RENTER':
      return 'Người thuê';
    default:
      return 'GIÁ TRỊ KHÔNG HỢP LỆ';
  } 
};

export const displayGender = (gender: UserType['gender']) => {
  switch(gender) {
    case 'MALE':
      return 'Nam';
    case 'FEMALE':
      return 'Nữ';
    case 'UNKNOWN':
      return 'Không rõ';
    default:
      return 'GIÁ TRỊ KHÔNG HỢP LỆ';
  }
};