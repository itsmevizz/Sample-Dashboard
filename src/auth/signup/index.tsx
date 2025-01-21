"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/shared/input";
import Button from "@/components/shared/button";
import AppLoginLayout from "../layout";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

const SignupView = () => {
  const router = useRouter();
  const { register } = useUser();

  // Validation Schema
  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .notOneOf(["admin"], "Cannot use 'admin' as a username"),
    name: yup.string().required("Name is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Register the user
      const success = register({
        username: values.username,
        name: values.name,
        password: values.password,
        isAdmin: false, // Set isAdmin to false for regular users
      });

      if (success) {
        showSuccessToast("Registration successful!");
        // Redirect to dashboard after successful signup
        router.push("/dashboard");
      } else {
        // Handle user already exists or other errors
        showErrorToast("Registration failed. User may already exist.");
      }
    },
  });

  return (
    <AppLoginLayout>
      {/*  */}
      <Fragment>
        {/*  */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <InputField
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            title="Username"
            placeholder="Enter username"
            error={formik.touched.username ? formik.errors.username : undefined}
          />
          <InputField
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            title="Name"
            placeholder="Enter name"
            error={formik.touched.name ? formik.errors.name : undefined}
          />
          <InputField
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            title="Password"
            placeholder="Enter password"
            error={formik.touched.password ? formik.errors.password : undefined}
          />
          <InputField
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            title="Confirm Password"
            placeholder="Confirm password"
            error={
              formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
          />
          <Button type="filled" action="submit">
            Signup
          </Button>
        </form>
        {/*  */}
        <div className="flex justify-center gap-2 text-text-light">
          Have an account? {"  "}
          <Link href={"/login"}>
            <span className="hover:text-primary-main text-primary-light cursor-pointer hover:scale-105 duration-200">
              {" "}
              Login
            </span>
          </Link>
        </div>
      </Fragment>
    </AppLoginLayout>
  );
};

export default SignupView;
