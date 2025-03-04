import { UserAdd } from "@/components/main/user/UserAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a new user",
  description: "Add a new user page.",
};
                                  
export default function UserAddPage() {
  return (
    <>
      <UserAdd />
    </>
  );
};