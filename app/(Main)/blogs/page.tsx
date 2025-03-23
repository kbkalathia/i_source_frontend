"use client";
import Loader from "@/src/components/Loader";
import { useErrorBoundary } from "react-error-boundary";
import { BlogPost } from "@/src/types/blogs.types";
import { useEffect, useState } from "react";
import Pagination from "@/src/components/Pagination";
import Link from "next/link";
import SearchBox from "@/src/components/SearchBox";
import { useFetchBlogs } from "@/src/hooks/useBlogs.hooks";
import BlogCard from "@/src/components/(Blogs)/BlogCard";

const BlogsPage = () => {
  const { showBoundary } = useErrorBoundary();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  const { data, isLoading, error, refetch } = useFetchBlogs({
    queryKey: "blogs-list",
    params: { page, limit, search: searchQuery },
  });

  useEffect(() => {
    refetch();
  }, [page, searchQuery, refetch]);

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
        {/* Heading */}
        <h1 className="text-2xl font-bold text-white">Blogs</h1>

        {/* Search Box */}
        <div className="flex justify-center items-center gap-3.5">
          <SearchBox handleSearch={setSearchQuery} />
        </div>

        {/* Add Blog Button */}
        <Link
          href="/blog/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all"
        >
          + Add Blog
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {data.blogs.length > 0 ? (
          data.blogs.map((blog: BlogPost) => (
            <div
              key={blog.id}
              className="w-full sm:w-[48%] lg:w-[30%] xl:w-[23%]"
            >
              <BlogCard {...blog} />
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No blogs found</p>
        )}
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
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
