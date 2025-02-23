import ProvinceDetail from "@/components/main/address/province/ProvinceDetail";

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
      <ProvinceDetail id={provinceId} />
    </>
  );
}