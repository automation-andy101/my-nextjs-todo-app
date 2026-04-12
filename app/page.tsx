import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";
import { PlusCircle, CalendarDays, Flag } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        { /* Hero Section */ }
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black mb-6 text-6xl font-bold">Stay organised. Get things done.</h1>
            <p className="text-muted-foreground mb-10 text-xl">
              A simple, fast todo app to manage your daily tasks.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="h-12 px-8 text-lg font-medium cursor-pointer">
                  Start for free <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">Free forever. No credit card required. </p>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        {/* <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">


          </div>
        </section> */}

        {/* Features Section */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Capture tasks instantly
                </h3>
                <p className="text-muted-foreground">
                  Quickly add tasks as they come to mind and stay on top of everything without breaking your flow.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Plan your days clearly
                </h3>
                <p className="text-muted-foreground">
                  Organise tasks by today and upcoming so you always know what needs your attention next.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Flag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Focus on what matters
                </h3>
                <p className="text-muted-foreground">
                  Set priorities and cut through the noise so you can focus on the tasks that really matter.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
