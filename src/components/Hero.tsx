import { motion } from "motion/react";
import { MapPin, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Profile } from "../types";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section id="about" className="py-16 md:py-24 bg-white overflow-hidden border-b border-stone-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main profile content */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 w-fit"
            >
              <MapPin className="h-3.5 w-3.5 text-stone-400" />
              <span>{profile.location}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-stone-900 leading-relaxed font-sans max-w-2xl text-base"
            >
              {profile.bio}
            </motion.p>

            {/* Social Grid and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#publications"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-primary hover:border-primary hover:bg-primary-light/30 transition-all cursor-pointer shadow-sm group active:scale-[0.98] font-medium text-sm"
              >
                View Publications
                <ArrowRight className="h-4 w-4 text-stone-400 group-hover:translate-x-1 group-hover:text-primary transition-all" />
              </a>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {profile.socials.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-primary hover:border-primary hover:bg-primary-light/30 transition-all shadow-sm"
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
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-indigo-700 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all shadow-sm"
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
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-sky-650 hover:border-sky-500 hover:bg-sky-50/50 transition-all shadow-sm"
                    title="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Hard skills representation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-6 border-t border-stone-150"
            >
              <h3 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <span
                      key={skill + index}
                      className={`px-3 py-1 rounded-lg text-xs font-medium tracking-tight transition-all border ${
                        isEven
                          ? "bg-primary-light/85 border-primary/10 text-primary-dark hover:bg-primary-light"
                          : "bg-accent-light/85 border-accent/10 text-accent-dark hover:bg-accent-light"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Large custom graphic / Profile Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72"
            >
              <div className="absolute inset-0 bg-stone-100 rounded-xl overflow-hidden border border-stone-200 shadow-sm">
                {profile.avatar && profile.avatar.trim() !== "" ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top transition-all duration-700 ease-in-out hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center bg-stone-50 p-8 text-stone-600">
                    <span className="font-serif font-bold text-7xl mb-4 tracking-tighter text-stone-400">
                      {profile.name.substring(0, 2).toUpperCase()}
                    </span>
                    <p className="font-mono text-xs text-stone-550 tracking-wide text-center">
                      {profile.title}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
