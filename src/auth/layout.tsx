"use client";
import { ReactNode } from "react";

const AppLoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="md:h-screen flex justify-center md:justify-between ">
      <div className="flex flex-col justify-center space-y-5 md:p-20 p-5 w-full md:w-[45%] bg-secondary-main md:bg-white">
        <div className="flex justify-center">
          <img className="h-[50px] w-[114px] " src="/assets/logo-main.png" />
        </div>
        {children}
      </div>
      {/*  */}
      {/* Side Image Hero */}
      <div className="md:flex hidden w-[60%] h-full items-end bg-gradient-to-l from-primary-main to-transparent">
        <img className="w-[50vw]" src="/assets/DrImage.webp" />
      </div>
    </div>
  );
};

export default AppLoginLayout;
