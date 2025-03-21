"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import Image from "next/image";
import { FileUpload } from "primereact/fileupload";
import { BlogPost } from "@/src/types/blogs.types";
import { blogSchema } from "@/src/validators/blog.validator";
import { useEffect, useState } from "react";
import { STATIC_AUTHOR_IMAGE, STATIC_BLOG_IMAGE } from "@/src/utils/constants";

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: BlogPost) => void;
  isPending: boolean;
}

const BlogForm = ({ initialData, onSubmit, isPending }: BlogFormProps) => {
  const [newImage, setNewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogPost>({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      title: "",
      author: "",
      short_description: "",
      description: "",
      blogImage: STATIC_BLOG_IMAGE,
      authorImage: STATIC_AUTHOR_IMAGE,
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("author", initialData.author);
      setValue("short_description", initialData.short_description);
      setValue("description", initialData.description);
      setValue("blogImage", initialData.blogImage || STATIC_BLOG_IMAGE);
      setValue("authorImage", initialData.authorImage || STATIC_AUTHOR_IMAGE);
    }
  }, [initialData, setValue]);

  const handleImageUpload = (e: any) => {
    const file = e.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
      setValue("blogImage", STATIC_BLOG_IMAGE);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      {/* Blog Image Upload */}
      <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-md mb-6">
        <Image
          src={newImage || initialData?.blogImage || STATIC_BLOG_IMAGE}
          alt="Blog Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Image Upload Button */}
      <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800 mb-5">
        <FileUpload
          mode="basic"
          name="demo[]"
          accept="image/*"
          maxFileSize={1000000}
          onUpload={handleImageUpload}
        />
      </button>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        {/* Title */}
        <div>
          <label className="text-gray-700 font-semibold">Title</label>
          <InputText
            {...register("title")}
            className="w-full p-2 border rounded-md mt-2 text-black"
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="flex-grow">
            <label className="text-gray-700 font-semibold">Author</label>
            <InputText
              {...register("author")}
              className="w-full p-2 border rounded-md mt-2 text-black"
            />
            <p className="text-red-500 text-sm">{errors.author?.message}</p>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="text-gray-700 font-semibold">
            Short Description
          </label>
          <InputText
            {...register("short_description")}
            className="w-full p-2 border rounded-md mt-2 text-black"
          />
          <p className="text-red-500 text-sm">
            {errors.short_description?.message}
          </p>
        </div>

        {/* Content */}
        <div>
          <label className="text-gray-700 font-semibold">Content</label>
          <InputTextarea
            {...register("description")}
            rows={6}
            className="w-full p-2 border rounded-md mt-2 text-black"
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            label="Cancel"
            icon="pi pi-times"
            type="button"
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-800"
          />
          <Button
            label={isPending ? "Saving..." : "Save Changes"}
            icon="pi pi-check"
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800"
          />
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
