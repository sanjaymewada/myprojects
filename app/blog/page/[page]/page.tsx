'use client';

import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/components/ui/button'
import { FaRss } from 'react-icons/fa'
import Link from 'next/link'

const POSTS_PER_PAGE = 6

type Props = {
  params: {
    page: string
  }
}

export default function Page({ params }: Props) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(params.page)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
          >
            All Projects
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="outline" size="sm" className="rounded-full hover:scale-105 transition-transform duration-200">
              <Link href="/feed.xml" className="flex items-center gap-2">
                <FaRss className="h-4 w-4" />
                <span>RSS Feed</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg leading-7 text-gray-500 dark:text-gray-400"
        >
          Discover our latest DevOps projects, tutorials, and technical guides
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <ListLayout
          posts={posts}
          initialDisplayPosts={initialDisplayPosts}
          pagination={pagination}
          title=""
        />
      </motion.div>
    </motion.div>
  )
}
