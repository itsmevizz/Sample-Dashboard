"use client";
import SmallCard from "@/components/shared/small-card";
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
      {/* Cards */}
      <div className="p-10">
        {user?.isAdmin && (
          <div className="duration-300 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5">
            <SmallCard name="vishnu " role="admin" userId="kk" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNameSection;
