import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import type { User } from "~/types";
import UserCard from "~/components/UserCard";

const Users = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading } = useSWR("/user/getUsers", fetcher);

  return (
    <aside className="w-80 border-l p-2">
      {isLoading && <p>Loading...</p>}
      {(data as User[])?.map((user: User) => (
        <UserCard key={user.id} {...user} />
      ))}
    </aside>
  );
};

export default Users;
