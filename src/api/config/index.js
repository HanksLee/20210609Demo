import axios from "axios";

const TIMEOUT = 10000;
export const demoApi = axios.create({
  baseURL: `https://restcountries.eu`,
  timeout: TIMEOUT,
  responseType: "json",
});