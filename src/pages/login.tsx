import { signIn } from "next-auth/react";
import { FormEvent } from "react";

const login = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email");
    const password = formData.get("password");

    const user = { email, password };

    try {
      await signIn("credentials", { ...user, redirect: false });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center pt-20">
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
      <button className="bg-black p-3 text-white">Login</button>
    </form>
  );
};

export default login;
