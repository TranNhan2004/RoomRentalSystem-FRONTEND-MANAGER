import { CommuneAdd } from "@/components/main/address/commune/CommuneAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a new commune",
  description: "Add a new commune page.",
};
                                  
export default function CommuneAddPage() {
  return (
    <>
      <CommuneAdd />
    </>
  );
};