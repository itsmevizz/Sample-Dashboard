"use client";
import SmallCard from "@/components/shared/small-card";
import { useUser } from "@/context/UserContext";
import { getGreeting } from "@/utils/getGreeting";
import { Fragment } from "react";

const UserNameSection = () => {
  const { user, users } = useUser();

  return (
    <div>
      <div>
        <div className="h-[77px] w-full bg-black ">
          <div className="flex justify-between container h-full items-center">
            <h1 className="md:text-3xl text-xl text-white">
              👋 {getGreeting()}, {user?.name}
            </h1>
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className="p-10 duration-300 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {user?.isAdmin ? (
          users.length === 0 ? (
            <div className="flex h-[50vh] w-screen justify-center items-center font-geist-bold">
              No data to display
            </div>
          ) : (
            users.map((user, index) => (
              <Fragment key={index}>
                <SmallCard
                  name={user.name}
                  dateOfJoin={user.dateOfJoin}
                  userId={user.username}
                />
              </Fragment>
            ))
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserNameSection;
