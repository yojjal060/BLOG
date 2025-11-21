import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useBlog } from "../context/BlogContext";
import { useSearch } from "../hooks/useSearch";

export default function Home() {
  const navigate = useNavigate();
  const { posts, loading, error } = useBlog();
  const [showAdminMode, setShowAdminMode] = useState(false);

  const { searchTerm, setSearchTerm, filteredPosts } = useSearch(posts);

  const handleCardClick = (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      navigate(`/blog/${post.slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif wrap-break-word">
            Welcome to My Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-serif wrap-break-word">
            Discover articles, tutorials, and insights about Anything
          </p>
        </section>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Search Section */}
        {posts.length > 0 && (
          <section className="mb-8">
            <div className="max-w-2xl mx-auto">
              <input
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Admin Toggle */}
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAdminMode(!showAdminMode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showAdminMode
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {showAdminMode ? "Hide Admin Controls" : "Show Admin Controls"}
              </button>
            </div>

            {/* Search Results Info */}
            <div className="text-center mt-4 text-gray-600">
              {filteredPosts.length !== posts.length && (
                <p>
                  Showing {filteredPosts.length} of {posts.length} articles
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {searchTerm ? "Search Results" : "Latest Posts"}
          </h2>{" "}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <p className="text-gray-500">Loading posts...</p>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg p-8 shadow-md">
                {posts.length === 0 ? (
                  <>
                    <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                    <p className="text-gray-500 mb-4">
                      Be the first to share your thoughts!
                    </p>
                    <a
                      href="/add-blog"
                      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Write First Post
                    </a>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your search terms or filters
                    </p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                      Clear Search
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => handleCardClick(post.id)}
                  showActions={showAdminMode}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
