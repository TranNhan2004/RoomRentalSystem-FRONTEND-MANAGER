import { DistrictAdd } from "@/components/main/address/district/DistrictAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a new district",
  description: "Add a new district page.",
};
                                  
export default function DistrictAddPage() {
  return (
    <>
      <DistrictAdd />
    </>
  );
};