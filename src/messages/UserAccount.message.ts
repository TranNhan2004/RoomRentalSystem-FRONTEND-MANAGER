export class AuthMessage {
  public static readonly RESET_PASSWORD_SUCCESS = 'Mật khẩu đã được thay đổi thành công!';


  public static readonly EMAIL_INPUT_ERROR = 'Email không đúng định dạng!';
  public static readonly PASSWORD_INPUT_ERROR = 'Mật khẩu phải có từ 8-20 ký tự, ít nhất có 1 chữ thường (a-z), ' + 
                                                '1 chữ hoa (A-Z), 1 chữ số (0-9) và 1 ký tự đặc biệt (!@#$%^&*)';
  public static readonly CONFIRM_PASSWORD_INPUT_NOT_MATCH = 'Mật khẩu nhập lại phải khớp với mật khẩu!';

  public static readonly LOGIN_ERROR = 'Email hoặc mật khẩu không đúng!';
  public static readonly GET_RESET_PASSWORD_URL_ERROR = 'Đã xảy ra lỗi khi lấy liên kết để đặt lại mật khẩu!';
  public static readonly RESET_PASSWORD_ERROR = 'Đã có lỗi xảy ra khi đặt lại mật khẩu!';
}