import Logout from "@/components/auth/Logout";
import { checkLoginStatusForAuthPage } from "@/lib/auth-token/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logout",
  description: "Logout from the application",
};

export default async function LogoutPage() {
  await checkLoginStatusForAuthPage();
  return (
    <>
      <Logout />
    </>
  );
}