import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role, teachersData } from "@/app/lib/data";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  adress: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Adress",
    accessor: "adress",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const TeachersList = () => {
  const renderRow = (item: Teacher) => (
    <tr
      key={item?.id}
      className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
    >
      <td className="flexic gap-2 p-2">
        <Image
          src={item.photo}
          alt={item.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover tablet:hidden desktop:block"
        />
        <div className="flex flex-col">
          <h3 className="text-md-semibold">{item?.name}</h3>
          <h4 className="text-xs-regular text-gray-500">{item?.email}</h4>
        </div>
      </td>
      <td className="hidden tablet:table-cell">{item?.teacherId}</td>
      <td className="hidden tablet:table-cell">{item?.subjects?.join(", ")}</td>
      <td className="hidden tablet:table-cell">{item?.classes?.join(", ")}</td>
      <td className="hidden tablet:table-cell">{item?.phone}</td>
      <td className="hidden tablet:table-cell">{item?.adress}</td>
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
        <h1 className="hidden text-lg font-semibold md:block">All Teachers</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flexic gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/sort.png" alt="" width={14} height={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200">
              <Image src="/images/plus.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={teachersData} />
      <Pagination />
    </div>
  );
};

export default TeachersList;
