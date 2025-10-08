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
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
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
                  <div className="flex size-10 items-center justify-center rounded-lg bg-teal-500/10">
                    <BarChart3 className="size-5 text-teal-500" />
                  </div>
                  <p className="font-medium">Mini Browser</p>
                </div>
                <p className="text-muted-foreground mt-3 max-w-sm text-sm">
                  Browse the web without leaving your workspace with an integrated mini browser.
                </p>
              </div>
            </CardHeader>

            <div className="relative h-fit pl-6 md:pl-12">
              <div className="bg-background overflow-hidden rounded-tl-lg border-l border-t pl-2 pt-2 dark:bg-zinc-950">
                <div className="h-80 rounded-lg p-4">
                  <img
                    src="https://jkrehaebvmsjnymdtysa.supabase.co/storage/v1/object/public/web-app/browser.png"
                    alt="Mini Browser Feature"
                    className="w-full h-full object-contain rounded-lg"
                  />
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
                Clipboard History
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Never lose important content with intelligent clipboard management.
              </p>
            </div>

            <CardContent className="mt-auto h-fit">
              <div className="relative mb-6 sm:mb-0">
                <div className="h-64 overflow-hidden rounded-lg border p-4">
                  <img
                    src="https://jkrehaebvmsjnymdtysa.supabase.co/storage/v1/object/public/web-app/featureclipboardHistory.png"
                    alt="Clipboard History Feature"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group p-6 shadow-black/5 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl md:p-12">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-violet-500/10">
                  <Shield className="size-5 text-violet-500" />
                </div>
              </div>
              <p className="mx-auto max-w-md text-balance text-lg font-semibold sm:text-xl">
                Smart Notes
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Capture thoughts instantly with AI-powered organization and search.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-64">
                <img
                  src="https://jkrehaebvmsjnymdtysa.supabase.co/storage/v1/object/public/web-app/notesfeature.png"
                  alt="Notes Feature"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </Card>

          <Card className="group relative shadow-black/5 sm:col-span-3 sm:rounded-none sm:rounded-br-xl">
            <CardHeader className="p-6 md:p-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Zap className="size-5 text-purple-500" />
                </div>
                <p className="font-medium">Always On Top Workspace</p>
              </div>
              <p className="text-muted-foreground mt-2 max-w-sm text-sm">
                Stay in flow with an always-accessible workspace that doesn't interrupt your current tasks.
              </p>
            </CardHeader>
            <CardContent className="relative h-fit px-6 pb-6 md:px-12 md:pb-12">
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-gradient-to-br from-purple-50 to-teal-50 dark:from-purple-950/50 dark:to-teal-950/50 rounded-lg p-4 border">
                    <div className="space-y-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-xs font-medium">Always Accessible</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/50 rounded p-2 dark:bg-black/20">
                          <p className="text-xs font-medium">Global Shortcuts</p>
                        </div>
                        <div className="bg-white/50 rounded p-2 dark:bg-black/20">
                          <p className="text-xs font-medium">Global Search</p>
                        </div>
                        <div className="bg-white/50 rounded p-2 dark:bg-black/20">
                          <p className="text-xs font-medium">Gmail Integration</p>
                        </div>
                        <div className="bg-white/50 rounded p-2 dark:bg-black/20">
                          <p className="text-xs font-medium">Calendar Access</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
