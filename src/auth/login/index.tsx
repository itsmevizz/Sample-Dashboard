"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Fragment } from "react";
import InputField from "@/components/shared/input";
import Button from "@/components/shared/button";
import AppLoginLayout from "../layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { showErrorToast } from "@/utils/toast";

const LoginView = () => {
  const { login } = useUser();
  const router = useRouter();

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
        .min(6, "Password should be at least 6 characters"),
    }),
    onSubmit: (values) => {
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
          <h5 className="text-text-light mt-3">
            Welcome back! Please enter your details.
          </h5>
        </div>
        {/*  */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <InputField
            type="text"
            name="username"
            title={"Email"}
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.touched.username ? formik.errors.username : undefined}
            placeholder="Enter username here"
          />
          <InputField
            type="password"
            name="password"
            title={"Password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password ? formik.errors.password : undefined}
            placeholder="Enter password here"
          />
          <Button type="filled" action="submit">
            Login
          </Button>
        </form>
        {/*  */}
        <div className="flex justify-center gap-2 text-text-light">
          Don’t have an account? {"  "}
          <Link href={"/signup"}>
            <span className="hover:text-primary-main text-primary-light cursor-pointer hover:scale-105 duration-200">
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
