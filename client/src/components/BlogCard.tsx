import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types/BlogType";
import { useBlog } from "../context/BlogContext";
import ConfirmModal from "./ui/ConfirmModal";

interface BlogCardProps {
  post: Post;
  onClick?: () => void;
  showActions?: boolean;
}

export default function BlogCard({
  post,
  onClick,
  showActions = false,
}: BlogCardProps) {
  const navigate = useNavigate();
  const { deletePost } = useBlog();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // truncate to 150 char
  const truncatedContent =
    post.content.length > 150
      ? post.content.substring(0, 150) + "..."
      : post.content;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-blog/${post.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deletePost(post.id);
    setShowDeleteModal(false);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/blog/${post.slug}`);
    }
  };

  return (
    <>
      <article
        onClick={handleCardClick}
        className="cursor-pointer bg-white rounded-lg shadow border border-gray-200"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}

          {/* Action Buttons */}
          {showActions && (
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Reading time badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
              {Math.ceil(post.content.split(" ").length / 200) || 1} min
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600">
            {post.title}
          </h2>

          {/* Content Preview */}
          <p className="text-gray-600 text-sm mb-4">{truncatedContent}</p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Author */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">
                  {post.author[0].toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900">{post.author}</p>
            </div>
          </div>

          {/* Read More Link */}
          <div className="mt-3">
            <span className="text-sm text-blue-600 hover:text-blue-700">
              Read more →
            </span>
          </div>
        </div>
      </article>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Post"
        message={`Delete "${post.title}"? This can't be undone.`}
      />
    </>
  );
}
