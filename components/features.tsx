import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Globe, Clipboard, StickyNote, Layers, Command, Search, Mail, Calendar } from "lucide-react";

export function Features() {
  return (
    <section
      id="features"
      className="dark:bg-muted/25 bg-zinc-50 py-16 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Why Choose
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
              {" "}
              Berri?
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Berri is designed for focus and reduces context switching by keeping the tools you reach for
            most right where you're working and supports global shortcuts. Capture → find → act without changing apps
          </p>
        </div>

        <div className="space-y-6">
          {/* Mini Browser - Full Width */}
          <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="grid md:grid-cols-2 gap-6">
              <CardHeader className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-teal-500/10 ring-1 ring-teal-500/20">
                    <Globe className="size-7 text-teal-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Mini Browser</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Browse the web without leaving your workspace with an integrated mini browser. Search, read, and reference information seamlessly while staying in your flow.
                </p>
              </CardHeader>
              <CardContent className="p-4 md:p-8 flex items-center">
                <div className="w-full h-full min-h-[300px] md:min-h-[400px] rounded-xl overflow-hidden border-2 border-teal-500/20 bg-gradient-to-br from-teal-50/50 to-purple-50/50 dark:from-teal-950/20 dark:to-purple-950/20">
                  <img
                    src="https://jkrehaebvmsjnymdtysa.supabase.co/storage/v1/object/public/web-app/browser.png"
                    alt="Mini Browser Feature"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Clipboard History & Smart Notes - Two Column */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-8">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20">
                    <Clipboard className="size-7 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Clipboard History</h3>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Never lose important content with intelligent clipboard management. Access your entire clipboard history instantly.
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="w-full h-[350px] rounded-xl overflow-hidden border-2 border-purple-500/20 bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20">
                  <img
                    src="https://jkrehaebvmsjnymdtysa.supabase.co/storage/v1/object/public/web-app/featureclipboardHistory.png"
                    alt="Clipboard History Feature"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-8">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-violet-500/10 ring-1 ring-violet-500/20">
                    <StickyNote className="size-7 text-violet-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Smart Notes</h3>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Capture thoughts instantly with AI-powered organization and search. Your second brain, always at your fingertips.
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="w-full h-[350px] rounded-xl overflow-hidden border-2 border-violet-500/20 bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20">
                  <img
                    src="https://jkrehaebvmsjnymdtysa.supabase.co/storage/v1/object/public/web-app/notesfeature.png"
                    alt="Notes Feature"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Always On Top - Full Width */}
          <Card className="group overflow-hidden border-0 shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
            <div className="p-8 md:p-16">
              <div className="mb-16 text-center">
                <div className="inline-flex items-center justify-center gap-3 mb-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-teal-500/10">
                    <Layers className="size-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                  Always On Top Workspace
                </h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-normal">
                  Stay in flow with an always-accessible workspace that doesn't interrupt your current tasks.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {/* Global Shortcuts */}
                <div className="group/card bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <Command className="size-6 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Global Shortcuts</h4>
                      <p className="text-sm text-muted-foreground mt-1">Access from anywhere</p>
                    </div>
                  </div>
                </div>

                {/* Global Search */}
                <div className="group/card bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <Search className="size-6 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Global Search</h4>
                      <p className="text-sm text-muted-foreground mt-1">Find anything instantly</p>
                    </div>
                  </div>
                </div>

                {/* Gmail Integration */}
                <div className="group/card bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <Mail className="size-6 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Gmail Integration</h4>
                      <p className="text-sm text-muted-foreground mt-1">Email at your fingertips</p>
                    </div>
                  </div>
                </div>

                {/* Calendar Access */}
                <div className="group/card bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <Calendar className="size-6 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Calendar Access</h4>
                      <p className="text-sm text-muted-foreground mt-1">Stay on schedule</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
