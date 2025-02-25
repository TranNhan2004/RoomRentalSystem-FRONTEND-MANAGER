import { Login } from "@/components/main/auth/Login";
import { checkLoginStatusForNotAuthPage } from "@/lib/server/checkLoginStatus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to the application",
};

export default async function LoginPage() {
  await checkLoginStatusForNotAuthPage();

  return (
    <>
      <Login />
    </>
  );
}