import { useQuery } from "@tanstack/react-query";
import { getBlogDetails } from "../services/blogs.service";

export default function useFetchBlogDetails(id: string) {
  return useQuery({
    queryKey: ["blogDetails", id],
    queryFn: () => getBlogDetails(id),
    enabled: !!id,
  });
}
