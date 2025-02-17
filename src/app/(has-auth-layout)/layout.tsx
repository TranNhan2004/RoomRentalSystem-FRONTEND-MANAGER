import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import { checkLoginStatusForAuthPage } from "@/lib/server/checkLogin";
import { ToastContainer } from "react-toastify";
import "sweetalert2/src/sweetalert2.scss";

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
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}