import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role, eventsData } from "@/app/lib/data";
import FormModal from "@/components/FormModal.tsx";
import { Class, Event, Prisma } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { ITEM_PER_PAGE } from "@/app/lib/settings";

type EventList = Event & { class: Class };

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

const renderRow = (item: EventList) => (
  <tr
    key={item?.id}
    className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
  >
    <td className="hidden gap-4 p-4 tablet:table-cell">{item?.title}</td>
    <td className="hidden tablet:table-cell">{item?.class.name}</td>
    <td className="hidden tablet:table-cell">
      {new Intl.DateTimeFormat("en-us").format(item?.startTime)}
    </td>
    <td className="hidden tablet:table-cell">
      {item?.startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td className="hidden tablet:table-cell">
      {item?.endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td>
      <div className="flexic gap-2">
        {role === "admin" && (
          <>
            <FormModal table="event" type="update" data={item} />
            <FormModal table="event" type="delete" id={item?.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const EventsList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS

  const query: Prisma.EventWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) continue;
      switch (key) {
        case "search":
          query.title = {
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
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: p * ITEM_PER_PAGE - ITEM_PER_PAGE,
    }),
    prisma.event.count({
      where: query,
    }),
  ]);

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
            {role === "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default EventsList;
