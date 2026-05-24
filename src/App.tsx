import { useState, useEffect } from "react";
import { INITIAL_PROFILE, INITIAL_BLOG_POSTS } from "./data";
import { Profile, BlogPost } from "./types";
import Header from "./components/Header";
import Blog from "./components/Blog";
import Archive from "./components/Archive";
import Faq from "./components/Faq";
import { Github, Linkedin, GraduationCap, Twitter } from "lucide-react";

type View = 'blog' | 'archive' | 'faq';

export default function App() {
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [view, setView] = useState<View>('blog');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#archive") {
        setView('archive');
      } else if (hash === "#faq") {
        setView('faq');
      } else {
        setView('blog');
      }
    };

    // Listen to hash change events
    window.addEventListener('hashchange', handleHashChange);
    
    // Run initially
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);
  
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col antialiased">
      {/* Dynamic Navigation */}
      <Header activeView={view} />

      {/* Main Single-View Layout Blocks */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {view === 'blog' && (
          <>
            {/* Minimal Welcome Summary (No Photo) */}
            <div className="pt-12 pb-6 md:pt-16 md:pb-8">
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mb-4">
                👋 Welcome to Chung Hoon's Log
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl font-sans">
                Hi, this is Chung Hoon. I'm documenting my learning notes and research in conversational AI, speech recognition, and machine learning. Based on how fluent these posts are, you can tell I write them with a cup of coffee and a little help from AI 😉.
              </p>
              
              {/* Minimal Social Links */}
              <div className="flex items-center gap-4 mt-6">
                {profile.socials.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-400 hover:text-stone-900 transition-colors"
                    title="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {profile.socials.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-400 hover:text-stone-900 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {profile.socials.twitter && (
                  <a
                    href={profile.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-400 hover:text-stone-900 transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                <a
                  href="https://scholar.google.com/citations?user=9vZ82AsAAAAJ&hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="text-stone-400 hover:text-stone-900 transition-colors"
                  title="Google Scholar"
                >
                  <GraduationCap className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Typographical Editorial Blog */}
            <Blog posts={posts} />
          </>
        )}

        {view === 'faq' && (
          /* Q&A Bio FAQ Section */
          <Faq profile={profile} />
        )}

        {view === 'archive' && (
          /* Chronological Archive Section */
          <Archive posts={posts} />
        )}
      </main>

      {/* Structured Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-850 font-sans text-sm mt-auto select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-base tracking-tight text-white">
                CHH
              </span>
              <span className="font-sans text-xs text-stone-500 font-medium border-l border-stone-800 pl-3 tracking-wide uppercase">
                Chung Hoon Hong
              </span>
            </div>
            
            <p className="text-xs text-stone-500 font-medium">
              © 2026 {profile.name}
            </p>

            <div className="flex gap-4 text-xs font-mono">
              <a href="#blog" className="hover:text-white transition-colors">Blog</a>
              <a href="#archive" className="hover:text-white transition-colors">Archive</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>

            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
