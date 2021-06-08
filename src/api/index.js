import { demoApi } from "./config";

export const fetchAllData = () =>
    demoApi.get(`/rest/v2/all`);

export const fetchSearchData = (name) =>
    demoApi.get(`/rest/v2/name/${name}`);