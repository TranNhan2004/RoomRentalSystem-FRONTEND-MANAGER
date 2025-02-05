interface BaseUserType {
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
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

export default BaseUserType;