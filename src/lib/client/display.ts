export const displayRole = (role: 'M' | 'L' | 'R' | undefined) => {
  switch(role) {
    case 'M':
      return 'Quản lý';
    case 'L':
      return 'Người cho thuê';
    case 'R':
      return 'Người thuê';
    default:
      return 'GIÁ TRỊ KHÔNG HỢP LỆ';
  } 
};

export const displayGender = (gender: 'M' | 'F' | 'U' | undefined) => {
  switch(gender) {
    case 'M':
      return 'Nam';
    case 'F':
      return 'Nữ';
    case 'U':
      return 'Không rõ';
    default:
      return 'GIÁ TRỊ KHÔNG HỢP LỆ';
  }
};