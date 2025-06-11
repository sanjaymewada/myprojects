"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
import { allBlogs } from "contentlayer/generated";
import { PulsatingButton } from "@/components/components/ui/pulsating-button";
import Typewriter from "typewriter-effect";
import { Button } from "@/components/components/ui/button";
import { Separator } from "@/components/components/ui/separator";
import { motion } from 'framer-motion';
import Tag from '@/components/Tag';
import { formatDate } from '../lib/utils';

// Add animation keyframes for gradient movement
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradient-xy {
      0%, 100% {
        background-position: 0% 50%;
        filter: hue-rotate(0deg);
      }
      25% {
        background-position: 100% 50%;
        filter: hue-rotate(3deg);
      }
      50% {
        background-position: 50% 100%;
        filter: hue-rotate(-3deg);
      }
      75% {
        background-position: 0% 100%;
        filter: hue-rotate(0deg);
      }
    }
    .animate-gradient-xy {
      animation: gradient-xy 15s ease-in-out infinite;
      background-size: 400% 400%;
    }
  `;
  document.head.appendChild(style);
}

const MAX_POSTS = 3; // Batasi jumlah postingan yang ditampilkan

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const tagVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.2,
    }
  },
};

export default function Page() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Mulai animasi segera setelah komponen dimuat
    setStartAnimation(true);
  }, []);

  // Ambil dan urutkan postingan
  const posts = allCoreContent(sortPosts(allBlogs));
  const displayedPosts = posts.slice(0, MAX_POSTS); // Ambil 3 postingan terbaru

  return (
    <div>
      {/* Hero Section with Creative Design */}
      <div className="relative h-[calc(100vh-14rem)] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid"></div>
        </div>

        {/* Main Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-4">
          {/* Floating Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button 
              variant="outline" 
              className="rounded-full backdrop-blur-sm border-2 border-blue-500/20 dark:border-blue-400/20 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
            >
              <Link href="/projects" className="flex items-center gap-2">
                <span className="animate-pulse w-2 h-2 rounded-full bg-blue-500"></span>
                Explore More DevOps Resources
              </Link>
            </Button>
          </motion.div>

          {/* Title with Gradient */}
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            ProDevOpsGuy Tech Community
          </motion.h1>

          {/* Animated Typewriter */}
          {startAnimation && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-4 mb-8 backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-xl px-6"
            >
              <Typewriter
                options={{
                  strings: [
                    "Cloud DevOps Engineer",
                    "Content Creator/Blogger",
                    "Automation Expert"
                  ],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "text-2xl sm:text-3xl font-medium bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent",
                  cursorClassName: "text-purple-500 dark:text-purple-400",
                  delay: 50,
                  deleteSpeed: 20,
                }}
              />
            </motion.div>
          )}

          {/* Action Button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <PulsatingButton className="relative">
              <Link href="/blog" className="px-8 py-3">Explore All Projects</Link>
            </PulsatingButton>
          </motion.div>
        </div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 mb-12">
        <div className="relative group">
          {/* Background decorative elements */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-50 group-hover:opacity-60 transition-all duration-500"></div>
          
          {/* Main card */}
          <div className="relative rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-0.5 shadow-2xl shadow-blue-500/10">
            <div className="relative overflow-hidden rounded-[14px] p-8">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/80 to-purple-50/50 dark:from-blue-950/50 dark:via-gray-900/80 dark:to-purple-950/50 animate-gradient-xy"></div>
              
              {/* Content wrapper */}
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
                
                {/* Heading */}
                <div className="relative">
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent pb-2">
                    Latest DevOps Projects
                  </h2>
                  {/* Animated underline */}
                  <div className="relative h-1 w-32">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-8 py-8">
          {displayedPosts.map((post, index) => (
            <motion.div
              key={post.title}
              custom={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="group relative transform transition-all duration-500 hover:scale-[1.01]"
            >
              <div className="flex flex-col space-y-4 rounded-2xl border border-gray-200/10 bg-white/5 backdrop-blur-lg p-6 dark:border-gray-800/50 dark:bg-gray-900/50 md:flex-row md:items-center md:space-x-6 md:space-y-0 hover:border-gray-300/30 dark:hover:border-gray-700/70 transition-colors duration-300">
                {/* Date Column */}
                <div className="w-full shrink-0 md:w-48">
                  <time className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300" dateTime={post.date}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(post.date)}
                  </time>
                </div>

                {/* Content Column */}
                <div className="flex flex-1 flex-col space-y-4">
                  <div className="flex flex-col space-y-3">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="group/title text-2xl font-bold tracking-tight"
                    >
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover/title:bg-[length:100%_2px] transition-all duration-500">
                        {post.title}
                      </span>
                    </Link>
                    <p className="prose max-w-none text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <motion.div
                        key={tag}
                        variants={tagVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="transform-gpu"
                      >
                        <Tag text={tag} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <div className="group/link inline-flex items-center space-x-2 text-base font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200">
                    <span className="relative">
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 transform scale-x-0 transition-transform duration-300 group-hover/link:scale-x-100"></span>
                      Read more
                    </span>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      animate={{ x: 3 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </div>
                </div>
              </div>
              {index < displayedPosts.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.3,
                    duration: 0.7,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  className="w-full px-4"
                >
                  <Separator animated gradient className="my-12" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}