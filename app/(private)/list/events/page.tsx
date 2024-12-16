import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role, eventsData } from "@/app/lib/data";

type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
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
    header: "Start Time",
    accessor: "startTime",
    className: "hidden tablet:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden tablet:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const EventsList = () => {
  const renderRow = (item: Event) => (
    <tr
      key={item?.id}
      className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
    >
      <td className="hidden gap-4 p-4 tablet:table-cell">{item?.title}</td>
      <td className="hidden tablet:table-cell">{item?.class}</td>
      <td className="hidden tablet:table-cell">{item?.date}</td>
      <td className="hidden tablet:table-cell">{item?.startTime}</td>
      <td className="hidden tablet:table-cell">{item?.endTime}</td>
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
        <h1 className="hidden text-lg font-semibold md:block">All Events</h1>
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
      <Table columns={columns} renderRow={renderRow} data={eventsData} />
      <Pagination />
    </div>
  );
};

export default EventsList;
