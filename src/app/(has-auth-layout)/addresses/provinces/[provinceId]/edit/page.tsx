import { ProvinceEdit } from "@/components/main/address/province/ProvinceEdit";

export default async function ProvinceEditDetailsPage({
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