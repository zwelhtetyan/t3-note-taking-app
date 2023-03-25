import { useSession } from "next-auth/react";

import Sidebar from "./Sidebar";
import Users from "./Users";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession();

  const user = session?.user;

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
