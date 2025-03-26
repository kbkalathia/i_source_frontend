"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useErrorBoundary } from "react-error-boundary";
import { useFetchCommentsForBlog } from "../../hooks/useComments.hook";
import Loader from "../Loader";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentsSection = () => {
  const { id: blogId }: { id: string } = useParams();
  const { showBoundary } = useErrorBoundary();

  const {
    data: commentsListResponse,
    isLoading,
    error: fetchError,
    refetch,
  } = useFetchCommentsForBlog(parseInt(blogId));

  const comments = commentsListResponse?.data?.comments || [];

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
      <CommentInput blogId={blogId} refetch={refetch} />
      <CommentList blogId={blogId} comments={comments} refetch={refetch} />
    </div>
  );
};

export default CommentsSection;
