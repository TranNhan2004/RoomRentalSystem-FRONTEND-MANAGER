export class AuthMessage {
  public static readonly BACKEND_EMAIL_UNIQUE_ERROR = '';
  public static readonly BACKEND_CHANGE_PASSWORD_DUPLICATED = '';

  public static readonly EMAIL_REQUIRED = 'Email không được để trống!'; 
  public static readonly PASSWORD_REQUIRED = 'Mật khẩu không được để trống!'; 
  public static readonly OLD_PASSWORD_REQUIRED = 'Mật khẩu cũ không được để trống!';
  public static readonly NEW_PASSWORD_REQUIRED = 'Mật khẩu mới không được để trống!'; 
  public static readonly CONFIRM_PASSWORD_REQUIRED = 'Mật khẩu nhập lại không được để trống!'; 

  public static readonly EMAIL_FORMAT_ERROR = 'Email không đúng định dạng!';
  public static readonly PASSWORD_FORMAT_ERROR = 'Mật khẩu phải có từ 8-20 ký tự, ít nhất có 1 chữ thường (a-z), ' + 
                                                  '1 chữ hoa (A-Z), 1 chữ số (0-9) và 1 ký tự đặc biệt (!@#$%^&*)';

  public static readonly EMAIL_UNIQUE_ERROR = 'Email đã tồn tại!';

  public static readonly CONFIRM_PASSWORD_MISMATCH = 'Mật khẩu nhập lại phải khớp với mật khẩu!';

  public static readonly CHANGE_PASSWORD_DUPLICATED = 'Mật khẩu mới và mật khẩu cũ không được trùng nhau!';

  public static readonly LOGIN_ERROR = 'Email hoặc mật khẩu không đúng!';
  public static readonly RESET_PASSWORD_URL_ERROR = 'Đã xảy ra lỗi khi lấy liên kết để đặt lại mật khẩu!';
  public static readonly RESET_PASSWORD_ERROR = 'Đã xảy ra lỗi khi lấy liên kết để đặt lại mật khẩu!';
  public static readonly CHANGE_PASSWORD_ERROR = 'Đã có lỗi xảy ra khi đổi mật khẩu! Vui lòng thử lại sau!';
  
  public static readonly RESET_PASSWORD_SUCCESS = 'Mật khẩu đã được đặt lại thành công!';
  public static readonly CHANGE_PASSWORD_SUCCESS = 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại!';
}

export class UserMessage {
  public static readonly BACKEND_PHONE_NUMBER_UNIQUE_ERROR = '';
  public static readonly BACKEND_CITIZEN_NUMBER_UNIQUE_ERROR = '';

  public static readonly FIRST_NAME_REQUIRED = 'Tên người dùng không được để trống!';
  public static readonly LAST_NAME_REQUIRED = 'Họ người dùng không được để trống!';
  public static readonly PHONE_NUMBER_REQUIRED = 'Số điện thoại không được để trống!';
  public static readonly CITIZEN_NUMBER_REQUIRED = 'Số CCCD không được để trống!';
  public static readonly GENDER_REQUIRED = 'Giới tính không được để trống!';

  public static readonly PHONE_NUMBER_FORMAT_ERROR = 'Số điện thoại phải có đủ 10 chữ số!';
  public static readonly CITIZEN_NUMBER_FORMAT_ERROR = 'Số CCCD phải có đủ 12 chữ số!';

  public static readonly PHONE_NUMBER_UNIQUE_ERROR = 'Số điện thoại đã tồn tại!';
  public static readonly CITIZEN_NUMBER_UNIQUE_ERROR = 'Số CCCD đã tồn tại!';

  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách người dùng!';
  public static readonly GET_ERROR = 'Đã xảy ra lỗi khi lấy thông tin người dùng theo ID!';
  public static readonly PATCH_ERROR = 'Đã xảy ra lỗi khi chỉnh sửa thông tin người dùng!';
  
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin người dùng thành công!';
}