import { CustomButton, CustomInput, CustomPinInput } from "@components/shared";
import { registerUserSchema } from "@features/schema/register-user.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerUserSchema),
  });

  const submitHandler = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-50">
      <form
        className="flex flex-col bg-gray-100 w-[28%] p-5 shadow-sm gap-5"
        onSubmit={submitHandler}
      >
        <h2 className="font-medium text-primary text-2xl">Register</h2>
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
        <CustomButton text="Register" />
        <Link to={"/login"} className="text-primary">
          Have an account? Login here
        </Link>
      </form>
    </div>
  );
}
