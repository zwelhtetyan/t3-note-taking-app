import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    console.log("hi");

    if (!(session || status === "loading")) {
      void router.push("/login");
    }
  }, [session, status, router]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello {user?.name || "World"}</h1>

        {user && (
          <button
            onClick={() => signOut()}
            className="rounded bg-black p-2 text-white"
          >
            logout
          </button>
        )}

        <div className="mt-5 flex space-x-3 text-blue-500">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </main>
    </>
  );
};

export default Home;
