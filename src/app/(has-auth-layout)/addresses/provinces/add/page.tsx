import ProvinceAdd from "@/components/main/address/province/ProvinceAdd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a new province",
  description: "This is a new page",
};

export default function ProvinceAddPage() {
  return (
    <>
      <ProvinceAdd />
    </>
  );
}