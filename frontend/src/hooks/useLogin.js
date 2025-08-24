import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';
import toast from 'react-hot-toast';

export const useLogin = () => {
 const queryClient = useQueryClient();
  const loginData = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(data.message || "Login successful! Welcome back .");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again.",
      );
    },
  });


    return {loginMutation:loginData.mutate, isPending:loginData.isPending, error:loginData.error};
}

