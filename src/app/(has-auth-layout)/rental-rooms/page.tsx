import { RoomsList } from "@/components/main/rental-room/RoomsList";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Rental rooms",
  description: "List of rental rooms page.",
};
                                  
export default function RoomsListPage() {
  return (
    <>
      <RoomsList />
    </>
  );
};