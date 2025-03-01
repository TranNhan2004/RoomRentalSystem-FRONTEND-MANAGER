export class ProvinceMessage {
  public static readonly BACKEND_NAME_UNIQUE_ERROR = '';

  public static readonly NAME_REQUIRED = 'Tên tỉnh không được để trống!';
  public static readonly NAME_UNIQUE_ERROR = 'Tên tỉnh đã tồn tại!';

  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm tỉnh mới!';
  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách tỉnh!';
  public static readonly GET_ERROR = 'Đã xảy ra lỗi khi lấy tỉnh theo ID!';
  public static readonly PATCH_ERROR = 'Đã xảy ra lỗi khi chỉnh sửa thông tin tỉnh!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa tỉnh!';
  public static readonly DELETE_PROTECTED_ERROR = 'Phải xóa các dữ liệu có tham chiếu đến tỉnh này trước!';

  public static readonly POST_SUCCESS = 'Thêm tỉnh mới thành công!';
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin tỉnh thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa tỉnh thành công!';
};


export class DistrictMessage {
  public static readonly NAME_REQUIRED = 'Tên huyện không được để trống!';
  public static readonly PROVINCE_REQUIRED = 'Tên tỉnh không được để trống!';

  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm huyện mới!';
  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách huyện!';
  public static readonly GET_ERROR = 'Đã xảy ra lỗi khi lấy huyện theo ID!';
  public static readonly PATCH_ERROR = 'Đã xảy ra lỗi khi chỉnh sửa thông tin huyện!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa huyện!';
  public static readonly DELETE_PROTECTED_ERROR = 'Phải xóa các dữ liệu có tham chiếu đến huyện này trước!';

  public static readonly POST_SUCCESS = 'Thêm huyện mới thành công!';
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin huyện thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa huyện thành công!';
};


export class CommuneMessage {
  public static readonly NAME_REQUIRED = 'Tên xã không được để trống!';
  public static readonly DISTRICT_REQUIRED = 'Tên tỉnh không được để trống!';

  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm xã mới!';
  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách xã!';
  public static readonly GET_ERROR = 'Đã xảy ra lỗi khi lấy xã theo ID!';
  public static readonly PATCH_ERROR = 'Đã xảy ra lỗi khi chỉnh sửa thông tin xã!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa xã!';
  public static readonly DELETE_PROTECTED_ERROR = 'Phải xóa các dữ liệu có tham chiếu đến xã này trước!';

  public static readonly POST_SUCCESS = 'Thêm xã mới thành công!';
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin xã thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa xã thành công!';
};