import { RentalRoomDetails } from "@/components/main/rental-room/RentalRoomDetails";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the rental room",
  description: "Details of the rental room page.",
};

    
export default async function RentalRoomDetailsPage({
  params,
}: {
  params: Promise<{
    roomId: string;
  }>
}) {
  const { roomId } = await params;

  return (
    <>
      <RentalRoomDetails id={roomId} />
    </>
  );
};