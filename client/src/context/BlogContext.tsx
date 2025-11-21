import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Post } from "../types/BlogType";
import { generateSlug } from "../utils/helpers";

interface BlogContextType {
  posts: Post[];
  addPost: (post: Omit<Post, "id" | "slug" | "createdAt">) => void;
  updatePost: (
    id: number,
    post: Omit<Post, "id" | "slug" | "createdAt">
  ) => void;
  getPostById: (id: number) => Post | undefined;
  getPostBySlug: (slug: string) => Post | undefined;
  deletePost: (id: number) => void;
  loading: boolean;
  error: string | null;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_KEY = "blog_posts";

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load posts from localStorage on mount
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem(STORAGE_KEY);
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
      }
    } catch (err) {
      setError("Failed to load saved posts");
      console.error("Error loading posts from localStorage:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      } catch (err) {
        setError("Failed to save posts");
        console.error("Error saving posts to localStorage:", err);
      }
    }
  }, [posts, loading]);

  const addPost = (postData: Omit<Post, "id" | "slug" | "createdAt">) => {
    try {
      const newPost: Post = {
        ...postData,
        id: Date.now(), // Generate unique ID based on timestamp
        slug: generateSlug(postData.title),
        createdAt: new Date().toISOString(),
      };
      setPosts((prev) => [newPost, ...prev]); // Add new post at the beginning
      setError(null);
    } catch (err) {
      setError("Failed to add post");
      console.error("Error adding post:", err);
    }
  };

  const updatePost = (
    id: number,
    postData: Omit<Post, "id" | "slug" | "createdAt">
  ) => {
    try {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                ...postData,
                slug: generateSlug(postData.title), // Regenerate slug if title changed
              }
            : post
        )
      );
      setError(null);
    } catch (err) {
      setError("Failed to update post");
      console.error("Error updating post:", err);
    }
  };

  const deletePost = (id: number) => {
    try {
      setPosts((prev) => prev.filter((post) => post.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete post");
      console.error("Error deleting post:", err);
    }
  };

  const getPostById = (id: number) => {
    return posts.find((post) => post.id === id);
  };

  const getPostBySlug = (slug: string) => {
    return posts.find((post) => post.slug === slug);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        getPostById,
        getPostBySlug,
        deletePost,
        loading,
        error,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within BlogProvider");
  }
  return context;
}
