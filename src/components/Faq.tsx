import { motion } from "motion/react";
import { Profile } from "../types";
import { MapPin, Github, Linkedin, HelpCircle } from "lucide-react";

interface FaqProps {
  profile: Profile;
}

export default function Faq({ profile }: FaqProps) {
  const faqs = [
    {
      q: "Who are you?",
      a: (
        <p className="text-stone-605">
          Hi! I am <strong>{profile.name}</strong>. I am currently working as an <strong>{profile.title}</strong>. Previously, I received my M.S. from the University of Michigan, where I led the "Audrey" socialbot project for the Alexa Prize.
        </p>
      ),
    },
    {
      q: "What are your core research interests and areas of expertise?",
      a: (
        <div className="space-y-3 text-stone-605">
          <p>
            My research focuses on <strong>Conversational AI</strong>, speech rescoring, and Natural Language Processing (NLP). I am interested in investigating the boundaries of conversational intelligence, speech recognition, and real-time intelligence.
          </p>
          <div className="pt-2">
            <h4 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              Core Skills & Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-stone-100 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      q: "Where are you located?",
      a: (
        <p className="text-stone-605 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-stone-400" />
          <span>I am based in the <strong>{profile.location}</strong>.</span>
        </p>
      ),
    },
    {
      q: "How can I contact you or follow your work?",
      a: (
        <div className="space-y-2">
          <p className="text-stone-605">
            Feel free to connect with me or follow my updates through any of the platforms below:
          </p>
          <div className="flex items-center gap-3 pt-2">
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 text-xs font-medium transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 text-xs font-medium transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-stone-150 pb-6 mb-10"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2.5">
            <HelpCircle className="h-7 w-7 text-primary/80" />
            Frequently Asked Questions
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            A quick compilation of questions about my background, work, and interests.
          </p>
        </motion.div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="pb-8 border-b border-stone-100 last:border-0 last:pb-0"
            >
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mb-3">
                Q: {faq.q}
              </h3>
              <div className="pl-4 border-l-2 border-primary/20 text-sm sm:text-base leading-relaxed text-stone-600 font-sans">
                {faq.a}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
