import Login from "@/components/auth/Login";
import { checkLoginStatusForLoginPage } from "@/lib/auth-token/server";
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