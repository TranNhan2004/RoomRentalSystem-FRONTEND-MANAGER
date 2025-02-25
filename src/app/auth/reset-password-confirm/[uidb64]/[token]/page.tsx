import { ResetPasswordAfter } from "@/components/main/auth/ResetPasswordAfter";
import { checkLoginStatusForNotAuthPage } from "@/lib/server/checkLoginStatus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password with token",
  description: "Reset your password with token page"
};

export default async function ResetPasswordAfterPage({
  params,
}: {
  params: Promise<{
    uidb64: string,
    token: string
  }>
}) {
  await checkLoginStatusForNotAuthPage();
  const { uidb64, token } = await params;

  return (
    <>
      <ResetPasswordAfter 
        uidb64={uidb64}
        token={token}
      />
    </>
  );
}