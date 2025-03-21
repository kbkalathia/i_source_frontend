import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBlog } from "../services/blogs.service";

export default function useAddBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs-list"] });
    },
    onError: (error) => {
      console.error("Failed to update blog:", error);
    },
  });
}
