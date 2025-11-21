import { useState, useEffect, useMemo } from "react";
import type { Post } from "../types/BlogType";

interface UseSearchProps {
  posts: Post[];
  searchFields?: (keyof Post)[];
  debounceMs?: number;
}

export function useSearch({
  posts,
  searchFields = ["title", "content", "author"],
  debounceMs = 300,
}: UseSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Get unique authors for filter dropdown
  const authors = useMemo(() => {
    const uniqueAuthors = [...new Set(posts.map((post) => post.author))];
    return uniqueAuthors.sort();
  }, [posts]);

  // Filter posts based on search term and selected author
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by author if selected
    if (selectedAuthor) {
      filtered = filtered.filter((post) => post.author === selectedAuthor);
    }

    // Filter by search term if provided
    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter((post) =>
        searchFields.some((field) => {
          const value = post[field];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(searchLower)
          );
        })
      );
    }

    return filtered;
  }, [posts, debouncedSearchTerm, selectedAuthor, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    selectedAuthor,
    setSelectedAuthor,
    authors,
    filteredPosts,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
}
