import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { deleteAttendace, getList, showPost } from '../api';
import { Iattendance } from '../types/Iattendance';
import { useParams } from 'react-router-dom';
import { fileFomat } from './main';
import { IfileFomat, ItableArray } from '../types/IfileFormat';
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
      Header: 'name',
      accessor: '이름',
    },
    {
      Header: 'date',
      accessor: '날짜',
    },
  ];
  const data = [
    {
      결과: 'ㅇㄹㅇㄹ',
      날짜: '34343ㅇㄹㅇ',
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
  } = useTable({
    // @ts-ignore
    columns: columns,
    data: data,
  });
  useEffect(() => {
    if (attendancesId === undefined) return;
    console.log('ㅇㄹㅇㄹㅇ');
    // 여기서 에러 원인은 모름
    showPost(parseInt(attendancesId)).then((data) => {
      // console.log(data);
      setAttendance(data.IfileFomat);
    });
  }, [attendancesId]);

  return (
    <div className="w-full flex flex-col w-full gap-10 items-center p-10">
      <h1 className=" font-bold text-5xl lg:text-7xl font-mono">Attendance book</h1>
      {/* <div className="table">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};
export default AttendanceShow;
