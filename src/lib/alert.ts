import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import '@/app/toast.css';

export const handleDeleteAlert = async (status: 'success' | 'error', message: string) => {
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn không?',
    text: "Hành động này sẽ không thể hoàn tác.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có!',
    cancelButtonText: 'Không!'
  });

  if (result.isConfirmed) {
    if (status === 'success') {
      toast.success(message, { className: 'toast-success' });
    } else {
      toast.error(message, { className: 'toast-error' });
    }
  }
};