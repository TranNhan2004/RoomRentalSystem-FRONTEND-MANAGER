import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import { checkLoginStatusForAuthPage } from "@/lib/server/checkLoginStatus";


export default async function HasAuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkLoginStatusForAuthPage();
  return (
    <main>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="ml-[17%] mt-[5%] mr-[4%] p-6 text-[14px]">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}