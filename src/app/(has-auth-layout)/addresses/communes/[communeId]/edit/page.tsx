import { CommuneEdit } from "@/components/main/address/commune/CommuneEdit";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Edit the commune",
  description: "Edit the commune page.",
};
                                  
export default async function CommuneEditPage({
  params,
}: {
  params: Promise<{
    communeId: string;
  }>
}) {

  const { communeId } = await params;

  return (
    <>
      <CommuneEdit id={communeId} />
    </>
  );
};