import ChangePassword from "@/components/main/profile/ChangePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Change your password page",
};

export default function ChangePasswordPage() {
  return (
    <>
      <ChangePassword />
    </>
  );
}