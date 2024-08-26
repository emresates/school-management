import Image from "next/image";
import React from "react";

interface UserCardProps {
  type: string;
}

const UserCard = ({ type }: UserCardProps) => {
  return (
    <div className="odd:bg-forest even:bg-moss w-full flex-1 rounded-2xl border p-lg shadow-xs">
      <div className="">
        <div className="flexicjb">
          <span className="text-xxs-regular rounded-full bg-white px-2 py-1">
            2024/05
          </span>
          <Image
            src="/images/more.png"
            alt="more"
            width={50}
            height={50}
            className="h-5 w-5"
          />
        </div>
        <h1 className="text-xl-semibold my-md text-white">1,234</h1>
        <h2 className="text-sm-medium capitalize text-gray-200">{type}</h2>
      </div>
    </div>
  );
};

export default UserCard;
