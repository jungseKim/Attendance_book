import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  deleteAttendace,
  deleteAttendanceCell,
  getList,
  showPost,
} from "../api";
import { Iattendance } from "../types/Iattendance";
import { Link, useParams } from "react-router-dom";
import { fileFomat } from "./main";
import { IfileFomat, ItableArray } from "../types/IfileFormat";
import Search from "./serarch";

const AttendanceShow = () => {
  const [attendance, setAttendance] = useState<IfileFomat[] | []>([]);
  // const [temp, setTemp] = useState<ItableArray[] | []>([]);
  const { attendancesId } = useParams();
  const initialState = { hiddenColumns: ["id"] };
  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "name",
        accessor: "이름",
      },
      {
        Header: "date",
        accessor: "날짜",
      },

      {
        Header: "state",
        accessor: "진행상태",
      },
      {
        Header: "result",
        accessor: "결과",
        Cell: StatusPill,
      },
      {
        Header: "start",
        accessor: "입실",
      },
      {
        Header: "end",
        accessor: "퇴실",
      },
      {
        Header: "method",
        accessor: "입력방식",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize },
    prepareRow,

    setGlobalFilter,
    setFilter,
  } = useTable(
    {
      // @ts-ignore
      columns: columns,
      data: attendance,
      initialState,
    },

    useGlobalFilter,

    useSortBy,
    usePagination
  );
  const deleteCell = (id: any) => {
    console.log(id);
  };
  const deleteCell2 = useCallback(
    async (id: number) => {
      if (!attendancesId) {
        return;
      }
      const rspCode = await deleteAttendanceCell(parseInt(attendancesId), id);
      console.log(id);
      if (rspCode === 200) {
        const newAtt = attendance.filter((cell) => {
          return cell.id != id;
        });
        setAttendance(newAtt);
        return alert("삭제되었습니다");
      }
    },
    [attendance, attendancesId]
  );
  useEffect(() => {
    if (attendancesId === undefined) return;

    showPost(parseInt(attendancesId)).then((data) => {
      console.log(data);
      setAttendance(data.file);
    });
  }, [attendancesId]);

  // useEffect(() => {
  //   console.log(headerGroups, getTableBodyProps(), "Dsds");
  // }, []);
  const temp = (fdf: any) => {
    console.log(fdf);
  };
  return (
    <div className="w-full flex flex-col w-full gap-10 items-center p-19">
      <Link to="/">
        <h1 className=" font-bold text-5xl lg:text-7xl font-mono">
          Attendance book
        </h1>
      </Link>
      <div className="mt-2 flex flex-col ">
        <div className="flex justify-between">
          <Search onSubmit={setGlobalFilter} />
          <div className="flex items-center">
            <div className="w-8 h-4 bg-green-400 text-center"></div>
            <span>지각</span>
            <div className="ml-4 w-8 h-4 bg-yellow-400 "></div>
            <span>결석</span>
          </div>
        </div>
        <div className="mt-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="px-6 py-3  text-xs bg-gray-400 text-gray-100 lg:text-lg font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          {/* Add a sort direction indicator */}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ▼"
                                : " ▲"
                              : ""}
                          </span>
                        </th>
                      ))}
                      <th
                        scope="col"
                        className="px-6 py-3  text-xs bg-gray-400 text-gray-100 lg:text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ACTION
                      </th>
                    </tr>
                  ))}
                </thead>

                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 text-center py-2 text-sm lg:text-base whitespace-nowrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                        <td className="flex flex-col items-center py-3 ">
                          {/* <div className="flex justify-between p-1 text-sm lg:text-base whitespace-nowrap"> */}
                          <button
                            className="text-sm lg:text-base border border-red-500 bg-red-500 text-white rounded-md pl-2 pr-2 pt-1 pb-1 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                            // onClick={() => deleteCell2(row["id"])}
                            onClick={() =>
                              deleteCell2(
                                row.cells[parseInt(row["id"])].row.values["id"]
                              )
                            }
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Previous
                  </button>
                  <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex gap-x-2">
                    <span className="flex  items-center text-sm font-bold lg:text-base text-gray-700 pl-2">
                      Page &nbsp;{" "}
                      <span className="font-medium">{pageIndex + 1}</span>
                      &nbsp; of&nbsp;&nbsp;
                      <span className="font-medium">{pageOptions.length}</span>
                    </span>
                    <select
                      className="text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                      }}
                    >
                      {[4, 8, 10].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md"
                      >
                        {"<<"}
                        {/* <span className="sr-only">First</span> */}
                      </button>
                      <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className=" font-bold px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-teal-400 hover:text-white"
                      >
                        {"<"}
                        {/* <span className="sr-only">Previous</span> */}
                      </button>
                      <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="font-bold px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-teal-400 hover:text-white"
                      >
                        {">"}
                      </button>
                      <button
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-teal-400 hover:text-white"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                      >
                        {">>"}
                        {/* <span className="sr-only">Last</span> */}
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttendanceShow;

export function StatusPill({ value }: { value: any }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={`  px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm
         : "bg-green-400 text-green-700"
        }
        ${
          status.startsWith("◎")
            ? "bg-green-400 text-green-700"
            : "bg-yellow-400 text-yellow-700"
        }`}
    >
      {status}
    </span>
  );
}
