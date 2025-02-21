export class ProvinceMessage {
  public static readonly POST_SUCCESS = 'Thêm tỉnh mới thành công!';
  public static readonly GET_MANY_SUCCESS = 'Lấy danh sách tỉnh thành công!';
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin tỉnh thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa thông tin tỉnh thành công!';

  public static readonly POST_ERROR = 'Đã có lỗi xảy ra khi thêm tỉnh mới!';
  public static readonly GET_MANY_ERROR = 'Đã có lỗi xảy ra khi lấy danh sách tỉnh!';
  public static readonly PATCH_ERROR = 'Đã có lỗi xảy ra khi chỉnh sửa thông tin tỉnh!';
  public static readonly DELETE_ERROR = 'Đã có lỗi xảy ra khi xóa thông tin tỉnh!';

  public static readonly NAME_UNIQUE_ERROR = 'Tên tỉnh đã tồn tại';

  public static readonly BACKEND_NAME_UNIQUE_ERROR = 'province with this name already exists.';
};