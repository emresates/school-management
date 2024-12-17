"use client";

import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const TeacherForm = dynamic(() => import("./forms/teacher"), {
  loading: () => <p>Loading...</p>,
});
const StudentForm = dynamic(() => import("./forms/student"), {
  loading: () => <p>Loading...</p>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "result"
    | "exam"
    | "assignment"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-yellow-400"
      : type === "update"
        ? "bg-blue-500"
        : "bg-purple-500";

  const [open, setOpen] = useState(false);

  const MainForm = () => {
    return type === "delete" && id ? (
      <div className="flex flex-col gap-4 p-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table} ?
        </span>
        <button className="w-max self-center rounded-md border-none bg-red-500 px-4 py-2 text-white">
          Delete
        </button>
      </div>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "not found form"
    );
  };

  return (
    <div>
      <button
        className={`${size} flexicjc rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/images/${type}.png`} alt="" width={14} height={14} />
      </button>
      {open && (
        <div className="flexicjc absolute left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-50">
          <div
            className="relative w-[90%] rounded-md bg-white p-4 md:w-[70%] lg:w-[80%] xl:w-1/2 2xl:w-[40%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/images/close.png" alt="" width={16} height={16} />
            </div>
            <MainForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
