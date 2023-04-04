import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-accent">
      <div className="mx-auto flex w-full max-w-7xl items-center">
        <div className="flex-1">
          <a className="text-xl font-bold normal-case">
            {sessionData?.user
              ? `Note for ${sessionData.user.name}`
              : "Note Taker"}
          </a>
        </div>

        <div className="flex gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input-bordered input"
            />
          </div>

          {sessionData?.user ? (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-10 rounded-full">
                  <Image
                    src={sessionData?.user.image ?? ""}
                    width={100}
                    height={100}
                    alt="user profile"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-accent p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={() => signOut()}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn-accent btn-active btn bg-neutral"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
