import UserNameSection from "@/components/dashboard/user";
import { useUser } from "@/context/UserContext";
import { Fragment } from "react";

const DashboardView = () => {
  const { user } = useUser();

  return (
    <Fragment>{user?.isAdmin ? <div></div> : <UserNameSection />}</Fragment>
  );
};

export default DashboardView;
