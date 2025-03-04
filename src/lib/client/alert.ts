import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import '@/app/toast.css';

const getConfirmSwal = async (text: string, confirmedMethod: () => void) => {
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn không?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có!',
    cancelButtonText: 'Không!'
  });

  if (result.isConfirmed) {
    confirmedMethod();
  }
};

export const toastSuccess = async (message: string) => {
  toast.success(message, { className: 'toast-success' });
};

export const toastError = async (message: string) => {
  toast.error(message, { className: 'toast-error' });
};

export const handleWarningAlert = async (confirmedMethod: () => void) => {
  await getConfirmSwal('Hành động xóa dữ liệu này không thể hoàn tác', confirmedMethod);
};

export const handleDeleteAlert = async (confirmedMethod: () => void) => {
  await getConfirmSwal('Hành động xóa dữ liệu này không thể hoàn tác', confirmedMethod);
};

export const handleCancelAlert = async (confirmedMethod: () => void) => {
  await getConfirmSwal('Các dữ liệu bạn đang thao tác sẽ không được lưu', confirmedMethod);
};