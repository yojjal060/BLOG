import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { formatDate, calculateReadingTime } from "../utils/helpers";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function BlogPost() {
  const { slug } = useParams();
  const { getPostBySlug, deletePost } = useBlog();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">This post doesn't exist.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      });
    } else {
      copyToClipboard();
    }
  };

  const readingTime = calculateReadingTime(post.content);
  const publishDate = formatDate(new Date(post.createdAt || Date.now()));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="text-blue-600 mb-8"
        >
          ← Back
        </button>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold mr-4">{post.title}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit-blog/${post.id}`)}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-3 py-2 text-sm bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-600 mb-8 pb-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {post.author[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-sm">{publishDate}</p>
            </div>
          </div>
          <span className="text-sm">{readingTime} min read</span>
        </div>

        <div className="mb-12">
          <div className="text-lg leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold mb-2">Share this post</h3>
              <div className="flex gap-4">
                <button onClick={sharePost} className="text-blue-600">
                  Share
                </button>
                <button onClick={copyToClipboard} className="text-blue-600">
                  Copy Link
                </button>
              </div>
            </div>
            <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">
              More Posts
            </Link>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message={`Delete "${post.title}"? This can't be undone.`}
      />
    </div>
  );
}