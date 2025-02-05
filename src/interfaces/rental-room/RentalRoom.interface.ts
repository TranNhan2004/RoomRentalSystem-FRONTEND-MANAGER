interface RentalRoomType {
  id?: string;
  name?: string;
  commune?: string;
  additionalAddress?: string;
  closingTime?: string;
  maxOccupancyPerRoom?: number;
  totalNumber?: number;
  emptyNumber?: number;
  furtherDescription?: string;
  approvedBy?: string | null;
  possessedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

export default RentalRoomType; 