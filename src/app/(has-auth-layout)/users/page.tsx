import { UsersList } from "@/components/main/user/UsersList";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Users",
  description: "List of users page.",
};
                                  
export default function UsersListPage() {
  return (
    <>
      <UsersList />
    </>
  );
};