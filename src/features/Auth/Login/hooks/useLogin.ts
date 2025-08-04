import { useSnackbar } from "@/components/SnackbarProvider";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await api.post("/api/auth/login", {
        email,
        password,
      });
      setCookie("token", data.data.token);
      showSnackbar("Login successful!", "success");

      router.push("/dashboard");
    } catch (e: unknown) {
      if (e instanceof AxiosError && e.response?.data?.message) {
        showSnackbar(e.response.data.message, "error");
      } else {
        showSnackbar("An error occurred", "error");
      }
    }
  }, [email, password, router, showSnackbar]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};
