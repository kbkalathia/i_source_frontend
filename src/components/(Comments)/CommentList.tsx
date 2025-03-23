import { useState } from "react";
import toast from "react-hot-toast";
import { formatedDate } from "@/src/utils/helpers";
import { MAX_COMMENT_LENGTH } from "@/src/utils/constants";
import { Comments } from "@/src/types/comments.types";

const CommentList = ({
  blogId,
  comments,
  deleteCommentOfBlog,
  editCommentOfBlog,
  refetch,
}: any) => {
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateEditComment = (comment: string) => {
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

  const handleEditComment = (commentId: number, content: string) => {
    setEditCommentId(commentId);
    setEditText(content);
    setError(null);
  };

  const handleSaveEdit = (commentId: number) => {
    if (!validateEditComment(editText)) return;

    editCommentOfBlog(
      { commentId, updatedComment: editText.trim() },
      {
        onSuccess: () => {
          toast.success("Comment edited successfully!");
          setEditCommentId(null);
          setEditText("");
          refetch();
        },
      }
    );
  };

  return (
    <div className="mt-6">
      {comments.length > 0 ? (
        comments.map((comment: Comments) => (
          <div key={comment.id} className="bg-gray-900 p-4 rounded-lg mt-3">
            {editCommentId === comment.id ? (
              <div className="flex flex-col">
                <textarea
                  rows={3}
                  value={editText}
                  onChange={(e) => {
                    setEditText(e.target.value);
                    validateEditComment(e.target.value);
                  }}
                  className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="flex justify-end mt-2 gap-2">
                  <button
                    onClick={() => handleSaveEdit(comment.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 cursor-pointer"
                    disabled={!!error}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditCommentId(null)}
                    className="bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-white">{comment.content}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatedDate(comment.createdAt)}
                </p>
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    onClick={() =>
                      handleEditComment(comment.id, comment.content)
                    }
                    className="text-yellow-400 hover:text-yellow-500 text-sm cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      deleteCommentOfBlog(
                        { blogId: Number(blogId), commentId: comment.id }, // Pass blogId here
                        { onSuccess: refetch }
                      )
                    }
                    className="text-red-500 hover:text-red-600 text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;
