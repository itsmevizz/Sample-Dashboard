import { Fragment, ReactNode } from "react";
import AppHeader from "./header";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <div className="bg-[#F1F0EE] h-screen">
        <AppHeader />
        <main className="overflow-x-hidden ">{children}</main>
      </div>
    </Fragment>
  );
};

export default AppLayout;
