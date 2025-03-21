"use client";
import BlogCard from "@/src/components/BlogCard";
import Loader from "@/src/components/Loader";
import { useErrorBoundary } from "react-error-boundary";
import { BlogPost } from "@/src/types/blogs.types";
import { useEffect, useState } from "react";
import Pagination from "@/src/components/Pagination";
import Link from "next/link";
import useFetchBlogs from "@/src/hooks/useFetchBlogs";

const BlogsPage = () => {
  const { showBoundary } = useErrorBoundary();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error, refetch } = useFetchBlogs({
    queryKey: "blogs-list",
    params: { page, limit },
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    showBoundary(error);
  }

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Blogs</h1>
        <Link
          href="/blog/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all"
        >
          + Add Blog
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {data.blogs.map((blog: BlogPost) => (
          <div
            key={blog.id}
            className="w-full sm:w-[48%] lg:w-[30%] xl:w-[23%]"
          >
            <BlogCard {...blog} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {data.totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default BlogsPage;
