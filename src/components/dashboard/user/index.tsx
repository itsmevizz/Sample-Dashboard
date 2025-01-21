"use client";
import { useUser } from "@/context/UserContext";
import { getGreeting } from "@/utils/getGreeting";

const UserNameSection = () => {
  const { user } = useUser();

  return (
    <div>
      <div>
        <div className="h-[77px] w-full bg-black ">
          <div className="flex justify-between container h-full items-center">
            <h1 className="text-3xl text-white">
              👋 {getGreeting()}, {user?.name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNameSection;
