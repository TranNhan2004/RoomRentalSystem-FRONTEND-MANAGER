import { ProvinceDetails } from "@/components/main/address/province/ProvinceDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Details of the province",
  description: "Details of the province page.",
};

export default async function ProvinceDetailsPage({
  params,
}: {
  params: Promise<{
    provinceId: string;
  }>
}) {

  const { provinceId } = await params;

  return (
    <>
      <ProvinceDetails id={provinceId} />
    </>
  );
}