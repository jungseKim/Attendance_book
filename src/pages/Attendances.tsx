import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAttendace, getList } from "../api";
import Atttendance from "../components/attendances";
import { Iattendance } from "../types/Iattendance";

const Attendances = () => {
  const [attendances, setAttendances] = useState<Iattendance[] | []>([]);
  useEffect(() => {
    getList().then((data) => {
      // console.log(data);
      setAttendances(data);
    });
  }, []);

  const deleteAtt = (id: number) => {
    deleteAttendace(id);
    setAttendances(
      attendances.filter((el) => {
        return el.id !== id;
      })
    );
  };
  return (
    <div className="w-full flex flex-col w-full gap-10 items-center p-10">
      <Link to="/">
        <h1 className=" font-bold text-5xl lg:text-7xl font-mono">
          Attendance book
        </h1>
      </Link>
      <div className="w-full gir gird">
        <div className="mt-5 flex flex-col gap-2  w-full lg:w-2/3 mx-auto ">
          <div
            style={{ background: "#F0C292" }}
            className="flex justify-between rounded-xl text-center p-2  w-full "
          >
            <h1 className="p-3 font-semibold text-base lg:text-xl  text-center">
              Name
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-xl text-center ">
              start &nbsp;&nbsp;
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-xl text-center ">
              &nbsp;&nbsp;end&nbsp;&nbsp;
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-xl text-center ">
              count
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-xl text-center">
              created_at
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-xl text-center">
              Status
            </h1>
          </div>
          {/* 시작 날짜 끝날짜 맞추자
          
           */}
          {attendances.length > 0 &&
            attendances.map((att) => {
              return (
                <Atttendance
                  key={att.id}
                  attendace={att}
                  deleteAtt={deleteAtt}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Attendances;
