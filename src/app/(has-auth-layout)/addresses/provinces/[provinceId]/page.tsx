
export default async function ProvinceDetailsPage({
  params,
}: {
  params: Promise<{
    provinceId: string;
  }>
}) {

  const { provinceId } = await params;

  return (
    <div>
      Province Details Page {provinceId}
    </div>
  );
}