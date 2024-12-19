import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role, assignmentsData } from "@/app/lib/data";
import FormModal from "@/components/FormModal.tsx";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { ITEM_PER_PAGE } from "@/app/lib/settings";
import { getRole } from "@/app/lib/utils";

type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    teacher: Teacher;
    class: Class;
  };
};

const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS

  const { role, userId } = await getRole();

  const columns = [
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
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden tablet:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [{ header: "Actions", accessor: "actions" }]
      : []),
  ];

  const renderRow = (item: AssignmentList) => (
    <tr
      key={item?.id}
      className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
    >
      <td className="hidden gap-4 p-4 tablet:table-cell">
        {item?.lesson?.subject?.name}
      </td>
      <td>{item?.lesson?.class?.name}</td>
      <td className="hidden tablet:table-cell">
        {item?.lesson?.teacher?.name + " " + item?.lesson?.teacher?.surname}
      </td>
      <td className="hidden tablet:table-cell">
        {new Intl.DateTimeFormat("en-us").format(item?.dueDate)}
      </td>
      <td>
        <div className="flexic gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="assignment" type="update" data={item} />
              <FormModal table="assignment" type="delete" id={item?.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const query: Prisma.AssignmentWhereInput = {};
  query.lesson = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) continue;
      switch (key) {
        case "classId":
          query.lesson.classId = parseInt(value);
          break;
        case "teacherId":
          query.lesson.teacherId = value;
          break;
        case "search":
          query.lesson.subject = {
            name: {
              contains: value,
              mode: "insensitive",
            },
          };
          break;
        default:
          break;
      }
    }
  }

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = userId!;
      break;
    case "student":
      query.lesson.class = {
        students: {
          some: {
            id: userId!,
          },
        },
      };
      break;
    case "parent":
      query.lesson.class = {
        students: {
          some: {
            parentId: userId!,
          },
        },
      };
      break;

    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
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
    prisma.assignment.count({
      where: query,
    }),
  ]);

  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      <div className="flexicjb">
        <h1 className="hidden text-lg font-semibold md:block">
          All Assignments
        </h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flexic gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="assignment" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AssignmentListPage;
