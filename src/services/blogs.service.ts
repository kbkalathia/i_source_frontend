import axios from "axios";
import { API_ROUTES } from "../utils/routes";
import { BlogPost, BlogPayload } from "../types/blogs.types";

export const addBlog = async (payload: BlogPost) => {
  const response = await axios.post(API_ROUTES.ADD_BLOG, payload);
  return response.data;
};

export const deleteBlog = async (id: number) => {
  const response = await axios.delete(`${API_ROUTES.DELETE_BLOG}/${id}`);
  return response.data;
};

export const editBlog = async (payload: BlogPayload) => {
  const { id, updatedData } = payload;
  const response = await axios.put(
    `${API_ROUTES.UPDATE_BLOG}/${id}`,
    updatedData
  );
  return response.data;
};

export const getBlogDetails = async (id: string) => {
  const response = await axios.get(`${API_ROUTES.GET_BLOG_BY_ID}/${id}`);
  return response.data;
};

export const fetchBlogs = async (params: Record<string, any> = {}) => {
  const url = `${API_ROUTES.GET_ALL_BLOGS}?page=${params.page}&limit=${
    params.limit
  }${params.search ? `&search=${params.search}` : ""}`;

  const response = await axios.get(url);
  return response.data;
};
