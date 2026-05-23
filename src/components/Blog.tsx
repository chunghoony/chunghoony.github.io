import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, BookOpen, Clock, Calendar, ArrowRight, X, ChevronRight } from "lucide-react";
import { BlogPost } from "../types";

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const readerContentRef = useRef<HTMLDivElement>(null);

  // Filter posts
  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => {
      if (p.published) {
        p.tags.forEach((t) => tags.add(t));
      }
    });
    return ["All", ...Array.from(tags)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (!post.published) return false;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, activeTag]);

  // Handle scroll tracking inside the reader view
  useEffect(() => {
    const handleScroll = () => {
      if (!readerContentRef.current) return;
      const element = readerContentRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(100);
      } else {
        const progress = (element.scrollTop / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    const element = readerContentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [selectedPost]);

  // Rich markdown display parser helper
  const renderMarkdownContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      const trimmed = block.trim();
      
      // Headers
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={i} className="font-serif font-bold text-xl sm:text-2xl text-stone-900 mt-8 mb-4">
            {trimmed.replace("## ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={i} className="font-serif font-bold text-lg text-stone-900 mt-6 mb-3">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }

      // Unordered Lists
      if (trimmed.startsWith("1. ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n");
        return (
          <ul key={i} className="space-y-2.5 my-4 pl-5 list-disc text-stone-600 text-sm sm:text-base leading-relaxed">
            {items.map((item, index) => {
              const cleaned = item.replace(/^(\d+\.\s+|- \s*|\* \s*)/, "");
              return <li key={index}>{cleaned}</li>;
            })}
          </ul>
        );
      }

      // Code blocks
      if (trimmed.startsWith("```")) {
        const codeLines = trimmed.split("\n");
        const lang = codeLines[0].substring(3).trim() || "typescript";
        const code = codeLines.slice(1, -1).join("\n");
        return (
          <div key={i} className="my-6 rounded-xl overflow-hidden border border-stone-800 bg-stone-950 font-mono text-xs sm:text-sm text-stone-300">
            <div className="bg-stone-900 px-4 py-2 border-b border-stone-800 flex justify-between items-center select-none text-stone-400">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">{lang}</span>
              <span className="text-[10px]">Source</span>
            </div>
            <pre className="p-4 overflow-x-auto leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Inline highlights parser helper
      const formatTextWithInlineCodes = (text: string) => {
        const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
        return parts.map((part, pid) => {
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code key={pid} className="px-1.5 py-0.5 bg-primary-light border border-primary/10 text-primary-dark font-mono text-xs rounded font-medium">
                {part.slice(1, -1)}
              </code>
            );
          }
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pid} className="font-bold text-stone-950">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });
      };

      // Standard paragraphs
      return (
        <p key={i} className="text-stone-600 text-sm sm:text-base leading-relaxed my-4 font-sans">
          {formatTextWithInlineCodes(trimmed)}
        </p>
      );
    });
  };

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-stone-50 via-primary-light/10 to-stone-50 border-y border-stone-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {selectedPost ? (
          /* Inline readable article view */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-8 font-sans"
          >
            <div>
              <button
                onClick={() => {
                  setSelectedPost(null);
                  document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors text-xs sm:text-sm font-semibold cursor-pointer group"
              >
                <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
              </button>
            </div>

            {/* Category, Date & Read Time */}
            <div className="flex items-center gap-3.5 text-xs font-mono text-stone-500">
              <span className="px-2.5 py-1 bg-primary-light border border-primary/10 rounded-md font-bold uppercase tracking-wider text-primary">
                {selectedPost.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary/80" />
                <span>{selectedPost.readTime}</span>
              </div>
              <span className="text-stone-300">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-stone-400" />
                <span>{selectedPost.date}</span>
              </div>
            </div>

            {/* Title and Excerpt */}
            <div className="space-y-4 border-b border-stone-150 pb-6">
              <h1 className="font-serif font-extrabold text-3xl sm:text-4.5xl text-stone-900 leading-tight">
                {selectedPost.title}
              </h1>
              <p className="text-stone-600 italic text-base sm:text-lg leading-relaxed font-serif">
                {selectedPost.excerpt}
              </p>
            </div>

            {/* Article Content */}
            <div className="pb-8 prose prose-stone max-w-none">
              {renderMarkdownContent(selectedPost.content)}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone-150">
              <button
                onClick={() => {
                  setSelectedPost(null);
                  document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors text-xs sm:text-sm font-semibold cursor-pointer group"
              >
                <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
              </button>
            </div>
          </motion.div>
        ) : (
          /* Grid post list view */
          <>
            {/* Header Block with Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">Blogs</h2>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/25"
                  />
                </div>

                {/* Tag Selection Row */}
                <div className="flex flex-wrap items-center gap-1 overflow-x-auto max-w-full scrollbar-none py-1">
                  {uniqueTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                        activeTag === tag
                          ? "bg-primary text-white"
                          : "bg-white border border-stone-200 text-stone-600 hover:text-primary hover:bg-primary-light/50"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Post List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedPost(post);
                    setScrollProgress(0);
                    document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex flex-col justify-between bg-white border border-stone-200 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-primary/25 hover:shadow-primary/[0.015] transition-all cursor-pointer relative overflow-hidden"
                >
                  {/* Premium Hover Stripe */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-1 bg-primary-light border border-primary/10 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-stone-400 text-xs font-mono">
                        <Clock className="h-3.5 w-3.5 text-primary/80" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-extrabold text-xl text-stone-900 leading-snug group-hover:text-primary transition-colors mb-2.5">
                      {post.title}
                    </h3>
                    
                    <p className="text-stone-550 text-sm leading-relaxed mb-6 font-serif">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-100 select-none">
                    <span className="text-xs font-mono text-stone-450">{post.date}</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 text-accent" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Empty Search/Filter State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-250">
                <BookOpen className="h-10 w-10 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-600 font-medium font-sans">No blog posts found matching your search.</p>
                <p className="text-stone-400 text-xs mt-1">Try testing other terms, or add and publish custom drafts in the creator pane!</p>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
