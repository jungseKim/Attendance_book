import { useEffect, useState } from "react";
import FileInput from "./fileInput";

const Main = () => {
  const [newFile, setNewFile] = useState<string | null>(null);
  useEffect(() => {
    console.log(newFile);
  }, [newFile]);
  const clearFile = () => {
    setNewFile(null);
  };
  return (
    <div className=" flex flex-col w-full  ">
      <h1 className="font-bold text-5xl lg:text-7xl font-mono">
        Attendance book
      </h1>
      <p className="text-end font-semibold mb-10">Youngjin University Beacon</p>

      {newFile !== null ? (
        <div className="flex items center gap-2">
          <input
            id="default"
            type="text"
            name="default"
            placeholder="book name"
            className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <button
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
          <button
            style={{ backgroundColor: "#FEE2CB" }}
            className="w-full sm:w-auto px-9 py-4 mb-4 
            text-base lg:text-2xl font-semibold rounded-xl border-pink-200 focus:ring-gray-900 text-purple-700"
          >
            Saved
          </button>
        </div>
      )}
    </div>
  );
};
export default Main;
