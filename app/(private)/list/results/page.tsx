import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role, resultsData } from "@/app/lib/data";
import FormModal from "@/components/FormModal.tsx";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/app/lib/settings";

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  class: string;
  startTime: Date;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
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

const renderRow = (item: ResultList) => (
  <tr
    key={item?.id}
    className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
  >
    <td className="hidden gap-4 p-4 tablet:table-cell">{item?.title}</td>
    <td className="hidden tablet:table-cell">
      {item?.studentName + " " + item?.studentSurname}
    </td>
    <td className="hidden tablet:table-cell">{item?.score}</td>
    <td className="hidden tablet:table-cell">
      {item?.teacherName + " " + item?.teacherSurname}
    </td>
    <td className="hidden tablet:table-cell">{item?.class}</td>
    <td className="hidden tablet:table-cell">
      {new Intl.DateTimeFormat("en-us").format(item?.startTime)}
    </td>
    <td>
      <div className="flexic gap-2">
        {role === "admin" && (
          <>
            <FormModal table="result" type="update" data={item} />
            <FormModal table="result" type="delete" id={item?.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ResultsList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS

  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) continue;
      switch (key) {
        case "studentId":
          query.studentId = value;
          break;

        case "search":
          query.OR = [
            {
              exam: {
                title: {
                  contains: value,
                  mode: "insensitive",
                },
              },
            },
            {
              student: {
                name: {
                  contains: value,
                  mode: "insensitive",
                },
              },
            },
          ];

          break;
        default:
          break;
      }
    }
  }

  const [dataResponse, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: {
          select: { name: true, surname: true },
        },
        exam: {
          include: {
            lesson: {
              select: {
                class: {
                  select: {
                    name: true,
                  },
                },
                teacher: {
                  select: {
                    name: true,
                    surname: true,
                  },
                },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: {
                  select: {
                    name: true,
                  },
                },
                teacher: {
                  select: {
                    name: true,
                    surname: true,
                  },
                },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: p * ITEM_PER_PAGE - ITEM_PER_PAGE,
    }),
    prisma.result.count({
      where: query,
    }),
  ]);

  const data = dataResponse.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item?.student?.name,
      studentSurname: item?.student?.surname,

      teacherName: assessment.lesson?.teacher?.name || "",
      teacherSurname: assessment.lesson?.teacher?.surname || "",

      score: item.score,
      class: assessment.lesson?.class?.name || "",
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      <div className="flexicjb">
        <h1 className="hidden text-lg font-semibold md:block">All Results</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flexic gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ResultsList;
