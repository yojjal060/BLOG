import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { formatDate, calculateReadingTime } from "../utils/helpers";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, deletePost } = useBlog();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const post = slug ? getPostBySlug(slug) : undefined;

  const handleDelete = () => {
    if (post) {
      deletePost(post.id);
      navigate("/");
    }
  };

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);
  const publishDate = post.createdAt
    ? formatDate(new Date(post.createdAt))
    : formatDate(new Date());

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <nav className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </nav>

        {/* Hero Image */}
        {post.image && (
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight flex-1 mr-4">
              {post.title}
            </h1>

            {/* Action Buttons */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => navigate(`/edit-blog/${post.id}`)}
                className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm">{publishDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {readingTime} min read
              </span>

              <span className="flex items-center gap-1">
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
                {post.content.split(" ").length} words
              </span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="mb-12">
          <div className="prose prose-lg prose-gray max-w-4xl mx-auto text-gray-800 leading-relaxed wrap-break-word">
            <div className="whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
              {post.content}
            </div>
          </div>
        </div>

        {/* Share Section */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Share this article</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    navigator.share?.({
                      title: post.title,
                      text: post.content.substring(0, 100) + "...",
                      url: window.location.href,
                    });
                  }}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Share
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Copy Link
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
      />
    </article>
  );
}
