import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import type { User } from "~/types";
import UserCard from "~/components/UserCard";

const Users = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading } = useSWR("/user/getUsers", fetcher);

  return (
    <aside className="hidden w-80 border-l p-4 dark:border-l-gray-700 lg:block">
      {isLoading && <p>Loading...</p>}
      {(data as User[])?.map((user: User) => (
        <UserCard key={user.id} {...user} />
      ))}
    </aside>
  );
};

export default Users;
