"use client";
import React, { useEffect, useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ThemeToggle } from "@/components/theme-toggle";
// import { createClient } from "@/lib/supabase/client";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <HeroHeader />

      <main className="overflow-hidden">
        <section>
          <div className="relative mx-auto max-w-6xl px-6 pt-32 lg:pb-16 lg:pt-48">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-teal-500/10 px-4 py-2 text-sm font-medium text-primary">
                  <Zap className="size-4" />
                  <span>Private by design</span>
                </div>

                <h1 className="text-balance text-4xl font-medium sm:text-5xl md:text-6xl">
                  {/* Transform your data into  */}
                  Less hunting.
                  <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
                    {" "}
                    More doing
                  </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
                  {/* Berri empowers businesses to unlock the full potential of their data with AI-driven analytics, 
                                    automated reporting, and actionable insights that drive growth. */}
                  Berri is an always‑on‑top workspace for your everyday
                  bits - clipboard history, screenshots, and notes kept tidy and
                  instantly searchable so you can stay in flow
                </p>

                <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/guide" className="flex items-center gap-2">
                      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                      Get Started Guide
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full">
                    <a href="https://berri-downloads.s3.ap-south-1.amazonaws.com/releases/stable/berri-1.0.17.dmg" download className="flex items-center gap-2">
                      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      Download for macOS
                    </a>
                  </Button>
                </div>

                <div className="mt-16">
                  <video 
                    className="mx-auto rounded-2xl shadow-2xl max-w-4xl w-full"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/assets/videos/demo1berri.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* <div className="mt-8 text-sm text-muted-foreground">
                  No credit card required • 14-day free trial
                </div> */}

              </AnimatedGroup>
            </div>
          </div>
        </section>
        {/* <LogoCloud /> */}
      </main>
    </>
  );
}


const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Guide", href: "/guide" },
  // { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

// interface User {
//   id: string;
//   email?: string;
//   user_metadata?: {
//     full_name?: string;
//     avatar_url?: string;
//   };
// }

// interface SessionData {
//   user: User | null;
//   tokenStatus?: {
//     hasTokens: boolean;
//     expired: boolean;
//     expiresAt: string;
//     scopes: string[];
//   };
// }

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  // const [sessionData, setSessionData] = useState<SessionData>({ user: null });
  // const [loading, setLoading] = useState(true);
  // const supabase = createClient();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       // Check server-side session via Supabase SSR
  //       const response = await fetch("/api/auth/session", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         if (data.user) {
  //           setSessionData(data);
  //           setLoading(false);
  //           return;
  //         }
  //       }

  //       // If no valid session, check for auth success indicators
  //       await checkNewAuthCompletion();
  //     } catch (error) {
  //       console.error("Failed to check session:", error);
  //       await checkNewAuthCompletion();
  //     }
  //   };

  //   const checkNewAuthCompletion = async () => {
  //     // Check for auth success indicators (new authentication)
  //     const authSuccess = sessionStorage.getItem("auth_success");
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const urlAuthSuccess = urlParams.get("auth_success");

  //     if (authSuccess || urlAuthSuccess) {
  //       // Auth just completed, refresh session from server
  //       const response = await fetch("/api/auth/session", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         if (data.user) {
  //           setSessionData(data);
  //         }
  //       }

  //       // Clear the temporary flags
  //       sessionStorage.removeItem("auth_success");
  //       if (urlAuthSuccess) {
  //         const url = new URL(window.location.href);
  //         url.searchParams.delete("auth_success");
  //         window.history.replaceState({}, "", url.toString());
  //       }
  //     }

  //     setLoading(false);
  //   };

  //   // Initial auth check
  //   checkAuth();

  //   // Listen for real-time auth changes
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange(async (event, session) => {
  //     if (event === "SIGNED_IN" && session) {
  //       // Refresh session data when signed in
  //       checkAuth();
  //     } else if (event === "SIGNED_OUT") {
  //       setSessionData({ user: null });
  //     }
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [supabase.auth]);

  // const handleLogout = async () => {
  //   try {
  //     // Call secure logout API
  //     await fetch("/api/auth/session", {
  //       method: "DELETE",
  //       credentials: "include",
  //     });

  //     // Clear client state
  //     setSessionData({ user: null });
  //     sessionStorage.removeItem("auth_success");

  //     // Reload to clear any remaining state
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed group z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <BerriLogo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <ThemeToggle />
                {/* {loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  </div>
                ) : sessionData.user ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-teal-500">
                        <User className="size-4 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {sessionData.user.user_metadata?.full_name ||
                          sessionData.user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-muted-foreground hover:text-accent-foreground"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <> */}
                    <Button
                      asChild
                      size="sm"
                      className={cn(isScrolled && "lg:hidden")}
                    >
                      <a href="https://berri-downloads.s3.ap-south-1.amazonaws.com/releases/stable/berri-1.0.17.dmg" download>
                        <span>Download for macOS</span>
                      </a>
                    </Button>
                    {/* <Button
                      asChild
                      size="sm"
                      className={cn(isScrolled && "lg:hidden")}
                    >
                      <Link href="/login">
                        <span>Download for macOS</span>
                      </Link>
                    </Button> */}
                    <Button
                      asChild
                      size="sm"
                      className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                    >
                      <a href="https://berri-downloads.s3.ap-south-1.amazonaws.com/releases/stable/berri-1.0.17.dmg" download>
                        <span>Download for macOS</span>
                      </a>
                    </Button>
                  {/* </>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const LogoCloud = () => {
  return (
    <section className="bg-background pb-16 md:pb-32">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="inline md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm text-muted-foreground">
              Trusted by leading companies
            </p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} duration={40} gap={112}>
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nvidia.svg"
                  alt="Nvidia Logo"
                  height="20"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/github.svg"
                  alt="GitHub Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nike.svg"
                  alt="Nike Logo"
                  height="20"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/laravel.svg"
                  alt="Laravel Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-6 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/openai.svg"
                  alt="OpenAI Logo"
                  height="24"
                  width="auto"
                />
              </div>
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const BerriLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <img 
        src="/assets/logos/logo1_top_left.png" 
        alt="Berri Logo" 
        className="size-8 rounded-lg"
      />
      <span className="text-xl font-bold leading-none">Berri</span>
    </div>
  );
};
