import { useState, useEffect } from "react";
import { INITIAL_PROFILE, INITIAL_PUBLICATIONS, INITIAL_BLOG_POSTS } from "./data";
import { Profile, Publication, BlogPost } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Publications from "./components/Publications";
import Blog from "./components/Blog";

export default function App() {
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [publications, setPublications] = useState<Publication[]>(INITIAL_PUBLICATIONS);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col antialiased">
      {/* Dynamic Navigation */}
      <Header />

      {/* Main Single-View Layout Blocks */}
      <main className="flex-grow">
        {/* Profile Introduction Header */}
        <Hero profile={profile} />

        {/* Typographical Editorial Blog */}
        <Blog posts={posts} />

        {/* Scholarly Publication Timeline */}
        <Publications publications={publications} />
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
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#blog" className="hover:text-white transition-colors">Blog</a>
              <a href="#publications" className="hover:text-white transition-colors">Publications</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
