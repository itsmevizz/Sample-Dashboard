"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Fragment, useState } from "react";
import InputField from "@/components/shared/input";
import Button from "@/components/shared/button";
import AppLoginLayout from "../layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { showErrorToast } from "@/utils/toast";
import { IoEye, IoEyeOff } from "react-icons/io5";

//
const LoginView = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handlePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username should be at least 3 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(3, "Password should be at least 6 characters"),
    }),
    onSubmit: (values) => {
      console.log("Login attempted with values:", values);
      // Call the login function from context
      const isLoggedIn = login(values.username, values.password);

      if (isLoggedIn) {
        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } else {
        // Handle login failure (show error message or other logic)
        showErrorToast("Invalid username or password");
      }
    },
  });

  return (
    <AppLoginLayout>
      {/*  */}
      <Fragment>
        <div className="text-center">
          <h3 className="font-geist-bold text-[32px] text-text-main">
            Welcome back
          </h3>
          <h5 className="font-geist-medium mt-3">
            Welcome back! Please enter your details.
          </h5>
        </div>
        {/*  */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <InputField
            type="text"
            name="username"
            label={"Username"}
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.touched.username ? formik.errors.username : undefined}
            placeholder="Enter username here"
          />
          <div className="relative">
            <InputField
              type={passwordShow ? "text" : "password"}
              name="password"
              label={"Password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
              placeholder="Enter password here"
            />
            <button
              type="button"
              aria-label="toggle pass visibility"
              className="absolute right-3 top-10 text-lg cursor-pointer w-5 h-5"
              onClick={handlePasswordShow}
            >
              {passwordShow ? (
                <IoEyeOff className="text-[20px] text-[#3E47464D]" />
              ) : (
                <IoEye className="text-[20px] text-[#3E47464D]" />
              )}
            </button>
          </div>
          <Button type="filled" action="submit">
            Login
          </Button>
        </form>
        {/*  */}
        <div className="flex justify-center gap-2 font-geist-regular">
          Don’t have an account? {"  "}
          <Link href={"/signup"}>
            <span className="hover:text-primary-main cursor-pointer hover:scale-105 duration-200">
              {" "}
              Sign up
            </span>
          </Link>
        </div>
      </Fragment>
    </AppLoginLayout>
  );
};

export default LoginView;
