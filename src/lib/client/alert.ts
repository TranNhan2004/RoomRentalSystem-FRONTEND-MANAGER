import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import '@/app/toast.css';

const getConfirmSwal = async () => {
  return await Swal.fire({
    title: 'Bạn có chắc chắn không?',
    text: "Hành động này sẽ không thể hoàn tác.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có!',
    cancelButtonText: 'Không!'
  });
};

export const toastSuccess = async (message: string) => {
  toast.success(message, { className: 'toast-success' });
};

export const toastError = async (message: string) => {
  toast.error(message, { className: 'toast-error' });
};

export const handleDeleteAlert = async (deleteMethod: () => void) => {
  const result = await getConfirmSwal();
  if (result.isConfirmed) {
    deleteMethod();
  }
};

export const handleCancelAlert = async (exitMethod: () => void) => {
  const result = await getConfirmSwal();
  if (result.isConfirmed) {
    exitMethod();
  }
};