import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import toast from "react-hot-toast";

export const useLogout = () => {
    const queryClient = useQueryClient();
      const {
        mutate: logoutMutation,
        isPending,
        error,
      } = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          toast.success(data.message||"Logout successful! You have been logged out.");
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Logout failed. Please try again.");
        },
      });


    return {logoutMutation, isPending, error};
}