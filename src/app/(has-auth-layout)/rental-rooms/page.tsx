import { RentalRoomsList } from "@/components/main/rental-room/RentalRoomsList";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Rental rooms",
  description: "List of rental rooms page.",
};
                                  
export default function RentalRoomsListPage() {
  return (
    <>
      <RentalRoomsList />
    </>
  );
};