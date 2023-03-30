import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <aside className="hidden w-64 border-r p-4 dark:border-r-gray-700 lg:block">
      {session?.user ? (
        <>
          <p className="mb-3">
            Welcome <span className="font-semibold">{session.user.name}</span>
          </p>
          <button onClick={() => signOut()} className="btn-primary w-full">
            logout
          </button>
        </>
      ) : (
        <div className="flex flex-col space-y-3">
          <Link href="/login" className="btn-primary">
            Login
          </Link>
          <Link href="/register" className="btn-primary">
            Register
          </Link>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
