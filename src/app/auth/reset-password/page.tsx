import ResetPasswordBefore from "@/components/main/auth/ResetPasswordBefore";
import { checkLoginStatusForLoginPage } from "@/lib/server/checkLoginStatus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your password page"
};

export default async function ResetPasswordBeforePage() {
  await checkLoginStatusForLoginPage();
  
  return (
    <>
      <ResetPasswordBefore />
    </>
  );
}