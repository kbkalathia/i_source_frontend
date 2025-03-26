"use client";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/src/types/blogs.types";
import BlogForm from "@/src/components/(Blogs)/BlogForm";
import { useAddBlog } from "@/src/hooks/useBlogs.hooks";

const AddBlog = () => {
  const router = useRouter();
  const { mutate: addBlog, isPending } = useAddBlog();

  const handleAddBlog = (data: BlogPost) => {
    const payload: BlogPost = data;
    addBlog(payload, {
      onSuccess: () => {
        router.push("/blogs");
      },
    });
  };

  return <BlogForm onSubmit={handleAddBlog} isPending={isPending} />;
};

export default AddBlog;
