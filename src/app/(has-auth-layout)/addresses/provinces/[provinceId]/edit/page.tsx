
export default async function ProvinceEditDetailsPage({
  params,
}: {
  params: Promise<{
    provinceId: string;
  }>
}) {

  const { provinceId } = await params;

  return (
    <div>
      Province Edit Details Page {provinceId}
    </div>
  );
}