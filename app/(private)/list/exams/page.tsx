import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role, examsData } from "@/app/lib/data";
import FormModal from "@/components/FormModal.tsx";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { ITEM_PER_PAGE } from "@/app/lib/settings";

type ExamList = Exam & {
  lesson: {
    subject: Subject;
    teacher: Teacher;
    class: Class;
  };
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Subject",
    accessor: "subject",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: ExamList) => (
  <tr
    key={item?.id}
    className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
  >
    <td className="hidden gap-4 p-4 tablet:table-cell">
      {item?.lesson.subject.name}
    </td>
    <td>{item?.lesson.class.name}</td>
    <td className="hidden tablet:table-cell">
      {item?.lesson.teacher.name + " " + item?.lesson.teacher.surname}
    </td>
    <td className="hidden tablet:table-cell">
      {new Intl.DateTimeFormat("en-us").format(item?.startTime)}
    </td>
    <td>
      <div className="flexic gap-2">
        {role === "admin" && (
          <>
            <FormModal table="exam" type="update" data={item} />
            <FormModal table="exam" type="delete" id={item?.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ExamsList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS

  const query: Prisma.ExamWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) continue;
      switch (key) {
        case "classId":
          query.lesson = { classId: parseInt(value) };
          break;
        case "teacherId":
          query.lesson = {
            teacherId: value,
          };
          break;
        case "search":
          query.lesson = {
            subject: {
              name: {
                contains: value,
                mode: "insensitive",
              },
            },
          };
          break;
        default:
          break;
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: {
              select: { name: true },
            },
            teacher: {
              select: { name: true, surname: true },
            },
            class: {
              select: { name: true },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: p * ITEM_PER_PAGE - ITEM_PER_PAGE,
    }),
    prisma.exam.count({
      where: query,
    }),
  ]);

  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      <div className="flexicjb">
        <h1 className="hidden text-lg font-semibold md:block">All Exams</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flexic gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="exam" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ExamsList;
