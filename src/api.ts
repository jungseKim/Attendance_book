import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003",
});

const POST = "/posts";

export const getPost = async () => {
  const response = await api.get(POST);

  return response;
};

export const addPost = async (file: string) => {
  console.log("서옥ㅇ");
  await api.post("Attendance", { 섹스: file });
};
