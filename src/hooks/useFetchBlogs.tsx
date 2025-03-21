import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../services/blogs.service";

export default function useFetchBlogs({
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
