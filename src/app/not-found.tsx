import Image from 'next/image';
import { Metadata } from 'next';
import { checkLoginStatusForAuthPage } from '@/lib/server/checkLoginStatus';
import { GoToHomeButton } from '@/components/partial/button/GoToHomeButton';
import { getImageSrc } from '@/lib/client/getImageSrc';

export const metadata: Metadata = {
  title: "404 Error",
};

export default async function NotFound() {
  await checkLoginStatusForAuthPage();

  return (
    <div className="fixed top-[120px] bottom-[120px] left-[220px]">
      <div className="grid grid-cols-12 gap-8 items-center justify-center w-full max-w-7xl">
        <div className="col-span-4">
          <Image
            src={getImageSrc('not-found.png')}
            alt="404 Illustration"
            className="w-full h-full object-cover"
            width={400}
            height={400}
          />
        </div>

        <div className="w-px bg-gray-300 h-[350px] mx-8"></div>

        <div className="col-span-6">
          <h1 className="text-[150px] font-bold text-red-600">404</h1>
          <p className="mt-[-5%] text-2xl text-gray-700">Trang bạn đang tìm không tồn tại.</p>

          <GoToHomeButton />
        </div>
      </div>
    </div>
  );
}
