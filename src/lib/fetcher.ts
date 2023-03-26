import { axiosInstance } from "./axiosInstance";

export const fetcher = (url: string) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  axiosInstance.get(url).then((res) => res.data);
