'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { motion } from 'framer-motion'

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

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+$/, '') // Remove any trailing /page
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous Page
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous Page
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next Page
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next Page
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Search Projects</span>
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post, index) => {
            const { path, date, title, summary, tags } = post
            return (
              <motion.div
                key={path}
                custom={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="group relative transform transition-all duration-500 hover:scale-[1.01] mb-8"
              >
                <div className="flex flex-col space-y-4 rounded-2xl border border-gray-200/10 bg-white/5 backdrop-blur-lg p-6 dark:border-gray-800/50 dark:bg-gray-900/50 md:flex-row md:items-center md:space-x-6 md:space-y-0 hover:border-gray-300/30 dark:hover:border-gray-700/70 transition-colors duration-300">
                  {/* Date Column */}
                  <div className="w-full shrink-0 md:w-48">
                    <time className="text-sm font-medium text-gray-500 dark:text-gray-400" dateTime={date}>
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </div>

                  {/* Content Column */}
                  <div className="flex flex-1 flex-col space-y-4">
                    <div className="flex flex-col space-y-3">
                      <Link
                        href={`/${path}`}
                        className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                      >
                        {title}
                      </Link>
                      <p className="prose max-w-none text-gray-600 dark:text-gray-300 line-clamp-2">
                        {summary}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {tags?.map((tag) => (
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
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}