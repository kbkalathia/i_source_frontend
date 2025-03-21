export interface BlogPost {
  id?: number;
  title: string;
  short_description: string;
  description: string;
  author: string;
  authorImage: string;
  blogImage: string;
  createdAt?: string;
  updatedAt?: string;
}
