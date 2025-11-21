import { useState, useMemo } from "react";
import type { Post } from "../types/BlogType";

export function useSearch(posts: Post[]) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;

    const search = searchTerm.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search) ||
        post.author.toLowerCase().includes(search)
    );
  }, [posts, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredPosts,
  };
}
