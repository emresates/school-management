import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role, subjectsData } from "@/app/lib/data";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const SubjectsList = () => {
  const renderRow = (item: Subject) => (
    <tr
      key={item?.id}
      className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
    >
      <td className="flexic gap-2 p-2">
        <div className="flex flex-col">
          <h3 className="text-md-semibold">{item?.name}</h3>
        </div>
      </td>
      <td className="hidden tablet:table-cell">{item?.teachers.join(",")}</td>
      <td>
        <div className="flexic gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="flexicjc h-7 w-7 rounded-full bg-blue-200">
              <Image src="/images/edit.png" alt="" width={14} height={14} />
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
        <h1 className="hidden text-lg font-semibold md:block">All Subjects</h1>
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
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />
      <Pagination />
    </div>
  );
};

export default SubjectsList;
