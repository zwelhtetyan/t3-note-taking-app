const login = () => {
  return (
    <form className="flex flex-col items-center pt-20">
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
    </form>
  );
};

export default login;
