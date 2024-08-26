import React from "react";
import CountChart from "./Charts/CountChart";
import Image from "next/image";

const StudentCount = () => {
  return (
    <div className="h-full w-full rounded-sm border bg-white shadow-xs">
      <div className="flexicjb px-lg py-sm">
        <h1>Students</h1>
        <Image
          src="/images/moreDark.png"
          alt="student"
          width={100}
          height={100}
          className="h-5 w-5"
        />
      </div>
      <div className="relative h-[75%] w-full">
        <CountChart />
        <Image
          src="/images/maleFemale.png"
          alt="maleFemale"
          width={100}
          height={100}
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flexicjc gap-2xl">
        <div className="flex flex-col gap-1">
          <div className="bg-forest h-5 w-5 rounded-full"></div>
          <p className="font-md-semibold">1,234</p>
          <p className="text-sm-regular text-gray-400">Boys (55%)</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="bg-moss h-5 w-5 rounded-full"></div>
          <p className="font-md-semibold">1,234</p>
          <p className="text-sm-regular text-gray-400">Girls (55%)</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCount;
