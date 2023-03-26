import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <aside className="w-64 border-r p-2">
      {session?.user ? (
        <>
          <p className="mb-3">This is sidebar</p>
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
