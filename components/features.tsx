"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Globe, Clipboard, StickyNote } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  color: string;
  index: number;
}

function FeatureCard({ icon, title, description, image, color, index }: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.215, 0.61, 0.355, 1] }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl bg-foreground/[0.03] border border-foreground/10 p-8 md:p-10 hover:border-foreground/20 transition-all duration-500">
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color}`} />

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${color} mb-6`}
          >
            <span className="text-white">{icon}</span>
          </motion.div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">{description}</p>

          {/* Image preview */}
          <motion.div
            initial={{ y: 20, opacity: 0.8 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden border border-foreground/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
            <img
              src={image}
              alt={title}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const features = [
    {
      icon: <Globe className="size-7" />,
      title: "Mini Browser",
      description: "Pin any website — WhatsApp, Gmail, docs, or dashboards. Browse without leaving your workspace.",
      image: "https://jkrehaebvmsjnymdtysa.supabase.co/storage/v1/object/public/web-app/browser.png",
      color: "from-teal-500/20 to-cyan-500/20",
    },
    {
      icon: <Clipboard className="size-7" />,
      title: "Clipboard History",
      description: "Never lose copied content again. Search, filter, and paste anything from your history.",
      image: "https://jkrehaebvmsjnymdtysa.supabase.co/storage/v1/object/public/web-app/featureclipboardHistory.png",
      color: "from-purple-500/20 to-violet-500/20",
    },
    {
      icon: <StickyNote className="size-7" />,
      title: "Smart Notes",
      description: "Jot down quick notes that stay on top. Organize screenshots and snippets into smart folders.",
      image: "https://jkrehaebvmsjnymdtysa.supabase.co/storage/v1/object/public/web-app/notesfeature.png",
      color: "from-violet-500/20 to-purple-500/20",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[150px]" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <SectionTitle className="text-center mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-purple-500 uppercase tracking-widest mb-4"
          >
            Features
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
            Everything you need,
            <br />
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
              always on top
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Berri keeps your essential tools floating above everything else.
            No more tab hunting. No more context switching.
          </p>
        </SectionTitle>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 md:mt-32 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 rounded-full bg-foreground/5 border border-foreground/10">
            <span className="text-sm text-muted-foreground px-4">Ready to boost your productivity?</span>
            <motion.a
              href="#use-cases"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold"
            >
              See Use Cases →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
