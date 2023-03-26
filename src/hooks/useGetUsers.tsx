import type { AxiosError } from "axios";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import type { Post } from "~/types";

const useGetUsers = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, error, mutate } = useSWR("/posts", fetcher, {
    refreshInterval: 3000,
  });

  return {
    data: data as Post[],
    isLoading,
    error: error as AxiosError,
    mutate,
  };
};

export default useGetUsers;
