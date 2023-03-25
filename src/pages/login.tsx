import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent, useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      void router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email");
    const password = formData.get("password");

    const user = { email, password };

    try {
      await signIn("credentials", { ...user, redirect: false });
      await router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <button
        className="mb-6 rounded bg-black p-3 text-white"
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        SignIn with github
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          name="email"
          placeholder="email"
          className="mb-2 border border-blue-500 p-4"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="mb-2 border border-blue-500 p-4"
        />

        <p className="mb-3">
          If you don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-400">
            Register
          </Link>
        </p>

        <button className="bg-black p-3 text-white">Login</button>
      </form>
    </div>
  );
};

export default Login;
