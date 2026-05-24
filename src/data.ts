import { Profile, Publication, BlogPost } from "./types";
import avatarImg from "./1.png";

export const INITIAL_PROFILE: Profile = {
  name: "Chung Hoon Hong",
  title: "Applied Scientist, Amazon Alexa AI",
  tagline: "Investigating the boundaries of conversational intelligence, speech recognition, and real-time intelligence.",
  bio: "I am an Applied Scientist at Amazon Alexa AI. My research focuses on Conversational AI, speech rescoring, and NLP. Investigating the boundaries of conversational intelligence, speech recognition, and real-time intelligence. Previously, I received my M.S. from University of Michigan, where I led the 'Audrey' socialbot project for the Alexa Prize.",
  avatar: avatarImg,
  location: "SF Bay Area, CA",
  skills: [
    "Conversational AI",
    "Speech Recognition (ASR)",
    "Natural Language Processing (NLP)",
    "Machine Learning",
    "Speech Rescoring",
    "Large Language Models (LLMs)",
    "Data Science",
    "Systems Alignment"
  ],
  socials: {
    github: "https://github.com/chunghoony",
    linkedin: "https://www.linkedin.com/in/chunghoon-hong",
    twitter: "https://x.com/hoony",
    email: ""
  }
};

export const INITIAL_PUBLICATIONS: Publication[] = [
  {
    id: "record-deduplication-asr",
    title: "Record Deduplication for Entity Distribution Modeling in ASR Transcripts",
    authors: "Tianyu Huang, Chung Hoon Hong, Carl Wivagg, Kanna Shimizu",
    venue: "INTERSPEECH 2023",
    year: "2023",
    abstract: "This paper addresses challenges in modeling entity distributions from Automatic Speech Recognition (ASR) transcripts by utilizing record deduplication techniques. We show this approach improves contextual biasing performance in speech interfaces without requiring frequent model retraining.",
    bibtex: `@inproceedings{huang2023record,
  title={Record Deduplication for Entity Distribution Modeling in ASR Transcripts},
  author={Huang, Tianyu and Hong, Chung Hoon and Wivagg, Carl and Shimizu, Kanna},
  booktitle={Proceedings of the 24th Annual Conference of the International Speech Communication Association (INTERSPEECH)},
  pages={1498--1502},
  year={2023}
}`,
    paperUrl: "https://arxiv.org/abs/2306.06246",
    category: "Conference",
    tags: ["ASR Transcripts", "Entity Modeling", "Deduplication"],
    featured: true
  },
  {
    id: "audrey-socialbot",
    title: "Audrey: A Personalized Open-Domain Conversational Bot",
    authors: "Chung Hoon Hong, Yuan Liang, Sagnik Sinha Roy, Arushi Jain, Vihang Agarwal, Ryan Draves, Zhizhuo Zhou, William Chen, Yujian Liu, Martha Miracky, Lily Ge, Nikola Banovic, David Jurgens",
    venue: "Alexa Prize Socialbot Grand Challenge 3 Proceedings",
    year: "2020",
    abstract: "This paper describes the University of Michigan's submission to the Alexa Prize Grand Challenge 3. The socialbot, 'Audrey,' is designed to engage users on informational, personal, and relational levels using socially-aware models.",
    bibtex: `@article{hong2020audrey,
  title={Audrey: A Personalized Open-Domain Conversational Bot},
  author={Hong, Chung Hoon and Liang, Yuan and Roy, Sagnik Sinha and Jain, Arushi and Agarwal, Vihang and Draves, Ryan and Zhou, Zhizhuo and Chen, William and Liu, Yujian and Miracky, Martha and others},
  journal={Alexa Prize Socialbot Grand Challenge 3 Proceedings},
  year={2020}
}`,
    paperUrl: "https://arxiv.org/abs/2011.05910",
    category: "Conference",
    tags: ["Conversational AI", "Dialogue Systems", "Alexa Prize"],
    featured: true
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "hello-world",
    title: "Hello World",
    excerpt: "Welcome to my new academic portfolio and blog.",
    content: "Welcome! This is my first post. Stay tuned for future write-ups on my research in conversational AI, speech recognition (ASR), and machine learning.",
    category: "General",
    tags: ["Intro"],
    readTime: "1 min read",
    date: "May 23, 2026",
    image: "linear-gradient(135deg, #1e3a8a 0%, #172554 100%)",
    published: true
  }
];
