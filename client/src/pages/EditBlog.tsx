import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const { getPostById, updatePost } = useBlog();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postNotFound, setPostNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const post = getPostById(parseInt(id));
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
          image: post.image || "",
        });
      } else {
        setPostNotFound(true);
      }
    }
  }, [id, getPostById]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.author.trim()
    ) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Update post in global state
      updatePost(parseInt(id!), {
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        image: formData.image.trim() || undefined,
      });

      alert("Blog post updated successfully!");

      // Navigate back to the post
      const updatedPost = getPostById(parseInt(id!));
      if (updatedPost) {
        navigate(`/blog/${updatedPost.slug}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (postNotFound) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">
            The blog post you're trying to edit doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
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
            </div>
            <h1 className="text-4xl font-bold font-serif text-gray-900 mb-2">
              Edit Blog Post
            </h1>
            <p className="text-gray-600">Update your thoughts and ideas</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your blog title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image URL (optional)
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                rows={12}
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your blog content here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-vertical"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.content.length} characters
              </p>
            </div>

            {/* Preview Section */}
            {formData.title && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-xl font-bold mb-2">{formData.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    By: {formData.author || "Author Name"}
                  </p>
                  <p className="text-gray-700 line-clamp-3">
                    {formData.content.substring(0, 200)}
                    {formData.content.length > 200 ? "..." : ""}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? "Updating..." : "Update Blog Post"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
