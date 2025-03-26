"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/src/components/Loader";
import { useErrorBoundary } from "react-error-boundary";
import { formatedDate } from "@/src/utils/helpers";
import { STATIC_AUTHOR_IMAGE } from "@/src/utils/constants";
import CommentsSection from "@/src/components/(Comments)/CommentsSection";
import { useFetchBlogDetails } from "@/src/hooks/useBlogs.hooks";

const BlogDetails = () => {
  const { showBoundary } = useErrorBoundary();
  const { id } = useParams();
  const router = useRouter();

  const {
    data: blogDetailsResponse,
    isLoading,
    error,
  } = useFetchBlogDetails(String(id));

  if (isLoading) return <Loader />;
  if (error) showBoundary(error);

  const blogDetails = blogDetailsResponse?.data || {};

  if (!blogDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-white">Blog Not Found..!!</h1>
        <button
          onClick={() => router.back()}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      {/* Back Button */}
      <div className="flex justify-between">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline mb-4 cursor-pointer"
        >
          ← Back to Blogs
        </button>
        <button
          onClick={() => router.push(`/blog/${id}/edit`)}
          className="text-blue-600 hover:underline mb-4 cursor-pointer"
        >
          Edit
        </button>
      </div>

      {/* Blog Header */}
      <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-md">
        <Image
          src={blogDetails.blogImage}
          alt={blogDetails.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Blog Title */}
      <h1 className="text-2xl sm:text-4xl font-bold mt-4">
        {blogDetails.title}
      </h1>

      {/* Author Info */}
      <div className="flex items-center gap-3 mt-4">
        <Image
          src={STATIC_AUTHOR_IMAGE}
          alt={blogDetails.author}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <p className="text-gray-700 font-semibold text-white">
            {blogDetails.author}
          </p>
          <p className="text-sm text-gray-500">
            {formatedDate(blogDetails.createdAt)}
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="mt-6 text-gray-800 leading-7 text-md sm:text-lg">
        <p className="text-white">{blogDetails.short_description}</p>
        <p className="mt-4 text-white">{blogDetails.description}</p>
      </div>

      {/* Comments Section */}
      <CommentsSection />
    </div>
  );
};

export default BlogDetails;
