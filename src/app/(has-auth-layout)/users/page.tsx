import { Metadata } from "next";
import UserList from "@/components/main/user/UserList";

export const metadata: Metadata = {
  title: "Users",
  description: "A list of all users in the system",
};

export default function UsersListPage() {
  return (
    <>
      <UserList />
    </>
  );
}