"use client";
import Image from "next/image";
import { ReactNode } from "react";

const AppLoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-screen flex justify-center md:justify-between ">
      <div className="flex flex-col justify-center space-y-5 md:p-20 p-5 w-full  md:w-[45%] bg-secondary-main md:bg-white">
        <div className="flex justify-center">
          <Image
            width={200}
            height={200}
            alt="user"
            className="h-[50px] w-[114px] "
            src="/assets/logo-main.png"
          />
        </div>
        {children}
      </div>
      {/*  */}
      {/* Side Image Hero */}
      <div className="md:flex hidden w-[60%] h-screen items-end bg-gradient-to-l from-primary-main to-transparent">
        <Image
          width={500}
          height={500}
          alt="side"
          loading="lazy"
          className="w-[50vw] h-fit"
          src="/assets/DrImage.webp"
        />
      </div>
    </div>
  );
};

export default AppLoginLayout;
