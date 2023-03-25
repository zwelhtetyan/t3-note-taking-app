import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import defaultAvatar from "~/assets/images/default_profile.webp";

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
        <div key={user.id} className="flex items-center">
          <Image
            height={100}
            width={100}
            src={user.image || defaultAvatar}
            alt="user profile"
            className="mr-2 h-10 w-10 rounded-full"
          />
          <p className="text-lg font-semibold">{user.name}</p>
        </div>
      ))}
    </aside>
  );
};

export default Users;
