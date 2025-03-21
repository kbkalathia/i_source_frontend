import axios from "axios";
import { API_ROUTES } from "../utils/routes";

export const addBlog = async ({ payload }: { payload: any }) => {
  await axios.post(API_ROUTES.ADD_BLOG, payload);
};

export const deleteBlog = async (id: string | number) => {
  await axios.delete(`${API_ROUTES.DELETE_BLOG}/${id}`);
};

export const editBlog = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: any;
}) => {
  await axios.put(`${API_ROUTES.UPDATE_BLOG}/${id}`, updatedData);
};

export const getBlogDetails = async (id: string) => {
  const response = await axios.get(`${API_ROUTES.GET_BLOG_BY_ID}/${id}`);
  return response.data;
};

export const fetchBlogs = async (params: Record<string, any> = {}) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.GET_ALL_BLOGS}?page=${params.page}&limit=${params.limit}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
