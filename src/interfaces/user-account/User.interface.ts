interface UserType {
  id?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  citizenNumber?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: 'M' | 'F' | 'U';
  avatar?: string | null;
  role?: 'M' | 'L' | 'R';
  workplaceCommune?: string;
  workplaceAdditionalAddress?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default UserType;