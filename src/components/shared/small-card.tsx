import React from "react";

interface SmallCardProps {
  name: string;
  dateOfJoin?: string;
  userId: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ name, dateOfJoin, userId }) => {
  return (
    <div className="max-w-sm rounded-lg  overflow-hidden shadow-lg p-5 bg-white">
      <div className="font-bold text-xl mb-2 font-geist-bold">{name}</div>
      {dateOfJoin && (
        <p className="text-gray-700 text-base font-geist-medium">
          Date Of Join: {dateOfJoin ?? ""}
        </p>
      )}
      <p className="text-gray-700 text-base font-geist-medium">
        User ID: {userId}
      </p>
    </div>
  );
};

export default SmallCard;
