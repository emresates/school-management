import UserCard from "@/components/UserCard";
import React from "react";
import StudentCount from "./_components/StudentCount";
import AttendanceChart from "@/app/(private)/admin/_components/Charts/AttendanceChart";
import FinanceChart from "./_components/Charts/FinanceChart";
import EventCalendar from "./_components/EventCalendar";
import Announcements from "./_components/Announcements";

const AdminPage = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-2/3">
        <div className="flexicjb flex-wrap gap-lg">
          <UserCard type="students" />
          <UserCard type="teachers" />
          <UserCard type="parents" />
          <UserCard type="staffs" />
        </div>

        {/* Middle chart */}
        <div className="flexic items-stretch gap-lg py-lg">
          {/* count chart */}
          <div className="h-[450px] w-1/3">
            <StudentCount />
          </div>

          <div className="w-2/3">
            <AttendanceChart />
          </div>
        </div>

        {/* bottom chart */}
        <div className="h-[500px] w-full">
          <FinanceChart />
        </div>
      </div>
      <div className="w-1/3">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
