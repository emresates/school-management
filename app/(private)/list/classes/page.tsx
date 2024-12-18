import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import { role } from "@/app/lib/data";
import FormModal from "@/components/FormModal.tsx";
import { Class, Prisma, Teacher } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { ITEM_PER_PAGE } from "@/app/lib/settings";

type ClassList = Class & { supervisor: Teacher };

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: ClassList) => (
  <tr
    key={item?.id}
    className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
  >
    <td className="hidden gap-4 p-4 tablet:table-cell">{item?.name}</td>
    <td className="hidden tablet:table-cell">{item?.capacity}</td>
    <td className="hidden tablet:table-cell">{item?.name[0]}</td>
    <td className="hidden tablet:table-cell">
      {item?.supervisor?.name + " " + item?.supervisor?.surname}
    </td>
    <td>
      <div className="flexic gap-2">
        {role === "admin" && (
          <>
            <FormModal table="class" type="update" data={item} />
            <FormModal table="class" type="delete" id={item?.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ClassesList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS

  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) continue;
      switch (key) {
        case "supervisorId":
          query.supervisorId = value;
          break;
        case "search":
          query.name = {
            contains: value,
            mode: "insensitive",
          };
          break;
        default:
          break;
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: p * ITEM_PER_PAGE - ITEM_PER_PAGE,
    }),
    prisma.class.count({
      where: query,
    }),
  ]);

  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      <div className="flexicjb">
        <h1 className="hidden text-lg font-semibold md:block">All Classes</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flexic gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="class" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ClassesList;
