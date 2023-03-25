import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

const Users = () => {
  const { data: users, isLoading } = useSWR("/api/user/getUsers", fetcher);

  console.log(users);

  return (
    <aside className="w-80 border-l p-2">
      {isLoading && <p>Loading...</p>}
      {users?.map((user: User) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
    </aside>
  );
};

export default Users;
