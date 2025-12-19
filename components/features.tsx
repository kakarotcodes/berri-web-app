import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Globe, Clipboard, StickyNote } from "lucide-react";

export function Features() {
  return (
    <section
      id="features"
      className="dark:bg-muted/25 bg-zinc-50 py-16 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Everything you need,
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
              {" "}
              always on top
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Berri keeps your essential tools floating above everything else.
            No more tab hunting. No more context switching. Just pure focus.
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
                  Pin any website — WhatsApp, Gmail, docs, or dashboards. Browse without leaving your workspace.
                  Perfect for quick references while coding or writing.
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
                  Never lose copied content again. Berri saves everything you copy — text, images, code snippets.
                  Search, filter, and paste anything from your history with a shortcut.
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
                  <h3 className="text-2xl font-bold">Smart Notes & Folders</h3>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Jot down quick notes that stay on top while you work. Organize screenshots, links, and snippets
                  into smart folders. Assign shortcuts to each folder for instant access.
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
        </div>
      </div>
    </section>
  );
}
