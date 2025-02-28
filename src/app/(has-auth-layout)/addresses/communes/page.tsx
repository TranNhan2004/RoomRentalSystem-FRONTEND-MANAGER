import { CommunesList } from "@/components/main/address/commune/CommunesList";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Communes",
  description: "List of communes in Vietnam page.",
};
                                  
export default function CommunesListPage() {
  return (
    <>
      <CommunesList />
    </>
  );
};