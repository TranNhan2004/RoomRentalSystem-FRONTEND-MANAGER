import Login from "@/components/main/auth/Login";
import { checkLoginStatusForLoginPage } from "@/lib/server/checkLoginStatus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to the application",
};

export default async function LoginPage() {
  await checkLoginStatusForLoginPage();

  return (
    <>
      <Login />
    </>
  );
}