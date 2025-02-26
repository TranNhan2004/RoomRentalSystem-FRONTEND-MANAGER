import { ProvinceEdit } from "@/components/main/address/province/ProvinceEdit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit a province",
  description: "Edit a province page.",
};

export default async function ProvinceEditPage({
  params,
}: {
  params: Promise<{
    provinceId: string;
  }>
}) {

  const { provinceId } = await params;

  return (
    <>
      <ProvinceEdit id={provinceId} />
    </>
  );
}