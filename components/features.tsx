import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BarChart3, Brain, Shield, Zap } from "lucide-react";

export function Features() {
  return (
    <section
      id="features"
      className="dark:bg-muted/25 bg-zinc-50 py-16 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Why Choose
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent">
              {" "}
              Berri?
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Berri is designed for focus and reduces context switching by keeping the tools you reach for
            most right where you’re working and supports global shortcuts. Capture → find → act without changing apps
          </p>
        </div>

        <div className="mx-auto grid gap-2 sm:grid-cols-5">
          <Card className="group overflow-hidden shadow-black/5 sm:col-span-3 sm:rounded-none sm:rounded-tl-xl">
            <CardHeader>
              <div className="md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <BarChart3 className="size-5 text-blue-500" />
                  </div>
                  <p className="font-medium">Real-time Analytics Dashboard</p>
                </div>
                <p className="text-muted-foreground mt-3 max-w-sm text-sm">
                  Monitor your business metrics in real-time with intuitive
                  dashboards. Get instant insights into your performance with
                  customizable visualizations.
                </p>
              </div>
            </CardHeader>

            <div className="relative h-fit pl-6 md:pl-12">
              <div className="absolute -inset-6 [background:radial-gradient(75%_95%_at_50%_0%,transparent,hsl(var(--background))_100%)]"></div>

              <div className="bg-background overflow-hidden rounded-tl-lg border-l border-t pl-2 pt-2 dark:bg-zinc-950">
                <div className="h-64 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-4 dark:from-blue-950/50 dark:to-purple-950/50">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Revenue Analytics</h3>
                      <span className="text-green-500 text-xs">↗ +23%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-blue-200 rounded-full dark:bg-blue-800">
                        <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                      </div>
                      <div className="h-2 bg-purple-200 rounded-full dark:bg-purple-800">
                        <div className="h-2 bg-purple-500 rounded-full w-1/2"></div>
                      </div>
                      <div className="h-2 bg-green-200 rounded-full dark:bg-green-800">
                        <div className="h-2 bg-green-500 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="group overflow-hidden shadow-zinc-950/5 sm:col-span-2 sm:rounded-none sm:rounded-tr-xl">
            <div className="p-6 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Brain className="size-5 text-purple-500" />
                </div>
              </div>
              <p className="mx-auto max-w-md text-balance text-lg font-semibold sm:text-xl">
                AI-Powered Insights Engine
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Let AI automatically discover patterns and trends in your data.
              </p>
            </div>

            <CardContent className="mt-auto h-fit">
              <div className="relative mb-6 sm:mb-0">
                <div className="absolute -inset-6 [background:radial-gradient(50%_75%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
                <div className="aspect-square overflow-hidden rounded-r-lg border bg-gradient-to-br from-red-50 to-pink-50 p-4 dark:from-red-950/50 dark:to-pink-950/50">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Brain className="size-4 text-purple-500" />
                      <span className="text-xs font-medium">AI Insight</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="bg-white/50 rounded p-2 dark:bg-black/20">
                        <p className="font-medium">Peak Traffic Hours</p>
                        <p className="text-muted-foreground">2-4 PM daily</p>
                      </div>
                      <div className="bg-white/50 rounded p-2 dark:bg-black/20">
                        <p className="font-medium">Conversion Rate</p>
                        <p className="text-green-500">↗ +15% this week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group p-6 shadow-black/5 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl md:p-12">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Shield className="size-5 text-green-500" />
                </div>
              </div>
              <p className="mx-auto max-w-md text-balance text-lg font-semibold sm:text-xl">
                Enterprise Security & Compliance
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Bank-grade security with SOC 2 compliance and GDPR ready.
              </p>
            </div>

            <div className="flex justify-center gap-6">
              <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 relative flex aspect-square size-16 items-center justify-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                <Shield className="size-6 text-green-500" />
              </div>
              <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 flex aspect-square size-16 items-center justify-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                <span className="font-semibold">256</span>
              </div>
            </div>
          </Card>

          <Card className="group relative shadow-black/5 sm:col-span-3 sm:rounded-none sm:rounded-br-xl">
            <CardHeader className="p-6 md:p-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Zap className="size-5 text-orange-500" />
                </div>
                <p className="font-medium">Lightning-Fast Processing</p>
              </div>
              <p className="text-muted-foreground mt-2 max-w-sm text-sm">
                Process millions of data points in seconds with our optimized
                infrastructure.
              </p>
            </CardHeader>
            <CardContent className="relative h-fit px-6 pb-6 md:px-12 md:pb-12">
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                <div className="rounded-lg aspect-square border border-dashed border-muted-foreground/25"></div>
                <div className="rounded-lg bg-muted/50 flex aspect-square items-center justify-center border p-4">
                  <img
                    className="m-auto size-8 dark:invert"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                    alt="PostgreSQL logo"
                    width="32"
                    height="32"
                  />
                </div>
                <div className="rounded-lg aspect-square border border-dashed border-muted-foreground/25"></div>
                <div className="rounded-lg bg-muted/50 flex aspect-square items-center justify-center border p-4">
                  <img
                    className="m-auto size-8 dark:invert"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"
                    alt="Redis logo"
                    width="32"
                    height="32"
                  />
                </div>
                <div className="rounded-lg aspect-square border border-dashed border-muted-foreground/25"></div>
                <div className="rounded-lg bg-muted/50 flex aspect-square items-center justify-center border p-4">
                  <img
                    className="m-auto size-8 dark:invert"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                    alt="MongoDB logo"
                    width="32"
                    height="32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
