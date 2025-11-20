import type { Post } from "../types/BlogType";

interface BlogCardProps {
  post: Post;
  onClick?: () => void;
}

export default function BlogCard({ post, onClick }: BlogCardProps) {

    // truncate to 150 char
    const truncatedContent = post.content.length > 150 
    ? post.content.substring(0, 150) + "..." 
    : post.content;

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-48 w-full bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm text-gray-500 font-medium">Article</p>
            </div>
          </div>
        )}
        
        {/* Reading time badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h2>

        {/* Content Preview */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {truncatedContent}
        </p>

        {/* Author */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900">{post.author}</p>
          </div>
        </div>

        {/* Read More Link */}
        <div className="mt-4">
          <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
            Read article
            <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}