import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role } from "@/app/lib/data";
import FormModal from "@/components/FormModal.tsx";
import { Class, Prisma, Student } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { ITEM_PER_PAGE } from "@/app/lib/settings";

type StudentList = Student & { class: Class };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: StudentList) => (
  <tr
    key={item?.id}
    className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
  >
    <td className="flexic gap-2 p-2">
      <Image
        src={item.img || "/images/avatar.png"}
        alt={item.name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover tablet:hidden desktop:block"
      />
      <div className="flex flex-col">
        <h3 className="text-md-semibold">{item?.name}</h3>
        <h4 className="text-xs-regular text-gray-500">{item?.class.name}</h4>
      </div>
    </td>
    <td className="hidden tablet:table-cell">{item?.username}</td>
    <td className="hidden tablet:table-cell">{item?.class.name[0]}</td>
    <td className="hidden tablet:table-cell">{item?.phone}</td>
    <td className="hidden tablet:table-cell">{item?.address}</td>
    <td>
      <div className="flexic gap-2">
        <Link href={`/list/students/${item.id}`}>
          <button className="flexicjc h-7 w-7 rounded-full bg-yellow-200">
            <Image src="/images/view.png" alt="" width={14} height={14} />
          </button>
        </Link>
        {role === "admin" && (
          <>
            {/* <FormModal table="student" type="update" data={item} /> */}
            <FormModal table="student" type="delete" id={item?.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const StudentList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS

  const query: Prisma.StudentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) continue;
      switch (key) {
        case "teacherId":
          query.class = {
            lessons: {
              some: {
                teacherId: value,
              },
            },
          };
          break;
        case "search":
          query.name = {
            contains: value,
            mode: "insensitive",
          };
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: p * ITEM_PER_PAGE - ITEM_PER_PAGE,
    }),
    prisma.student.count({
      where: query,
    }),
  ]);

  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      <div className="flexicjb">
        <h1 className="hidden text-lg font-semibold md:block">All Students</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flexic gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default StudentList;
