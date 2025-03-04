import { UserDetails } from "@/components/main/user/UserDetails";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the user",
  description: "Details of the user page.",
};
                                  
export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{
    userId: string;
  }>
}) {
  const { userId } = await params;

  return (
    <>
      <UserDetails id={userId} />
    </>
  );
};