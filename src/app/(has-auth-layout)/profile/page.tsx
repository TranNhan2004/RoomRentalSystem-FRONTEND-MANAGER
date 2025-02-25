import { Profile } from '@/components/main/profile/Profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile",
  description: "Your profile page",
};

export default function ProfilePage() {
  return (
    <>
      <Profile />
    </>
  );
}
