import { ProvinceAdd } from "@/components/main/address/province/ProvinceAdd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a new province",
  description: "Add a new province page.",
};

export default function ProvinceAddPage() {
  return (
    <>
      <ProvinceAdd />
    </>
  );
}