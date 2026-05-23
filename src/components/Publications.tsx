import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, FileText, Clipboard, Check, Filter, Search, ChevronDown, ChevronUp, Link as LinkIcon, Code } from "lucide-react";
import { Publication } from "../types";

interface PublicationsProps {
  publications: Publication[];
}

export default function Publications({ publications }: PublicationsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAbstract, setExpandedAbstract] = useState<Record<string, boolean>>({});
  const [expandedBibtex, setExpandedBibtex] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic calculation of unique publication categories (Journal, Conference, Workshop, Preprint, etc.)
  const categories = useMemo(() => {
    const list = new Set(publications.map((p) => p.category));
    return ["All", ...Array.from(list)];
  }, [publications]);

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchesCategory = activeCategory === "All" || pub.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [publications, activeCategory, searchTerm]);

  const toggleAbstract = (id: string) => {
    setExpandedAbstract((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBibtex = (id: string) => {
    setExpandedBibtex((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyBibtex = (id: string, text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="publications" className="py-20 bg-white border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Headings */}
        <div className="border-b border-stone-150 pb-8 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Publications
          </h2>

          {/* Search and Categories Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-8 gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by publication variables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/25"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl w-fit">
              <div className="flex items-center gap-1 text-stone-500 px-2 py-1 text-[11px] font-mono font-medium">
                <Filter className="h-3 w-3" />
                <span>Scope:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-950 hover:bg-stone-200/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bibliographical List */}
        <div className="space-y-10">
          {filteredPublications.map((pub, idx) => {
            const isAbstractOpen = !!expandedAbstract[pub.id];
            const isBibtexOpen = !!expandedBibtex[pub.id];
            const hasCopied = copiedId === pub.id;

            return (
              <motion.article
                layout="position"
                key={pub.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative pb-10 border-b border-stone-100 last:border-b-0 space-y-3 font-sans"
              >
                {/* Peer index counter */}
                <div className="absolute -left-4 sm:-left-8 top-1 hidden sm:flex h-6 w-6 items-center justify-center rounded-full bg-primary-light border border-primary/20 text-primary font-mono text-[10px] select-none font-extrabold shadow-sm">
                  [{publications.length - idx}]
                </div>

                {/* Badges / Venue Row */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-primary-light text-primary font-bold uppercase rounded text-[9px] tracking-wider border border-primary/10">
                    {pub.category}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-705 font-bold">{pub.venue}</span>
                  <span className="text-stone-400">•</span>
                  <span className="text-primary font-semibold">{pub.year}</span>
                </div>

                {/* Paper Title (Serif/Scholarly) */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-950 leading-snug">
                  {pub.title}
                </h3>

                {/* Authors (Highlighting own name with beautiful primary branding) */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
                  {pub.authors.split(", ").map((author, index, arr) => {
                    const isOwnName = author.includes("Hong");
                    return (
                      <span key={author}>
                        <span className={isOwnName ? "font-bold text-primary underline decoration-accent underline-offset-2 decoration-2" : ""}>
                          {author}
                        </span>
                        {index < arr.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
                </p>

                {/* DOI representations */}
                {pub.doi && (
                  <div className="text-[11px] text-stone-500 font-mono flex items-center gap-1 leading-none select-none">
                    <span className="font-semibold text-primary">DOI:</span>
                    <a 
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:text-primary-dark hover:underline font-semibold"
                    >
                      {pub.doi}
                    </a>
                  </div>
                )}

                {/* Scholarly Actionable Details Toolbar */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
                  {pub.abstract && (
                    <button
                      onClick={() => toggleAbstract(pub.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light/70 border border-accent/20 hover:bg-accent-light rounded-lg text-accent-dark font-semibold select-none cursor-pointer transition-colors"
                    >
                      <span>{isAbstractOpen ? "Close Abstract" : "View Abstract"}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isAbstractOpen ? "rotate-180" : ""}`} />
                    </button>
                  )}

                  {pub.bibtex && (
                    <button
                      onClick={() => toggleBibtex(pub.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-light/60 border border-primary/25 hover:bg-primary-light rounded-lg text-primary font-semibold select-none cursor-pointer transition-colors"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-primary" />
                      <span>{isBibtexOpen ? "Close Citation" : "Cite"}</span>
                    </button>
                  )}

                  {pub.paperUrl && (
                    <a
                      href={pub.paperUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium cursor-pointer transition-colors shadow-sm active:scale-[0.98]"
                    >
                      <FileText className="h-3.5 w-3.5 text-accent-light" />
                      Manuscript PDF
                    </a>
                  )}

                  {pub.codeUrl && (
                    <a
                      href={pub.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-accent/20 bg-accent-light/20 hover:bg-accent-light/50 rounded-lg text-accent-dark font-medium cursor-pointer transition-all"
                    >
                      <Code className="h-3.5 w-3.5 text-accent-dark/80" />
                      Code Repository
                    </a>
                  )}
                </div>

                {/* Expandable Blocks */}
                <AnimatePresence>
                  {isAbstractOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-accent-light/25 border border-accent/15 rounded-xl"
                    >
                      <div className="p-4 sm:p-5 text-stone-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif">
                        <strong className="block text-[11px] font-mono text-accent-dark uppercase tracking-wider mb-2 select-none">ABSTRACT_RESEARCH_STATEMENT</strong>
                        {pub.abstract}
                      </div>
                    </motion.div>
                  )}

                  {isBibtexOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden border border-primary/20 rounded-xl shadow-md"
                    >
                      <div className="bg-stone-950 font-mono text-xs text-stone-300 relative">
                        <div className="bg-primary-dark border-b border-primary/30 px-4 py-2 flex items-center justify-between select-none p-1.5">
                          <span className="text-[10px] font-bold tracking-wider text-primary-light">BIBTEX CITATION CITATION FORMAT</span>
                          <button
                            onClick={() => copyBibtex(pub.id, pub.bibtex)}
                            className="inline-flex items-center gap-1 h-7 px-2.5 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] cursor-pointer"
                          >
                            {hasCopied ? (
                              <>
                                <Check className="h-3 w-3 text-green-455" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Clipboard className="h-3 w-3 text-stone-300" />
                                Copy BibTeX
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto leading-relaxed scrollbar-none max-h-56 select-all font-mono">
                          <code>{pub.bibtex}</code>
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.article>
            );
          })}
        </div>

        {/* Empty state citation */}
        {filteredPublications.length === 0 && (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-150">
            <BookOpen className="h-10 w-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-600 font-medium font-sans">No research publications match your criteria.</p>
            <p className="text-stone-400 text-xs mt-1">Refine your active filters, or add records directly using the admin customizer toolbar.</p>
          </div>
        )}

      </div>
    </section>
  );
}
