interface Post {
  id: number;
  title: string;
  content?: string;
  publish?: boolean;
}

const getPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${process.env.BASE_URL}/api/post`);
  const posts = await res.json();
  return posts;
};

export default async function Home() {
  const allPosts = await getPosts();

  return (
    <main>
      <h1 className='text-lg mb-5'>Hello from home page</h1>

      {allPosts.map(({ id, title }) => (
        <h2 key={id} className='text-blue-700'>
          {title}
        </h2>
      ))}
    </main>
  );
}
