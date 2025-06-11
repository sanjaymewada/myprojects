"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/components/ui/tabs";
import ProjectAccordion from "./ProjectAccordion";
import allProjects from "@/data/project.json";
import { useMemo } from "react";
import { motion } from "framer-motion";

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

export default function ProjectTabs() {
  // Kelompokkan proyek berdasarkan type dan buat daftar tab, termasuk "All"
  const { groupedProjects, tabTypes } = useMemo(() => {
    const grouped = allProjects.reduce((acc, project) => {
      const { type } = project;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(project);
      return acc;
    }, {});

    // Tambahkan kategori "All" dengan semua proyek
    return {
      groupedProjects: {
        All: allProjects,
        ...grouped,
      },
      tabTypes: ["All", ...Object.keys(grouped)], // "All" diurutkan pertama
    };
  }, []);

  return (
    <Tabs defaultValue="All" className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative mb-6"
      >
        <TabsList className="relative flex w-full justify-start gap-2 overflow-x-auto bg-transparent pb-2 scrollbar-hide dark:bg-transparent">
          {tabTypes.map((type, index) => (
            <motion.div
              key={type}
              variants={tabVariants}
              whileHover="hover"
              custom={index}
            >
              <TabsTrigger
                value={type}
                className="relative rounded-full border border-neutral-200/50 bg-white/50 px-4 py-2 text-sm font-medium text-neutral-600 backdrop-blur-sm transition-all hover:bg-white/80 hover:text-neutral-900 data-[state=active]:border-blue-500/50 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-600 dark:border-neutral-800/50 dark:bg-neutral-950/50 dark:text-neutral-400 dark:hover:bg-neutral-900/50 dark:hover:text-neutral-100 dark:data-[state=active]:border-blue-500/50 dark:data-[state=active]:bg-blue-500/10 dark:data-[state=active]:text-blue-400"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    transition: { duration: 0.3, delay: index * 0.1 }
                  }}
                />
              </TabsTrigger>
            </motion.div>
          ))}
        </TabsList>

        {/* Gradient borders */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent dark:via-neutral-700/50" />
        <div className="pointer-events-none absolute bottom-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-300/30 to-transparent blur-[0.5px] dark:via-neutral-700/30" />
      </motion.div>

      {tabTypes.map((type) => (
        <TabsContent key={type} value={type} className="mt-4 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {groupedProjects[type].map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <ProjectAccordion project={project} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
