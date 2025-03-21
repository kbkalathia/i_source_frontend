"use client";
import { useRouter } from "next/navigation";
import useAddBlog from "@/src/hooks/useAddBlog";
import { BlogPost } from "@/src/types/blogs.types";
import BlogForm from "@/src/components/BlogForm";
import toast from "react-hot-toast";

const AddBlog = () => {
  const router = useRouter();
  const { mutate: addBlog, isPending } = useAddBlog();

  const handleAddBlog = (data: BlogPost) => {
    addBlog(
      { payload: data },
      {
        onSuccess: () => {
          toast.success("Blog added successfully!");
          router.push("/blogs");
        },
      }
    );
  };

  return <BlogForm onSubmit={handleAddBlog} isPending={isPending} />;
};

export default AddBlog;
