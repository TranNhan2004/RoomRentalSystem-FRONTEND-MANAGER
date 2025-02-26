import { DistrictEdit } from "@/components/main/address/district/DistrictEdit";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Edit a district",
  description: "Edit a district page.",
};
                                  
export default async function DistrictEditPage({
  params,
}: {
  params: Promise<{
    districtId: string;
  }>
}) {
  const { districtId } = await params;

  return (
    <>
      <DistrictEdit id={districtId} />
    </>
  );
};