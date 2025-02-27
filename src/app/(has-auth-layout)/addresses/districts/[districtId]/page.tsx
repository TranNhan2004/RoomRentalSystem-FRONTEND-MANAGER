import { DistrictDetails } from "@/components/main/address/district/DistrictDetails";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the district",
  description: "Details of the district",
};
                                  
export default async function DistrictDetailsPage({
  params,
}: {
  params: Promise<{
    districtId: string;
  }>
}) {
  const { districtId } = await params;

  return (
    <>
      <DistrictDetails id={districtId} />
    </>
  );
};