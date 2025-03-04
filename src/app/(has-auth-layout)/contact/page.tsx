import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Liên hệ với chúng tôi</h1>
        <p className="text-lg text-gray-600 mb-12">Vui lòng liên hệ với chúng tôi nếu có bất kỳ thắc mắc nào cần hỗ trợ về phần mềm này</p>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">FASTPlugin Software Company</h2>
          <p className="text-gray-600 mb-2"><strong>Địa chỉ:</strong> 125A, Phường Tân Định, Quận 1, Thành phố Hồ Chí Minh</p>
          <p className="text-gray-600 mb-2"><strong>Email hỗ trợ:</strong> support@fastplugin.com</p>
          <p className="text-gray-600 mb-2"><strong>Số điện thoại:</strong> (321) 654-9870</p>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Hỗ trợ kỹ thuật</h3>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> technical@fastplugin.com</p>
          <p className="text-gray-600 mb-2"><strong>Phone:</strong> (111) 222-3333</p>
        </div>
      </div>
    </div>
  );
}