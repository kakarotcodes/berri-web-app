import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

          <div className="relative text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              <span>Ready to get started?</span>
            </div>

            <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
              {/* Transform your data into */}
              Why choose
              <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
                {" "}
                Berri?
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Berri is designed for focus and reduces context switching by
              keeping the tools you reach for most right where you’re working
              and supports global shortcuts. Capture → find → act without
              changing apps
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="group rounded-full">
                Start Your Free Trial
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Schedule a Demo
              </Button>
            </div>

            {/* <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-green-500" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-blue-500" />
                                <span>14-day free trial</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-purple-500" />
                                <span>Cancel anytime</span>
                            </div>
                        </div> */}
          </div>

          <div className="absolute -bottom-6 -right-6 size-32 rounded-full bg-gradient-to-t from-primary/20 to-transparent blur-3xl" />
          <div className="absolute -left-6 -top-6 size-32 rounded-full bg-gradient-to-b from-primary/20 to-transparent blur-3xl" />
        </div>
      </div>
    </section>
  );
}
