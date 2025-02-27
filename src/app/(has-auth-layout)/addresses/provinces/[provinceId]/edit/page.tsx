import { ProvinceEdit } from "@/components/main/address/province/ProvinceEdit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit the province",
  description: "Edit the province page.",
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