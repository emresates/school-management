import Image from "next/image";
import React from "react";
import TableSearch from "../_components/TableSearch";
import Pagination from "../_components/Pagination";
import Table from "../_components/Table";
import Link from "next/link";
import { role, resultsData } from "@/app/lib/data";
import FormModal from "@/components/FormModal.tsx";

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: "exam" | "assignment";
  date: string;
  score: number;
};

const columns = [
  {
    header: "Subject",
    accessor: "subject",
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

const ResultsList = () => {
  const renderRow = (item: Result) => (
    <tr
      key={item?.id}
      className="border-grayy-200 border-b text-sm transition-all even:bg-slate-50 hover:bg-purple-100"
    >
      <td className="hidden gap-4 p-4 tablet:table-cell">{item?.subject}</td>
      <td className="hidden tablet:table-cell">{item?.student}</td>
      <td className="hidden tablet:table-cell">{item?.score}</td>
      <td className="hidden tablet:table-cell">{item?.teacher}</td>
      <td className="hidden tablet:table-cell">{item?.class}</td>
      <td className="hidden tablet:table-cell">{item?.date}</td>
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
      <Table columns={columns} renderRow={renderRow} data={resultsData} />
      <Pagination />
    </div>
  );
};

export default ResultsList;
