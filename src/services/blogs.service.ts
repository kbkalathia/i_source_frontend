import axios from "axios";
import { API_ROUTES } from "../utils/routes";

export const addBlog = async ({ payload }: { payload: any }) => {
  try {
    await axios.post(API_ROUTES.ADD_BLOG, payload);
  } catch (error) {
    throw new Error("Failed to add blog");
  }
};

export const deleteBlog = async (id: string | number) => {
  try {
    await axios.delete(`${API_ROUTES.DELETE_BLOG}/${id}`);
  } catch (error) {
    throw new Error("Failed to delete blog");
  }
};

export const editBlog = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: any;
}) => {
  try {
    await axios.put(`${API_ROUTES.UPDATE_BLOG}/${id}`, updatedData);
  } catch (error) {
    throw new Error("Failed to update blog");
  }
};

export const getBlogDetails = async (id: string) => {
  try {
    const response = await axios.get(`${API_ROUTES.GET_BLOG_BY_ID}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch blog details");
  }
};

export const fetchBlogs = async (params: Record<string, any> = {}) => {
  try {
    const url = `${API_ROUTES.GET_ALL_BLOGS}?page=${params.page}&limit=${
      params.limit
    }${params.search ? `&search=${params.search}` : ""}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch blogs");
  }
};
