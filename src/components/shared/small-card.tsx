import React from "react";

interface SmallCardProps {
  name: string;
  role: string;
  userId: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ name, role, userId }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg p-4 bg-white">
      <div className="font-bold text-xl mb-2 font-geist-bold">{name}</div>
      <p className="text-gray-700 text-base font-geist-medium">Role: {role}</p>
      <p className="text-gray-700 text-base font-geist-medium">
        User ID: {userId}
      </p>
    </div>
  );
};

export default SmallCard;
