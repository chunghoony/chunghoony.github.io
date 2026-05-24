import { motion } from "motion/react";

interface HeaderProps {
  activeView: 'blog' | 'archive' | 'faq';
}

export default function Header({ activeView }: HeaderProps) {

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-stone-150">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        {/* Logo and Name */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <a href="#blog" className="flex items-center gap-3 group">
            <span className="font-serif font-bold text-lg tracking-tight text-stone-900 group-hover:text-primary transition-colors">
              CHH
            </span>
            <span className="font-sans text-xs text-stone-500 font-medium border-l border-stone-200 pl-3 tracking-wide uppercase group-hover:text-primary transition-colors">
              Chung Hoon Hong
            </span>
          </a>
        </motion.div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-4 font-sans text-sm font-medium">
          <nav className="hidden sm:flex items-center gap-6 text-stone-600">
            <a 
              href="#blog" 
              className={`hover:text-primary transition-colors ${activeView === 'blog' ? 'text-primary font-bold' : ''}`}
            >
              Blog
            </a>
            <a
              href="#archive"
              className={`hover:text-primary transition-colors ${activeView === 'archive' ? 'text-primary font-bold' : ''}`}
            >
              Archive
            </a>
            <a 
              href="#faq" 
              className={`hover:text-primary transition-colors ${activeView === 'faq' ? 'text-primary font-bold' : ''}`}
            >
              FAQ
            </a>

          </nav>
        </div>
      </div>
    </header>
  );
}
