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
      const res = await signIn("credentials", { ...user, redirect: false });
      if (res?.ok) {
        return void router.push("/");
      }

      throw new Error(res?.error);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-xs flex-col items-center justify-center">
      <button
        className="btn-primary mb-4 w-full rounded"
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        SignIn with github
      </button>

      <p className="mb-4 text-gray-500">OR</p>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <input
          type="text"
          name="email"
          placeholder="email"
          className="input-primary mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="input-primary mb-2"
        />

        <p className="mb-6 self-start text-sm">
          If you don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>

        <button className="btn-primary w-full rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
