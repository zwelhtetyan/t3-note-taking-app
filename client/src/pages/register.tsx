import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent, useEffect } from "react";
import { axiosInstance } from "~/lib/axiosInstance";

const Register = () => {
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

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const user = { name, email, password };

    try {
      await axiosInstance.post("/user/register", user);

      await router.push("/login");

      // await signIn("credentials", { email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="mx-auto flex min-h-screen max-w-xs flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="name"
        className="input-primary mb-4"
        name="name"
      />
      <input
        type="text"
        placeholder="email"
        name="email"
        className="input-primary mb-4"
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        className="input-primary mb-2"
      />

      <p className="mb-6 self-start text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400">
          Login
        </Link>
      </p>
      <button className="btn-primary w-full rounded">Register</button>
    </form>
  );
};

export default Register;
