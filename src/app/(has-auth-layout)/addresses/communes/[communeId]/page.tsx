import { CommuneDetails } from "@/components/main/address/commune/CommuneDetails";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the commune",
  description: "Details of the commune page.",
};
                                  
export default async function CommuneDetailsPage({
  params,
}: {
  params: Promise<{
    communeId: string;
  }>
}) {

  const { communeId } = await params;

  return (
    <>
      <CommuneDetails id={communeId} />
    </>
  );
};