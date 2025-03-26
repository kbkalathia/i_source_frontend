"use client";
import { useParams, useRouter } from "next/navigation";
import { useErrorBoundary } from "react-error-boundary";
import BlogForm from "@/src/components/(Blogs)/BlogForm";
import { BlogPost, BlogPayload } from "@/src/types/blogs.types";
import { useEditBlog, useFetchBlogDetails } from "@/src/hooks/useBlogs.hooks";
import Loader from "@/src/components/Loader";

const EditBlog = () => {
  const { id } = useParams();
  const router = useRouter();
  const { showBoundary } = useErrorBoundary();

  const {
    data: blogDetailsResponse,
    isLoading,
    error,
  } = useFetchBlogDetails(String(id));
  const { mutate: editBlog, isPending } = useEditBlog();

  const blog = blogDetailsResponse?.data;

  const handleEditBlog = (data: BlogPost) => {
    const payload: BlogPayload = { id: String(id), updatedData: data };

    editBlog(payload, {
      onSuccess: () => {
        router.push("/blogs");
      },
    });
  };

  if (isLoading) return <Loader />;
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
