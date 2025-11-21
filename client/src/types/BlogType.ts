export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  slug: string;
  createdAt?: string;
}
