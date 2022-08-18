import { useEffect } from "react";
import { getList } from "../api";

const Attendances = () => {
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="w-full flex flex-col w-full gap-10 items-center p-10">
      <h1 className=" font-bold text-5xl lg:text-7xl font-mono">
        Attendance book
      </h1>
      <div className="w-full gir gird">
        <div className="mt-5 flex flex-col gap-2  w-2/3 lg:w-1/2 mx-auto ">
          <div
            style={{ background: "#F0C292" }}
            className="flex justify-between rounded-xl p-2  w-full"
          >
            <h1 className="p-3 font-semibold text-base lg:text-xl  text-center">
              Name
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-xl text-center">
              created_at
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-xl text-center">
              sex
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-xl text-center">
              Status
            </h1>
          </div>

          <div
            style={{ background: "#F0C292" }}
            className="flex justify-between  w-full rounded-xl p-2 pt-4 pb-4"
          >
            <h1 className="p-3 font-semibold text-base lg:text-lg  text-center">
              Name
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-lg text-center">
              created_at
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-lg text-center">
              sex
            </h1>
            <h1 className="p-3 font-semibold text-base lg:text-lg text-center">
              Status
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Attendances;
