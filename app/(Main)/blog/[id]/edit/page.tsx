"use client";
import { useParams, useRouter } from "next/navigation";
import useEditBlog from "@/src/hooks/useEditBlog";
import useGetBlog from "@/src/hooks/useFetchBlogDetails";
import { useErrorBoundary } from "react-error-boundary";
import BlogForm from "@/src/components/BlogForm";
import { BlogPost } from "@/src/types/blogs.types";
import toast from "react-hot-toast";

const EditBlog = () => {
  const { id } = useParams();
  const router = useRouter();
  const { showBoundary } = useErrorBoundary();

  const { data: blog, isLoading, error } = useGetBlog(String(id));
  const { mutate: editBlog, isPending } = useEditBlog();

  const handleEditBlog = (data: BlogPost) => {
    editBlog(
      { id: String(id), updatedData: data },
      {
        onSuccess: () => {
          toast.success("Blog updated successfully!");
          router.push("/blogs");
        },
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return showBoundary(error);
  if (!blog) return <p>Blog not found!</p>;

  return (
      <BlogForm
        initialData={blog}
        onSubmit={handleEditBlog}
        isPending={isPending}
      />
  );
};

export default EditBlog;
