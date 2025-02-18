import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Districts Of Province",
  description: "List of districts of a province in Vietnam",
};

type Params = Promise<{
  provinceId: string
}>


export default async function DistrictsListOfProvincePage({ params }: { params: Params }) {
  const { provinceId } = await params;

  return (
    <>
      Districts List Of Province {provinceId}
    </>
  );
}