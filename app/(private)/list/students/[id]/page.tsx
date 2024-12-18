import Image from "next/image";
import React from "react";
import Link from "next/link";
import { PieChartComponent } from "@/components/Chart/PieChart";
import Announcements from "@/app/(private)/admin/_components/Announcements";
import BigCalendar from "@/app/(private)/student/_components/BigCalender";

const SingleStudentPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 xl:flex-row">
      {/* Left */}
      <div className="w-full xl:w-2/3">
        {/* Top */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* User info card */}
          <div className="flex flex-1 gap-4 rounded-md bg-blue-200 p-3">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/29667271/pexels-photo-29667271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Picture of the author"
                width={144}
                height={144}
                className="h-36 min-h-36 w-36 min-w-36 rounded-full object-cover"
              />
            </div>
            <div className="flex w-2/3 flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Student Chris</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>
              <div className="flexicjb flex-wrap gap-2 text-xs font-medium">
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src="/images/blood.png"
                    alt="phone"
                    width={16}
                    height={16}
                  />
                  <span>A+</span>
                </div>
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src="/images/date.png"
                    alt="phone"
                    width={16}
                    height={16}
                  />
                  <span>January 2025</span>
                </div>
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src="/images/mail.png"
                    alt="phone"
                    width={16}
                    height={16}
                  />
                  <span>user@gmail.com</span>
                </div>
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src="/images/phone.png"
                    alt="phone"
                    width={16}
                    height={16}
                  />
                  <span>+123 456 64</span>
                </div>
              </div>
            </div>
          </div>

          {/* small cards */}
          <div className="flex flex-1 flex-wrap justify-between gap-4">
            {/* Card */}
            <div className="flex w-full gap-4 rounded-md border bg-white p-4 shadow-sm md:w-[48%] xl:w-[45%] 2xl:w-[47%]">
              <Image
                src="/images/singleAttendance.png"
                alt="phone"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* Card */}
            <div className="flex w-full gap-4 rounded-md border bg-white p-4 shadow-sm md:w-[48%] xl:w-[45%] 2xl:w-[47%]">
              <Image
                src="/images/singleBranch.png"
                alt="phone"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* Card */}
            <div className="flex w-full gap-4 rounded-md border bg-white p-4 shadow-sm md:w-[48%] xl:w-[45%] 2xl:w-[47%]">
              <Image
                src="/images/singleLesson.png"
                alt="phone"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div>
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* Card */}
            <div className="flex w-full gap-4 rounded-md border bg-white p-4 shadow-sm md:w-[48%] xl:w-[45%] 2xl:w-[47%]">
              <Image
                src="/images/singleClass.png"
                alt="phone"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 h-[800px] rounded-md bg-white p-4">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* Right */}
      <div className="flex w-full flex-col gap-4 xl:w-2/3">
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <h1 className="text-xl font-semibold">Shortcuts</h1>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <Link
              href={`/list/lessons?classId=${2}`}
              className="rounded-md bg-yellow-100 p-3"
            >
              Student&apos;s Lessons
            </Link>
            <Link
              href={`/list/teachers?classId=${2}`}
              className="rounded-md bg-blue-100 p-3"
            >
              Student&apos;s Teachers
            </Link>
            <Link
              href={`/list/results?classId=${2}`}
              className="rounded-md bg-red-100 p-3"
            >
              Student&apos;s Results
            </Link>
            <Link
              href={`/list/exams?classId=${2}`}
              className="rounded-md bg-orange-100 p-3"
            >
              Student&apos;s Exams
            </Link>
            <Link
              href={`/list/assignments?studentId=${"student2"}`}
              className="rounded-md bg-purple-100 p-3"
            >
              Student&apos;s Assignments
            </Link>
          </div>
        </div>
        <PieChartComponent />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
