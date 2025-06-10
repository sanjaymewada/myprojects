"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
import { allBlogs } from "contentlayer/generated";
import ListLayoutSimple from "@/layouts/BlogComponent";
import { PulsatingButton } from "@/components/components/ui/pulsating-button";
import Typewriter from "typewriter-effect";
import { Button } from "@/components/components/ui/button";
import { motion } from 'framer-motion';
import Tag from '@/components/Tag';
import { formatDate } from '../lib/utils';

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
      {/* Bagian Hero */}
      <div className="h-[calc(100vh-14rem)] flex flex-col justify-center items-center">
        <Button variant="outline" className="rounded-full mb-6">
          <Link href="/projects">
          Explore More DevOps Resources
          </Link>
        </Button>
        <h1 className="mb-2 text-5xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-center">
          ProDevOpsGuy Tech Community
        </h1>
        {startAnimation && (
          <div className="text-center py-2 mb-4">
            <Typewriter
              options={{
                strings: [
                  "Cloud DevOps Engineer",
                  "Content Creator/Blogger",
                  "Automation Expert"
                ],
                autoStart: true,
                loop: true,
                wrapperClassName: "text-xl sm:text-2xl font-medium",
                cursorClassName: "text-blue-500 dark:text-blue-500",
                delay: 50, // Kecepatan pengetikan
                deleteSpeed: 20, // Kecepatan penghapusan
              }}
            />
          </div>
        )}
        {/* <p className="mx-auto max-w-sm sm:max-w-md mb-4 text-center font-medium sm:text-xl">
          I was a Data Science student at the number 1 best Polytechnic in Southeast Asia.
        </p> */}
        <div className="flex justify-center">
          <PulsatingButton>
            <Link href="/blog">Explore All Projects</Link>
          </PulsatingButton>
        </div>
      </div>

        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tighter text-center sm:text-left mt-8">
          Latest DevOps Projects
        </h2>
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
                    <time className="text-sm font-medium text-gray-500 dark:text-gray-400" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>

                  {/* Content Column */}
                  <div className="flex flex-1 flex-col space-y-4">
                    <div className="flex flex-col space-y-3">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                      <p className="prose max-w-none text-gray-600 dark:text-gray-300 line-clamp-2">
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
                        >
                          <Tag text={tag} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center text-base font-medium text-primary-500 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-200">
                      <span className="group-hover:underline">Read more</span>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
  );
}