export class ProvinceMessage {
  public static readonly POST_SUCCESS = 'Thêm tỉnh mới thành công!';
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin tỉnh thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa thông tin tỉnh thành công!';

  public static readonly POST_ERROR = 'Đã có lỗi xảy ra khi thêm tỉnh mới!';
  public static readonly GET_MANY_ERROR = 'Đã có lỗi xảy ra khi lấy danh sách tỉnh!';
  public static readonly GET_BY_ID_ERROR = 'Đã có lỗi xảy ra khi lấy tỉnh theo ID!';
  public static readonly PATCH_ERROR = 'Đã có lỗi xảy ra khi chỉnh sửa thông tin tỉnh!';
  public static readonly DELETE_ERROR = 'Đã có lỗi xảy ra khi xóa thông tin tỉnh!';
  public static readonly DELETE_PROTECT_ERROR = 'Phải xóa các dữ liệu có tồn tại tỉnh này trước khi xóa tỉnh!';

  public static readonly NAME_UNIQUE_ERROR = 'Tên tỉnh đã tồn tại!';

  public static readonly BACKEND_NAME_UNIQUE_ERROR = 'province with this name already exists.';
};

export class DistrictMessage {
  public static readonly POST_SUCCESS = 'Thêm huyện mới thành công!';
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin huyện thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa thông tin huyện thành công!';

  public static readonly POST_ERROR = 'Đã có lỗi xảy ra khi thêm huyện mới!';
  public static readonly GET_MANY_ERROR = 'Đã có lỗi xảy ra khi lấy danh sách huyện!';
  public static readonly GET_BY_ID_ERROR = 'Đã có lỗi xảy ra khi lấy huyện theo ID!';
  public static readonly PATCH_ERROR = 'Đã có lỗi xảy ra khi chỉnh sửa thông tin huyện!';
  public static readonly DELETE_ERROR = 'Đã có lỗi xảy ra khi xóa thông tin huyện!';
  public static readonly DELETE_PROTECT_ERROR = 'Phải xóa các dữ liệu có tồn tại huyện này trước khi xóa huyện!';

  public static readonly REQUIRED_PROVINCE_ERROR = 'Tên tỉnh không được để trống!';
};

export class CommuneMessage {
  public static readonly POST_SUCCESS = 'Thêm xã mới thành công!';
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin xã thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa thông tin xã thành công!';

  public static readonly POST_ERROR = 'Đã có lỗi xảy ra khi thêm xã mới!';
  public static readonly GET_MANY_ERROR = 'Đã có lỗi xảy ra khi lấy danh sách xã!';
  public static readonly GET_BY_ID_ERROR = 'Đã có lỗi xảy ra khi lấy xã theo ID!';
  public static readonly PATCH_ERROR = 'Đã có lỗi xảy ra khi chỉnh sửa thông tin xã!';
  public static readonly DELETE_ERROR = 'Đã có lỗi xảy ra khi xóa thông tin xã!';
};