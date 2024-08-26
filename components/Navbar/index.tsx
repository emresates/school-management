import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flexicjb p-4">
      <div className="flexic gap-1 h-8 overflow-hidden rounded-md border bg-green-50 px-2">
        <Image
          src="/images/search.png"
          alt="search image"
          width={50}
          height={50}
          className="h-3 w-3"
        />

        <input
          type="text"
          placeholder="Search"
          className="w-[200px] bg-transparent outline-none text-sm"
        />
      </div>

      <div className="flexic gap-md">
        <div className="flexicjc h-8 w-8 cursor-pointer rounded-full border bg-white">
          <Image
            src="/images/message.png"
            alt="message logo"
            className="h-5 w-5"
            width={50}
            height={50}
          />
        </div>
        <div className="flexicjc h-8 w-8 cursor-pointer rounded-full border bg-white">
          <Image
            src="/images/announcement.png"
            alt="announcement logo"
            className="h-5 w-5"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs-medium">Emre Ates</p>
          <span className="text-right text-xxs text-gray-400">Admin</span>
        </div>
        <Image
          src="/images/avatar.png"
          alt="profile image"
          width={50}
          height={50}
          className="h-8 w-8 rounded-full border"
        />
      </div>
    </div>
  );
};

export default Navbar;
