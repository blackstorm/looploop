import axios from "axios";

const INSTANCE = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

export const add = (data) => {
  return INSTANCE.post("", data);
};
