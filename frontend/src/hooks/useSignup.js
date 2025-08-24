import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import toast from "react-hot-toast";

export const useSignup = () => {
    const queryClient = useQueryClient();
      const {
        mutate: signupMutation,
        isPending,
        error,
      } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          toast.success(data.message||"Signup successful! Welcome aboard.");
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
        },
      });


    return {signupMutation, isPending, error};
}