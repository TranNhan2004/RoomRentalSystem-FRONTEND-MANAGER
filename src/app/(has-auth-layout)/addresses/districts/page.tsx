import { DistrictsList } from "@/components/main/address/district/DistrictsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Districts",
  description: "List of districts in Vietnam page.",
};

export default async function DistrictsListPage() {

  return (
    <>
      <DistrictsList />
    </>
  );
}