import toast from 'react-hot-toast';

const useToastHook = () => {
  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
    }
  };
  return {
    showToast: {
      success: (message) => showToast(message, 'success'),
      error: (message) => showToast(message, 'error'),
    },
  };
};

export { useToastHook };
