import Image from "next/image";
import React from "react";

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
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-yellow-400"
      : type === "update"
        ? "bg-blue-500"
        : "bg-purple-500";
  return (
    <div>
      <button className={`${size} flexicjc rounded-full ${bgColor}`}>
        <Image src={`/images/${type}.png`} alt="" width={16} height={16} />
      </button>
    </div>
  );
};

export default FormModal;
