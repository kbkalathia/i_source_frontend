import { useState } from "react";
import toast from "react-hot-toast";
import { MAX_COMMENT_LENGTH } from "@/src/utils/constants";

const CommentInput = ({ blogId, addCommentForBlog, refetch }: any) => {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateComment = (comment: string) => {
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return false;
    }
    if (comment.length > MAX_COMMENT_LENGTH) {
      setError(`Comment cannot exceed ${MAX_COMMENT_LENGTH} characters.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateComment(newComment)) return;

    addCommentForBlog(
      { blogId: Number(blogId), comment: newComment.trim() },
      {
        onSuccess: () => {
          toast.success("Comment added successfully!");
          setNewComment("");
          refetch();
        },
      }
    );
  };

  return (
    <div className="flex flex-col bg-gray-900 p-4 rounded-lg">
      <form onSubmit={handleAddComment}>
        <textarea
          rows={3}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            validateComment(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddComment(
                e as unknown as React.FormEvent<HTMLFormElement>
              );
            }
          }}
          className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          disabled={!!error}
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
