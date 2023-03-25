import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <aside className="w-64 border-r p-2">
      {session?.user ? (
        <>
          <p className="mb-3">This is sidebar</p>
          <button
            onClick={() => signOut()}
            className="rounded bg-black p-2 text-white"
          >
            logout
          </button>
        </>
      ) : (
        <div className="flex space-x-3 text-blue-500">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
