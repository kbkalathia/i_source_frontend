import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "../services/blogs.service";

export default function useDeleteBlog() {
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
