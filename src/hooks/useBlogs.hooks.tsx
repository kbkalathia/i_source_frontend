"use client";
import {
  addBlog,
  deleteBlog,
  editBlog,
  fetchBlogs,
  getBlogDetails,
} from "@/src/services/blogs.service";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useFetchBlogs({
  queryKey,
  params = {},
}: {
  queryKey: string;
  params?: Record<string, any>;
}) {
  return useSuspenseQuery({
    queryKey: [queryKey, params],
    queryFn: () => fetchBlogs(params),
  });
}

export function useFetchBlogDetails(id: string) {
  return useQuery({
    queryKey: ["blogDetails", id],
    queryFn: () => getBlogDetails(id),
    enabled: !!id,
  });
}

export function useAddBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs-list"] });
    },
    onError: (error) => {
      console.error("Failed to add blog:", error);
    },
  });
}

export function useEditBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogDetails"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Failed to update blog:", error);
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs-list"] });
    },
    onError: (error) => {
      console.error("Failed to delete blog:", error);
    },
  });
}
