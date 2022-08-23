import { fileFomat } from "./pages/main";
import axios from "axios";
import { Iattendance } from "./types/Iattendance";
import { timeFomat } from "./components/attendances";
import { IfileFomat, Ifileshowformat } from "./types/IfileFormat";

const api = axios.create({
  baseURL: "http://localhost:3003",
});

// const POST = '/posts';

export const getPost = async () => {
  const response = await api.get("/");

  return response;
};
export const getList = async (): Promise<Iattendance[] | []> => {
  const response = await api.get("/Attendances");
  return response.data;
};

export const addPost = async (title: string, file: fileFomat) => {
  let maxTime = new Date(2022, 1, 1);
  let minTime = new Date(2022, 12, 31);

  //여기서 바꿔주기
  try {
    let id_chek = 0;
    const csss = file.file.map((el) => {
      const temp = el["날짜"].split("/").map((el) => {
        return parseInt(el);
      });
      const comparisonDate = new Date(
        parseInt(`20${temp[2]}`),
        temp[0],
        temp[1]
      );

      if (maxTime < comparisonDate) {
        maxTime = comparisonDate;
      }
      if (minTime > comparisonDate) {
        minTime = comparisonDate;
      }
      el["날짜"] = `${temp[2]}/${temp[0]}/${temp[1]}`;

      el["id"] = id_chek;
      id_chek = id_chek + 1;
      return el;
    });
    const attendance = {
      start: timeFomat(minTime),
      end: timeFomat(maxTime),
      title: title,
      created_at: Date.now(),
      rows: file.rows,
    };

    const rsp = await api.post("/Attendances", attendance);
    const { id } = rsp.data;
    await api.post("/files", { id: id, file: csss });
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteAttendace = async (
  id: number
): Promise<number | boolean> => {
  const response = await api.delete("/Attendances/" + id);
  await api.delete("/files/" + id);
  if (response.status === 200) {
    return id;
  } else {
    return false;
  }
};

export const showPost = async (id: number): Promise<Ifileshowformat> => {
  const response = await api.get("/files/" + id);

  return response.data;
};

export const deleteAttendanceCell = async (
  id: number,
  cellId: number
): Promise<number> => {
  const rsp = await api.get("/files/" + id);

  const { data } = rsp;
  const { file } = data as Ifileshowformat;

  const newFile = file.filter((cell) => {
    return cell.id != cellId;
  });
  const response = await api.put("/files/" + id, { id: id, file: newFile });

  return response.status;
};
