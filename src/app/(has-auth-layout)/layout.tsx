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
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="ml-[17%] mt-[5%] mr-[4%] p-6">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}