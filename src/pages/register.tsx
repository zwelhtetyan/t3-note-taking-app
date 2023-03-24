import Link from "next/link";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { axiosInstance } from "~/lib/axiosInstance";

const Register = () => {
  const router = useRouter();

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
    <form className="flex flex-col items-center pt-20" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name"
        className="mb-2 border border-blue-500 p-4"
        name="name"
      />
      <input
        type="text"
        placeholder="email"
        name="email"
        className="mb-2 border border-blue-500 p-4"
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        className="mb-2 border border-blue-500 p-4"
      />

      <p className="mb-3">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400">
          Login
        </Link>
      </p>
      <button className="bg-black p-3 text-white">Register</button>
    </form>
  );
};

export default Register;
