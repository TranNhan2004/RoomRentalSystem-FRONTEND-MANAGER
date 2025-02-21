import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Districts Of Province",
  description: "List of districts of a province in Vietnam",
};

export default async function DistrictsListOfProvincePage({ 
  params, 
}: { 
  params: Promise<{
    provinceId: string;
  }> 
}) {
  const provinceId = (await params).provinceId;

  return (
    <>
      Districts List Of Province {provinceId}
    </>
  );
}