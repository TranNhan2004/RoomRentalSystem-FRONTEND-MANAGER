import ProvinceAddForm from "@/components/main/address/ProvinceAddForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a new province",
  description: "This is a new page",
};

export default function NewProvincePage() {
  return (
    <>
      <ProvinceAddForm />
    </>
  );
}