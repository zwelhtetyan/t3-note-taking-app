import { useSession } from "next-auth/react";
import { ChildrenProp } from "~/types";

const Layout = ({ children }: ChildrenProp) => {
  const { data: sessionData } = useSession();

  if (!sessionData?.user) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] w-full justify-center pt-60">
        You must login to take note.
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-3 gap-10">{children}</div>
  );
};

export default Layout;
