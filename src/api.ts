import { fileFomat } from "./pages/main";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003",
});

const POST = "/posts";

export const getPost = async () => {
  const response = await api.get("/");

  return response;
};
export const getList = async () => {
  const response = await api.get("/Attendances");

  console.log(response.data);

  return response;
};

export const addPost = async (title: string, file: fileFomat) => {
  console.log("성공");
  const attendance = {
    list: file.file,
    created_at: new Date(),
    rows: file.rows,
  };
  await api.patch("Attendances", { [title]: attendance });
};
