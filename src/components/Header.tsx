import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const { data: sessionData } = useSession();
  const { pathname } = useRouter();

  const isCreatePage = pathname === "/new";

  return (
    <div className="navbar bg-accent">
      <div className="mx-auto flex w-full max-w-7xl items-center px-4">
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold normal-case">
            {sessionData?.user
              ? `Note for ${sessionData.user.name}`
              : "Note Taker 📝"}
          </Link>
        </div>

        <div className="flex gap-2">
          {sessionData?.user ? (
            <>
              {!isCreatePage && (
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Search Notes"
                    className="input-bordered input"
                  />
                </div>
              )}

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
                  className="dropdown-content menu menu-compact mt-3 w-52 rounded border border-gray-500 bg-accent p-2 shadow"
                >
                  <li>
                    <a className="justify-between">Profile</a>
                  </li>
                  <li>
                    <Link href="/new">Crate Note</Link>
                  </li>
                  <li onClick={() => signOut()}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <button
              className="btn-secondary btn rounded bg-base-200 hover:bg-neutral-focus"
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
