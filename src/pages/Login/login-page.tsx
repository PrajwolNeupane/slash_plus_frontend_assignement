import { CustomButton, CustomInput, CustomPinInput } from "@components/shared";
import {
  LoginUserSchema,
  loginUserSchema,
} from "@features/schema/login-user.schema";
import { useLogin } from "@features/service/auth/auth.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginUserSchema),
  });

  const navigate = useNavigate();

  const { mutateAsync: loginAsync, isPending: isLoading } = useMutation({
    mutationFn: (body: LoginUserSchema) => useLogin(body),
  });

  const submitHandler = handleSubmit(async (data) => {
    try {
      const response = await loginAsync(data);
      if (response.success) {
        toast.success("Login Successful");
        Cookies.set("access_token", response?.accessToken!, {
          expires: 1 / 48,
        });
        Cookies.set("refresh_token", response?.refreshToken!, { expires: 0.5 });
        Cookies.set("issued_at", Date.now().toString());
        navigate("/success");
      }
    } catch (e: unknown) {
      let errorMessage = "An error occurred during login";
      if (e instanceof AxiosError) {
        errorMessage = e.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    }
  });

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-50">
      <form
        className="flex flex-col bg-gray-100 xl:w-[28%] lg:w-[30%] rg:w-[45%] md:w-[50%] sm:w-[70%] w-[95%] p-5 shadow-sm gap-5"
        onSubmit={submitHandler}
      >
        <h2 className="font-medium text-primary rg:text-2xl text-xl">Login</h2>
        <CustomInput
          label="Email"
          name="email"
          register={register}
          errors={errors}
          type="email"
        />
        <CustomPinInput
          name="code"
          label="Login Code"
          length={6}
          errors={errors}
          register={register}
        />
        <CustomButton text="Login" isLoading={isLoading} className="mt-5" />
        <Link
          to={"/register"}
          className="text-primary lg:text-base rg:text-md text-sm"
        >
          Doesn't have an account ? Register here
        </Link>
      </form>
    </div>
  );
}
