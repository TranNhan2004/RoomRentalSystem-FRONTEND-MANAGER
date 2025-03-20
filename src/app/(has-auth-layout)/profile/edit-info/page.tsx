import { EditInfo } from "@/components/main/profile/EditInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit infomation",
  description: "Edit your personal information page",
};

export default function EditInfoPage() {
  return (
    <>
      <EditInfo />
    </>
  );
}