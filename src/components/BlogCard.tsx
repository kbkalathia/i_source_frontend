"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BlogPost } from "../types/blogs.types";
import { formatedDate } from "../utils/helpers";
import useDeleteBlog from "../hooks/useDeleteBlog";
import { STATIC_AUTHOR_IMAGE, STATIC_BLOG_IMAGE } from "../utils/constants";
import toast from "react-hot-toast";

const BlogCard = ({ id, title, description, author, createdAt }: BlogPost) => {
  const router = useRouter();

  const { mutate: deleteBlog } = useDeleteBlog();

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/blog/${id}/edit`);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteBlog(Number(id));
    toast.success("Blog deleted successfully");
  };

  return (
    <div
      onClick={() => router.push(`/blog/${id}`)}
      className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200 ease-out transform hover:scale-105 cursor-pointer overflow-hidden"
    >
      {/* Blog Image */}
      <div className="relative w-full h-56">
        <Image
          src={STATIC_BLOG_IMAGE}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 flex-grow">
        {/* Author & Date */}
        <div className="flex items-center justify-between text-gray-600 text-sm">
          <div className="flex items-center gap-3">
            <Image
              src={STATIC_AUTHOR_IMAGE}
              alt={author}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>{author}</span>
          </div>
          {createdAt && (
            <span className="text-xs">{formatedDate(createdAt)}</span>
          )}
        </div>

        {/* Blog Title */}
        <h2 className="text-lg font-semibold text-gray-900 mt-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-700 text-sm mt-1 line-clamp-2">{description}</p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          {/* Read More Button */}
          <button
            onClick={() => router.push(`/blog/${id}`)}
            className="py-2 px-4 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-all cursor-pointer"
          >
            Read More
          </button>

          {/* Edit & Delete Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleEditClick}
              className="py-2 px-3 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-all cursor-pointer"
            >
              ✏️
            </button>
            <button
              onClick={handleDeleteClick}
              className="py-2 px-3 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-all cursor-pointer"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
