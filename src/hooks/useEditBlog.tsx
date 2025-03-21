import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBlog } from "../services/blogs.service";

export default function useEditBlog() {
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
