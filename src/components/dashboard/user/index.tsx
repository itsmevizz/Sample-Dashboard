"use client";
import { useUser } from "@/context/UserContext";
import { getGreeting } from "@/utils/getGreeting";
import dynamic from "next/dynamic";
import { Fragment } from "react";
const SmallCard = dynamic(() => import("@/components/shared/small-card"));

const UserNameSection = () => {
  const { user, users } = useUser();

  return (
    <div>
      <div>
        <div className="h-[77px] w-full bg-black ">
          <div className="flex justify-between container h-full items-center">
            <span className="md:text-2xl text-xl text-white">
              <span role="img" aria-label="wave">
                👋
              </span>
              {getGreeting()}, {user?.name}
            </span>
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className="p-10 duration-300 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {user?.isAdmin ? (
          users.length === 0 ? (
            <div className="flex h-[50vh] col-span-5 container justify-center items-center font-geist-bold">
              No data to display
            </div>
          ) : (
            users.map((user, index) => (
              <Fragment key={index}>
                <SmallCard
                  name={user.name}
                  dateOfJoin={user.dateOfJoin}
                  username={user.username}
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
