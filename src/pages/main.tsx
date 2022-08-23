import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addPost } from "../api";
import { IfileFomat } from "../types/IfileFormat";
import FileInput from "./fileInput";
import { useRoutes } from "react-router-dom";
export interface fileFomat {
  file: IfileFomat[];
  rows: number;
}

const Main = (props: any) => {
  const [newFile, setNewFile] = useState<fileFomat | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const clearFile = () => {
    setNewFile(null);
  };
  const creatAttendance = async () => {
    if (newFile === null) {
      return alert("file define");
    }
    if (typeof title !== "string") {
      return alert("title define");
    }
    const rsp = await addPost(title, newFile);
    if (rsp) {
      return (window.location.href = "/Attendances");
    }
    alert("파일 양식이 다릅니다.");
  };
  const inputOftitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };
  return (
    <div className=" m-auto">
      <div className=" flex flex-col w-full ">
        <h1 className="font-bold text-5xl lg:text-7xl font-mono">
          Attendance book
        </h1>
        <p className="text-end font-semibold mb-10">
          Youngjin University Beacon
        </p>

        {newFile !== null ? (
          <div className="flex items center gap-2">
            <input
              onChange={inputOftitle}
              id="default"
              type="text"
              name="default"
              placeholder="book name"
              className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />

            <button
              onClick={creatAttendance}
              type="button"
              className="w-1/4 lg:text-xl border border-green-500 bg-green-500 text-white rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
            <button
              onClick={clearFile}
              type="button"
              className="w-1/4 lg:text-xl  border border-red-500 bg-red-500 text-white rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
            >
              cancle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-12 justify-between ">
            <FileInput setNewFile={setNewFile} />
            <Link
              to="/Attendances"
              style={{ backgroundColor: "#FEE2CB" }}
              className="w-full sm:w-auto px-9 py-4 mb-4 
            text-center
            text-base lg:text-2xl font-semibold rounded-xl border-pink-200 focus:ring-gray-900 text-purple-700"
            >
              Saved
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Main;
