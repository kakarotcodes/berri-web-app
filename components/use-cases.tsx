"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Keyboard,
  Mail,
  MessageCircle,
  Clipboard,
  FolderOpen,
  Eye,
  EyeOff,
  Zap
} from "lucide-react";

interface UseCase {
  id: string;
  title: string;
  icon: React.ReactNode;
  problem: string;
  solution: string;
  shortcut: string;
  color: string;
  bgGradient: string;
}

const useCases: UseCase[] = [
  {
    id: "screen-share",
    title: "Screen Share Privacy",
    icon: <Monitor className="size-8" />,
    problem: "You're on a video call sharing your screen, but need to check your notes",
    solution: "Open Berri with your shortcut — you see it, they don't. Write notes, check references, stay professional.",
    shortcut: "⌘ + Shift + B",
    color: "text-purple-500",
    bgGradient: "from-purple-500/20 to-violet-500/20",
  },
  {
    id: "quick-email",
    title: "Quick Email Access",
    icon: <Mail className="size-8" />,
    problem: "Need a quick glance at your inbox without losing focus on your current task",
    solution: "Assign a shortcut like Ctrl+E in Berri settings. One keystroke and your email appears on top. Check, dismiss, continue.",
    shortcut: "Ctrl + E",
    color: "text-teal-500",
    bgGradient: "from-teal-500/20 to-cyan-500/20",
  },
  {
    id: "whatsapp",
    title: "Instant Messaging",
    icon: <MessageCircle className="size-8" />,
    problem: "Important WhatsApp message while coding? Switching apps breaks your flow",
    solution: "Pin WhatsApp web in Berri's mini browser. Ctrl+W to peek, reply, and get back to code in seconds.",
    shortcut: "Ctrl + W",
    color: "text-green-500",
    bgGradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "clipboard",
    title: "Clipboard History",
    icon: <Clipboard className="size-8" />,
    problem: "You copied something important 10 copies ago. Gone forever?",
    solution: "Berri keeps your entire clipboard history. Search, filter, and paste anything you've ever copied.",
    shortcut: "⌘ + Shift + V",
    color: "text-orange-500",
    bgGradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: "folders",
    title: "Smart Folders",
    icon: <FolderOpen className="size-8" />,
    problem: "Screenshots, links, snippets scattered everywhere. Finding them is a nightmare",
    solution: "Organize everything into smart folders. Assign shortcuts to each. Your project assets, one keystroke away.",
    shortcut: "⌘ + 1, 2, 3...",
    color: "text-blue-500",
    bgGradient: "from-blue-500/20 to-indigo-500/20",
  },
];

export function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % useCases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-teal-500/10 px-4 py-2 text-sm font-medium text-primary">
            <Zap className="size-4" />
            <span>Real problems, real solutions</span>
          </div>
          <h2 className="text-3xl font-bold sm:text-5xl mb-6">
            Built for how you
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
              {" "}actually work
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature in Berri solves a real productivity pain point.
            Here&apos;s what changes when your tools stay on top.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stack Card Animation */}
          <div className="relative h-[500px] flex items-center justify-center">
            {useCases.map((useCase, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);

              // Calculate position in stack
              const isActive = offset === 0;
              const isBehind = offset < 0;

              // Only show 3 cards max
              if (absOffset > 2) return null;

              return (
                <motion.div
                  key={useCase.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.95,
                    y: isActive ? 0 : (isBehind ? -20 : 20),
                    zIndex: isActive ? 10 : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  onClick={() => handleSelect(index)}
                  className="absolute w-full max-w-md cursor-pointer"
                  style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                >
                  <div
                    className={`
                      relative rounded-3xl p-8 overflow-hidden
                      bg-card border border-border
                      shadow-2xl
                      ${isActive ? 'ring-2 ring-purple-500/50 shadow-purple-500/20' : ''}
                    `}
                  >
                    {/* Colored gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${useCase.bgGradient} opacity-50`} />

                    {/* Content wrapper - relative to appear above gradient */}
                    <div className="relative z-10">
                      {/* Privacy indicator */}
                      <div className="absolute -top-4 right-0 flex items-center gap-2 text-xs text-muted-foreground">
                        {useCase.id === "screen-share" ? (
                          <>
                            <EyeOff className="size-3" />
                            <span>Hidden from others</span>
                          </>
                        ) : (
                          <>
                            <Eye className="size-3" />
                            <span>Only you see this</span>
                          </>
                        )}
                      </div>

                      <div className={`mb-6 ${useCase.color}`}>
                        {useCase.icon}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">The Problem</p>
                          <p className="text-foreground font-medium">{useCase.problem}</p>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">With Berri</p>
                          <p className="text-foreground">{useCase.solution}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-2">
                        <Keyboard className="size-4 text-muted-foreground" />
                        <code className="text-sm bg-foreground/10 px-3 py-1 rounded-lg font-mono">
                          {useCase.shortcut}
                        </code>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="space-y-8">
            <div className="space-y-3">
              {useCases.map((useCase, index) => (
                <motion.button
                  key={useCase.id}
                  onClick={() => handleSelect(index)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full text-left p-4 rounded-xl transition-colors duration-200
                    ${activeIndex === index
                      ? 'bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30'
                      : 'hover:bg-muted/50 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      flex size-10 items-center justify-center rounded-lg
                      ${activeIndex === index ? useCase.color : 'text-muted-foreground'}
                      bg-background border transition-colors duration-200
                      [&>svg]:size-5
                    `}>
                      {useCase.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate transition-colors duration-200 ${activeIndex === index ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {useCase.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {useCase.shortcut}
                      </p>
                    </div>
                    <motion.div
                      animate={{
                        scale: activeIndex === index ? 1.25 : 1,
                        backgroundColor: activeIndex === index ? 'rgb(168, 85, 247)' : 'rgba(156, 163, 175, 0.3)',
                      }}
                      transition={{ duration: 0.2 }}
                      className="size-2 rounded-full"
                    />
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="bg-muted/30 rounded-2xl p-6 border">
              <p className="text-sm text-muted-foreground mb-3">
                Every shortcut is customizable
              </p>
              <p className="text-foreground">
                Open Berri settings and assign your own keyboard shortcuts to any feature.
                Make it yours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
