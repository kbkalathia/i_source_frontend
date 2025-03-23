"use client";
import { useEffect, useState } from "react";
import { formatedDate } from "@/src/utils/helpers";
import { useParams } from "next/navigation";
import { useErrorBoundary } from "react-error-boundary";
import {
  useAddComment,
  useDeleteComment,
  useEditComment,
  useFetchCommentsForBlog,
} from "../../hooks/useComments.hook";
import Loader from "../Loader";
import { Comments } from "../../types/comments.types";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentsSection = () => {
  const { id: blogId }: { id: string } = useParams();
  const { showBoundary } = useErrorBoundary();

  const {
    data,
    isLoading,
    error: fetchError,
    refetch,
  } = useFetchCommentsForBlog(parseInt(blogId));

  const { mutate: addCommentForBlog } = useAddComment();
  const { mutate: deleteCommentOfBlog } = useDeleteComment();
  const { mutate: editCommentOfBlog } = useEditComment();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (fetchError) {
    showBoundary(fetchError);
    return null;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">Comments</h2>
      <CommentInput
        blogId={blogId}
        addCommentForBlog={addCommentForBlog}
        refetch={refetch}
      />
      <CommentList
        blogId={blogId}
        comments={data?.comments || []}
        deleteCommentOfBlog={deleteCommentOfBlog}
        editCommentOfBlog={editCommentOfBlog}
        refetch={refetch}
      />
    </div>
  );
};

export default CommentsSection;
