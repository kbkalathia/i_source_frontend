import axios from "axios";
import { API_ROUTES } from "../utils/routes";

export const fetchCommentsForBlog = async (blogId: number) => {
  try {
    const response = await axios.get(`${API_ROUTES.COMMENTS}/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch comments");
  }
};

export const getSpecificCommentDetails = async (commentId: number) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.COMMENT_DETAILS}/${commentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch comment details");
  }
};

export const addCommentForBlog = async (blogId: number, comment: string) => {
  try {
    const response = await axios.post(`${API_ROUTES.COMMENTS}/${blogId}`, {
      content: comment,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add comment");
  }
};

export const editCommentOfBlog = async (commentId: number, comment: string) => {
  try {
    const response = await axios.put(`${API_ROUTES.COMMENTS}/${commentId}`, {
      content: comment,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to edit comment");
  }
};

export const deleteCommentOfBlog = async (commentId: number) => {
  try {
    const response = await axios.delete(`${API_ROUTES.COMMENTS}/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete comments");
  }
};
