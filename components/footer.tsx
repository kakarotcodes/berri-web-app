"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

function FooterLink({ href, children, delay = 0 }: { href: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
      >
        {children}
      </Link>
    </motion.div>
  );
}

export function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-foreground/[0.02] border-t border-foreground/10">
      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.02 } : {}}
          transition={{ duration: 1 }}
          className="text-[20vw] font-black tracking-tighter text-foreground whitespace-nowrap"
        >
          BERRI
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-32">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
            Ready to stop
            <br />
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
              tab hunting?
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-8">
            Join thousands of users who've transformed their workflow with Berri.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="#features"
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-foreground text-background hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <span>Download for macOS</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-4">
              <motion.img
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                src="/assets/logos/berri-logo.png"
                alt="Berri"
                className="size-10 rounded-xl"
              />
              <span className="text-xl font-bold">Berri</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your always-on-top workspace for notes, clipboard, and quick access.
            </p>
          </motion.div>

          {/* Product */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-semibold mb-4"
            >
              Product
            </motion.h3>
            <div className="space-y-3">
              <FooterLink href="#features" delay={0.2}>Features</FooterLink>
              <FooterLink href="#use-cases" delay={0.25}>Use Cases</FooterLink>
              <FooterLink href="/guide" delay={0.3}>Guide</FooterLink>
            </div>
          </div>

          {/* Resources */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-semibold mb-4"
            >
              Resources
            </motion.h3>
            <div className="space-y-3">
              <FooterLink href="/guide" delay={0.35}>Documentation</FooterLink>
              <FooterLink href="#" delay={0.4}>Support</FooterLink>
              <FooterLink href="#" delay={0.45}>Changelog</FooterLink>
            </div>
          </div>

          {/* Legal */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-semibold mb-4"
            >
              Legal
            </motion.h3>
            <div className="space-y-3">
              <FooterLink href="/privacy" delay={0.5}>Privacy Policy</FooterLink>
              <FooterLink href="/terms" delay={0.55}>Terms of Service</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Berri. All rights reserved.
          </p>

          {/* Animated dots */}
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="w-1.5 h-1.5 rounded-full bg-purple-500"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </footer>
  );
}
