import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BlogPost } from "../types";

interface ArchiveProps {
  posts: BlogPost[];
}

interface MonthGroup {
  month: string;
  posts: BlogPost[];
}

interface YearGroup {
  year: string;
  posts: BlogPost[];
  months: MonthGroup[];
}

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });

function getPostDate(post: BlogPost) {
  return new Date(post.date);
}

function renderMarkdownContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    const trimmed = block.trim();

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

    return (
      <p key={i} className="text-stone-600 text-sm sm:text-base leading-relaxed my-4 font-sans">
        {formatTextWithInlineCodes(trimmed)}
      </p>
    );
  });
}

export default function Archive({ posts }: ArchiveProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const groupedPosts = useMemo<YearGroup[]>(() => {
    const publishedPosts = posts
      .filter((post) => post.published)
      .sort((a, b) => getPostDate(b).getTime() - getPostDate(a).getTime());

    const years = new Map<string, Map<string, BlogPost[]>>();

    publishedPosts.forEach((post) => {
      const date = getPostDate(post);
      const year = String(date.getFullYear());
      const month = monthFormatter.format(date);

      if (!years.has(year)) {
        years.set(year, new Map<string, BlogPost[]>());
      }

      const months = years.get(year);
      if (!months?.has(month)) {
        months?.set(month, []);
      }

      months?.get(month)?.push(post);
    });

    return Array.from(years.entries()).map(([year, months]) => {
      const monthGroups = Array.from(months.entries()).map(([month, monthPosts]) => ({
        month,
        posts: monthPosts,
      }));

      return {
        year,
        posts: monthGroups.flatMap((group) => group.posts),
        months: monthGroups,
      };
    });
  }, [posts]);

  return (
    <section id="archive" className="py-12 md:py-16 bg-transparent">
      {selectedPost ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl space-y-8 font-sans"
        >
          <div>
            <button
              onClick={() => {
                setSelectedPost(null);
                document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors text-xs sm:text-sm font-semibold cursor-pointer group"
            >
              <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Archive
            </button>
          </div>

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

          <div className="space-y-4 border-b border-stone-150 pb-6">
            <h1 className="font-serif font-extrabold text-3xl sm:text-4.5xl text-stone-900 leading-tight">
              {selectedPost.title}
            </h1>
            <p className="text-stone-600 italic text-base sm:text-lg leading-relaxed font-serif">
              {selectedPost.excerpt}
            </p>
          </div>

          <div className="pb-8 prose prose-stone max-w-none">
            {renderMarkdownContent(selectedPost.content)}
          </div>
        </motion.div>
      ) : (
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mb-10">
            Archive
          </h1>

          <div className="space-y-12">
            {groupedPosts.map((yearGroup) => (
              <section key={yearGroup.year} className="space-y-6">
                <h2 className="flex items-baseline gap-2 font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  <span>{yearGroup.year}</span>
                  <span className="font-mono text-xs text-stone-400 font-medium">
                    ({yearGroup.posts.length})
                  </span>
                </h2>

                <div className="space-y-8">
                  {yearGroup.months.map((monthGroup) => (
                    <section key={`${yearGroup.year}-${monthGroup.month}`} className="space-y-3">
                      <h3 className="flex items-baseline gap-2 font-serif text-xl font-semibold text-stone-800">
                        <span>{monthGroup.month}</span>
                        <span className="font-mono text-xs text-stone-400 font-medium">
                          ({monthGroup.posts.length})
                        </span>
                      </h3>

                      <div className="space-y-3">
                        {monthGroup.posts.map((post) => (
                          <article key={post.id} className="group border-b border-stone-200 pb-3 last:border-b-0">
                            <button
                              onClick={() => {
                                setSelectedPost(post);
                                document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="text-left font-serif font-bold text-lg text-stone-900 group-hover:text-stone-600 transition-colors cursor-pointer"
                            >
                              {post.title}
                            </button>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-mono text-stone-400">
                              <span>{post.date}</span>
                              <span className="text-stone-300">•</span>
                              <span>{post.readTime}</span>
                              <span className="text-stone-300">•</span>
                              <span>{post.category}</span>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
