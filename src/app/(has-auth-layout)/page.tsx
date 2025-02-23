import { getImageSrc } from "@/lib/client/getImageSrc";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-[5%]">Chào mừng bạn đến với trang quản lý của hệ thống</h1>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-[3%]">
        <div className="flex justify-center ml-[-30%]">
          <Image 
            src={getImageSrc("management.png")}
            alt="Management Image"
            width={300}
            height={300}
            className="w-[40%] max-w-md object-cover"
          />
        </div>
        <div className="flex flex-col justify-center ml-[-25%] mr-[5%]">
          <p className="text-lg leading-relaxed text-justify">
            Đây là nơi bạn có thể quản lý tất cả dữ liệu trong hệ thống. Bạn sẽ có thể thêm, sửa, và xóa thông tin các dịch vụ, người dùng, và các tài nguyên khác. Hệ thống cung cấp các công cụ để theo dõi và cập nhật trạng thái dữ liệu một cách nhanh chóng và chính xác.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-300 mb-[2%] mt-[4%] ml-[3%]"></div>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col justify-center ml-[8%] mr-[-25%]">
          <p className="text-lg leading-relaxed text-justify">
            Tại đây bạn có thể theo dõi các thống kê quan trọng về hệ thống. Các biểu đồ và báo cáo sẽ giúp bạn phân tích hiệu suất, số lượng người dùng, và các chỉ số hoạt động khác. Bạn có thể dễ dàng truy xuất các dữ liệu thống kê để đưa ra quyết định chính xác và kịp thời.
          </p>
        </div>
        <div className="flex justify-center ml-[10%]">
          <Image 
            src={getImageSrc("column-chart.png")}
            alt="Management Image"
            width={300}
            height={300}
            className="w-[50%] max-w-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}