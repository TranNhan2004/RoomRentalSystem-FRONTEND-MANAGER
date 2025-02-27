import { getImageSrc } from "@/lib/client/getImageSrc";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar trên */}
      <nav className="bg-gray-800 text-white py-4">
        <ul className="flex justify-center space-x-8">
          <li className="hover:text-yellow-400 cursor-pointer">Home</li>
          <li className="hover:text-yellow-400 cursor-pointer">About</li>
          <li className="hover:text-yellow-400 cursor-pointer">Services</li>
          <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hình ảnh nền ở giữa */}
      <div className="bg-gray-200 w-full h-[100px] text-center">
        <Image
          src={getImageSrc('management.png')}
          alt="Background"
          width={100}
          height={30}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navbar dưới */}
      <nav className="bg-gray-500 text-white py-4 ml-[10%] mr-[10%]">
        <ul className="flex justify-center space-x-6">
          <li className="hover:text-yellow-400 cursor-pointer">Web Design</li>
          <li className="hover:text-yellow-400 cursor-pointer">SEO</li>
          <li className="hover:text-yellow-400 cursor-pointer">Marketing</li>
        </ul>
      </nav>
    </div>
  );
}
