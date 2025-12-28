"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Monitor,
  Keyboard,
  Mail,
  MessageCircle,
  Clipboard,
  FolderOpen,
} from "lucide-react";

interface UseCase {
  id: string;
  title: string;
  icon: React.ReactNode;
  problem: string;
  solution: string;
  shortcut: string;
  color: string;
  gradient: string;
}

const useCases: UseCase[] = [
  {
    id: "screen-share",
    title: "Screen Share Privacy",
    icon: <Monitor className="size-6" />,
    problem: "You're sharing your screen but need to check private notes",
    solution: "Open Berri with your shortcut — you see it, they don't. Stay professional.",
    shortcut: "⌘ + Shift + B",
    color: "text-purple-500",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    id: "quick-email",
    title: "Quick Email Access",
    icon: <Mail className="size-6" />,
    problem: "Need to check inbox without losing focus on current task",
    solution: "One keystroke and your email appears on top. Check, dismiss, continue.",
    shortcut: "Ctrl + E",
    color: "text-teal-500",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "whatsapp",
    title: "Instant Messaging",
    icon: <MessageCircle className="size-6" />,
    problem: "Important message while coding? Switching apps breaks your flow",
    solution: "Pin WhatsApp in Berri. Peek, reply, and get back to work in seconds.",
    shortcut: "Ctrl + W",
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "clipboard",
    title: "Clipboard History",
    icon: <Clipboard className="size-6" />,
    problem: "You copied something important 10 copies ago. Gone forever?",
    solution: "Berri keeps your entire clipboard history. Search and paste anything.",
    shortcut: "⌘ + Shift + V",
    color: "text-orange-500",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: "folders",
    title: "Smart Folders",
    icon: <FolderOpen className="size-6" />,
    problem: "Screenshots, links, snippets scattered everywhere",
    solution: "Organize into smart folders. Assign shortcuts. One keystroke away.",
    shortcut: "⌘ + 1, 2, 3...",
    color: "text-blue-500",
    gradient: "from-blue-500 to-indigo-600",
  },
];

function UseCaseCard({ useCase, isActive, onClick }: { useCase: UseCase; isActive: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 8 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left p-4 md:p-6 rounded-2xl transition-all duration-300 ${
        isActive
          ? "bg-foreground/10 border-2 border-foreground/20"
          : "bg-transparent border-2 border-transparent hover:bg-foreground/5"
      }`}
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ scale: isActive ? 1.1 : 1 }}
          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.gradient} text-white`}
        >
          {useCase.icon}
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-lg ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
            {useCase.title}
          </p>
          <p className="text-sm text-muted-foreground font-mono">{useCase.shortcut}</p>
        </div>
        <motion.div
          animate={{ scale: isActive ? 1.5 : 1 }}
          className={`w-2 h-2 rounded-full ${isActive ? "bg-purple-500" : "bg-foreground/20"}`}
        />
      </div>
    </motion.button>
  );
}

export function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % useCases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeUseCase = useCases[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="relative py-32 md:py-48 overflow-hidden bg-foreground/[0.02]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          <span className="inline-block text-sm font-semibold text-teal-500 uppercase tracking-widest mb-4">
            Use Cases
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
            Built for how you
            <br />
            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              actually work
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Every feature solves a real productivity pain point.
            Here's what changes when your tools stay on top.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Card display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeUseCase.id}
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 10 }}
                  transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative"
                >
                  {/* Card */}
                  <div className="relative overflow-hidden rounded-3xl bg-background border border-foreground/10 p-8 md:p-10 shadow-2xl">
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${activeUseCase.gradient} opacity-5`} />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon and title */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${activeUseCase.gradient} text-white`}>
                          {activeUseCase.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{activeUseCase.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Keyboard className="size-4 text-muted-foreground" />
                            <code className="text-sm font-mono text-muted-foreground">
                              {activeUseCase.shortcut}
                            </code>
                          </div>
                        </div>
                      </div>

                      {/* Problem */}
                      <div className="mb-6">
                        <span className="text-xs font-semibold text-red-500/80 uppercase tracking-wider">The Problem</span>
                        <p className="mt-2 text-lg text-foreground/80">{activeUseCase.problem}</p>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent my-6" />

                      {/* Solution */}
                      <div>
                        <span className="text-xs font-semibold text-green-500/80 uppercase tracking-wider">With Berri</span>
                        <p className="mt-2 text-lg text-foreground">{activeUseCase.solution}</p>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-foreground/5 to-transparent rounded-bl-[100px]" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-foreground/5 to-transparent rounded-tr-[80px]" />
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 h-1 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      key={activeIndex}
                      className={`h-full bg-gradient-to-r ${activeUseCase.gradient}`}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-3"
          >
            {useCases.map((useCase, index) => (
              <UseCaseCard
                key={useCase.id}
                useCase={useCase}
                isActive={index === activeIndex}
                onClick={() => handleSelect(index)}
              />
            ))}

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-teal-500/10 border border-foreground/10"
            >
              <p className="text-sm text-muted-foreground mb-2">
                Every shortcut is customizable
              </p>
              <p className="text-foreground font-medium">
                Open Berri settings and assign your own keyboard shortcuts.
                Make it truly yours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
