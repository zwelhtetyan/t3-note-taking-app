import Sidebar from "./Sidebar";
import Users from "./Users";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <Sidebar />
      <main className="flex-1 p-2 lg:p-4">{children}</main>
      <Users />
    </div>
  );
};

export default Layout;
