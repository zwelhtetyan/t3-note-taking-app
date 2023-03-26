export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
}
