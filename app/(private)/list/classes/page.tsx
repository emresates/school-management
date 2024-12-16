import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role, classesData } from "@/app/lib/data";

type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

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

const ClassesList = () => {
  const renderRow = (item: Class) => (
    <tr
      key={item?.id}
      className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
    >
      <td className="hidden gap-4 p-4 tablet:table-cell">{item?.name}</td>
      <td className="hidden tablet:table-cell">{item?.capacity}</td>
      <td className="hidden tablet:table-cell">{item?.grade}</td>
      <td className="hidden tablet:table-cell">{item?.supervisor}</td>
      <td>
        <div className="flexic gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="flexicjc h-7 w-7 rounded-full bg-yellow-200">
              <Image src="/images/view.png" alt="" width={14} height={14} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="flexicjc h-7 w-7 rounded-full bg-red-200">
              <Image src="/images/delete.png" alt="" width={14} height={14} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

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
            {role === "admin" && (
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
                <Image src="/images/plus.png" alt="" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={classesData} />
      <Pagination />
    </div>
  );
};

export default ClassesList;
