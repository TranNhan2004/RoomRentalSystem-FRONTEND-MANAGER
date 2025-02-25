import { Logout } from "@/components/main/auth/Logout";
import { checkLoginStatusForAuthPage } from "@/lib/server/checkLoginStatus";
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