import axios from "axios";
import { API_ROUTES } from "../utils/routes";
import { CommentPayload } from "../types/comments.types";

export const fetchCommentsForBlog = async (blogId: number) => {
  const response = await axios.get(`${API_ROUTES.COMMENTS}/${blogId}`);
  return response.data;
};

export const getSpecificCommentDetails = async (commentId: number) => {
  const response = await axios.get(
    `${API_ROUTES.COMMENT_DETAILS}/${commentId}`
  );
  return response.data;
};

export const addCommentForBlog = async (payload: CommentPayload) => {
  const { blogId, content } = payload;
  const response = await axios.post(`${API_ROUTES.COMMENTS}/${blogId}`, {
    content,
  });
  return response.data;
};

export const editCommentOfBlog = async (commentId: number, comment: string) => {
  const response = await axios.put(`${API_ROUTES.COMMENTS}/${commentId}`, {
    content: comment,
  });
  return response.data;
};

export const deleteCommentOfBlog = async (commentId: number) => {
  const response = await axios.delete(`${API_ROUTES.COMMENTS}/${commentId}`);
  return response.data;
};
