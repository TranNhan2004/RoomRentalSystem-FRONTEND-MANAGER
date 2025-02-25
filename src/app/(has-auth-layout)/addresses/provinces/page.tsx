import { ProvincesList } from "@/components/main/address/province/ProvincesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provinces",
  description: "List of provinces in Vietnam",
};

export default function ProvincesListPage() {
  return (
    <>
      <ProvincesList />
    </>
  );
}