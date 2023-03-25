import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
