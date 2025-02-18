type Params = Promise<{
  provinceId: string
}>

export default async function ProvinceDetailsPage({ params }: { params: Params }) {

  const { provinceId } = await params;

  return (
    <div>
      Province Details Page {provinceId}
    </div>
  );
}