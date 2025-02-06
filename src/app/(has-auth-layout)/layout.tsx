import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function HasAuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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