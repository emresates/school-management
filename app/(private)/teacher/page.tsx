import React from "react";
import EventCalendar from "../admin/_components/EventCalendar";
import Announcements from "../admin/_components/Announcements";
import BigCalendar from "../student/_components/BigCalender";

const TeacherPage = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-2/3">
        <div className="h-full rounded-md bg-white p-4">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      <div className="w-1/3">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
