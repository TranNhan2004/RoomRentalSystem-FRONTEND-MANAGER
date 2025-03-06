import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-[5%]">Chào mừng bạn đến với trang quản lý của hệ thống</h1>
      </div>

      <div className="mb-2">
        <h2 className="text-xl font-bold">Các chính sách và quy định cần phải đáp ứng:</h2>
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="text-gray-700 text-lg font-bold">1. Trách nhiệm với công việc:</h2>
        <p className="text-base leading-relaxed text-justify">
          Người quản lý cần đảm bảo công việc vận hành suôn sẻ trong hệ thống. Bao gồm việc theo dõi, giám sát tiến độ công việc và đảm bảo các quy trình được thực hiện đúng hạn và chính xác.
        </p>
      </div>

      <div className="flex flex-col justify-center mt-4">
        <h2 className="text-gray-700 text-lg font-bold">2. Quản lý thông tin người dùng:</h2>
        <p className="text-base leading-relaxed text-justify">
          Người quản lý có thể vô hiệu hoặc kích hoạt tài khoản người dùng, đây là hai chức năng rất quan trọng, phải được dùng một cách cẩn thận, tránh gây những phiền phức không đáng có cho người dùng khác.
        </p>
      </div>

      <div className="flex flex-col justify-center mt-4">
        <h2 className="text-gray-700 text-lg font-bold">3. Giám sát chất lượng dịch vụ:</h2>
        <p className="text-base leading-relaxed text-justify">
          Người quản lý khi duyệt trọ mới, cần đảm bảo chất lượng phòng trọ luôn đạt yêu cầu, các cơ sở vật chất phù hợp với mức giá đã được bên chủ trọ đặt ra.
        </p>
      </div>

      <div className="flex flex-col justify-center mt-4">
        <h2 className="text-gray-700 text-lg font-bold">4. Cần phải đáp ứng an toàn bảo mật thông tin:</h2>
        <p className="text-base leading-relaxed text-justify">
          Người quản lý cần đảm bảo các dữ liệu người dùng và thông tin liên quan đến hệ thống được bảo mật một cách an toàn. Nếu có bất cứ sai phạm gì liên quan đến việc lộ thông tin người dùng khác hoặc thông tin quan trọng trong hệ thống, người quản lý sẽ phải chịu tất cả các trách nhiệm pháp lý.
        </p>
      </div>

      <div className="flex flex-col justify-center mt-4">
        <h2 className="text-gray-700 text-lg font-bold">5. Xử lý sự cố và khiếu nại:</h2>
        <p className="text-base leading-relaxed text-justify">
          Người quản lý cần nhanh chóng xử lý các sự cố và khiếu nại từ người dùng khác có liên quan đến tài khoản người dùng, đảm bảo mọi vấn đề được giải quyết hợp lý và hiệu quả.
        </p>
      </div>
    </div>
  );
}
