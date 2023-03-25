import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    if (!(session || status === "loading")) {
      void router.push("/login");
    }
  }, [session, status, router]);

  console.log(user);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-2">
        {user ? (
          <p>This is sidebar</p>
        ) : (
          <div className="flex space-x-3 text-blue-500">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </aside>
      <main className="flex-1 p-2">{children}</main>
      <aside className="w-80 border-l p-2">users</aside>
    </div>
  );
};

export default Layout;
