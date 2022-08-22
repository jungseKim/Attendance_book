import { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import { deleteAttendace, getList, showPost } from "../api";
import { Iattendance } from "../types/Iattendance";
import { useParams } from "react-router-dom";
import { fileFomat } from "./main";
import { IfileFomat, ItableArray } from "../types/IfileFormat";
const AttendanceShow = () => {
  const [attendance, setAttendance] = useState<IfileFomat[] | []>([]);
  const [temp, setTemp] = useState<ItableArray[] | []>([]);
  const { attendancesId } = useParams();
  // const columns = [
  //   {
  //     Header: 'name',
  //     accessor: '이름',
  //   },
  //   {
  //     Header: 'date',
  //     accessor: '날짜',
  //   },
  //   {
  //     Header: 'result',
  //     accessor: '결과',
  //   },
  //   {
  //     Header: 'ajffl',
  //     accessor: '기관명',
  //   },
  //   {
  //     Header: 'birthday',
  //     accessor: '생년월일',
  //   },
  //   {
  //     Header: 'bhh',
  //     accessor: '입력방식',
  //   },
  //   {
  //     Header: 'zone in ',
  //     accessor: '입실',
  //   },
  //   {
  //     Header: 'dfdfdgdas',
  //     accessor: '진행상태',
  //   },
  //   {
  //     Header: 'conntueri',
  //     accessor: '취업국가',
  //   },
  //   {
  //     Header: 'accesdsafddcer',
  //     accessor: '퇴실',
  //   },
  //   {
  //     Header: 'dfdfdsffdg',
  //     accessor: '연수기간',
  //   },
  // ];
  const columns = [
    {
      Header: "name",
      accessor: "이름",
    },
    {
      Header: "date",
      accessor: "날짜",
    },
  ];
  const data = [
    {
      이름: "ㅇㄹㅇㄹ",
      날짜: "34343ㅇㄹㅇ",
    },
    {
      이름: "ㅇㄹㅇㄹ",
      날짜: "34343ㅇㄹㅇ",
    },
  ];
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
    state,
    prepareRow,
    rows,
  } = useTable(
    {
      // @ts-ignore
      columns: columns,
      data: data,
    },
    useSortBy
  );
  useEffect(() => {
    if (attendancesId === undefined) return;
    console.log("ㅇㄹㅇㄹㅇ");
    // 여기서 에러 원인은 모름
    // showPost(parseInt(attendancesId)).then((data) => {
    //   // console.log(data);
    //   setAttendance(data.IfileFomat);
    // });
  }, []);

  useEffect(() => {
    console.log(headerGroups, getTableBodyProps());
  }, [headerGroups, getTableBodyProps]);
  return (
    <div className="w-full flex flex-col w-full gap-10 items-center p-10">
      <h1 className=" font-bold text-5xl lg:text-7xl font-mono">
        Attendance book
      </h1>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
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
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttendanceShow;
