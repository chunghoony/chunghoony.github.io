import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";
import { BlogPost } from "../types";

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const publishedPosts = useMemo(() => {
    return posts
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts]);

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
    <section id="blog" className="py-10 bg-transparent">
      <div className="w-full">
        
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
          /* Simple single-column post list view */
          <>
            {/* Blog Post List (Single-column layout) */}
            <div className="space-y-8 max-w-3xl">
              {publishedPosts.map((post) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedPost(post);
                    document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex flex-col gap-2 py-6 border-b border-stone-200 last:border-b-0 cursor-pointer"
                >
                  <header>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </header>

                  <section className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans mt-1">
                    <p>{post.excerpt}</p>
                  </section>

                  <footer className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-400 mt-2 select-none">
                    <span>{post.date}</span>
                    <span className="text-stone-300">•</span>
                    <span>{post.readTime}</span>
                    <span className="text-stone-300">•</span>
                    <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-600 rounded font-semibold uppercase tracking-wider text-[9px]">
                      {post.category}
                    </span>
                  </footer>
                </motion.article>
              ))}
            </div>

            {/* Empty State */}
            {publishedPosts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
                <BookOpen className="h-10 w-10 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-600 font-medium font-sans">No blog posts published yet.</p>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
