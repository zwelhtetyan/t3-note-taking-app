import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Users from "./Users";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  // useEffect(() => {
  //   if (!(session || status === "loading")) {
  //     void router.push("/login");
  //   }
  // }, [session, status, router]);

  console.log(user);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-2">{children}</main>
      <Users />
    </div>
  );
};

export default Layout;
