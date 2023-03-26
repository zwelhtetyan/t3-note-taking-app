import Image from "next/image";
import defaultAvatar from "~/assets/images/default_profile.webp";
import type { User } from "~/types";

const UserCard = ({ ...user }: User) => {
  return (
    <div className="mb-3 flex items-center">
      <Image
        height={100}
        width={100}
        src={user.image || defaultAvatar}
        alt="user profile"
        className="mr-2 h-10 w-10 rounded-full"
      />
      <p className="text-lg font-semibold">{user.name}</p>
    </div>
  );
};

export default UserCard;
