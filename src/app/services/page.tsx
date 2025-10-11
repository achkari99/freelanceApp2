import type { Metadata } from "next";



import Link from "next/link";



import { ArrowRight } from "lucide-react";



import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/data/services";









export const metadata: Metadata = {



  title: "ACH Services",



  description: "Explore ACH's 48H prototype program and the AI, engineering, and design capabilities we use to scale products for RightMind Lab partners." 



};







const engagementRhythm = [



  {



    name: "Day 0 -- Align",



    description: "Kickoff, success mapping, and access setup. We translate your vision into a crisp build brief.",



    duration: "0-4 hours"



  },



  {



    name: "Day 1 -- Build",



    description: "Design, architecture, and AI orchestration in parallel. We ship clickable or coded experiences you can test immediately.",



    duration: "Hours 4-32"



  },



  {



    name: "Day 2 -- Polish",



    description: "Feedback loops, refinement, and observability. We prepare assets, documentation, and a path to production.",



    duration: "Hours 32-48"



  },



  {



    name: "Beyond 48H -- Scale",



    description: "Matching engineering sprints to take the prototype to launch with the same ACH squad.",



    duration: "Weeks 1-6"



  }



];







const guarantees = [



  "Response within hours and a kickoff scheduled inside 24h",



  "Senior product, design, and engineering talent on every sprint",



  "Clean handoff docs: architecture, APIs, backlog, and next steps",



  "Transparent communication in the tools your team already uses"



];







export default function ServicesPage() {



  return (



    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">



      <header className="space-y-6">



        <Badge>Services</Badge>



        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">Better than AI--and faster. Here&rsquo;s how we build.</h1>



        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300">



          ACH prototypes in 48 hours, then scales those builds into resilient products. From AI copilots and SaaS platforms to design systems and transformation roadmaps, every engagement combines creativity, code, and operational clarity.



        </p>



        <div className="flex flex-wrap gap-4">



          <Button asChild size="lg">



            <Link href="/start-a-project">Start your 48H prototype</Link>



          </Button>



          <Button asChild variant="outline" size="lg">



            <Link href="/contact">Talk to the lab</Link>



          </Button>



        </div>



      </header>



      <section className="mt-12 space-y-8">

        <div className="space-y-4 text-center md:text-left md:space-y-5">
          <h2 className="font-display text-3xl text-slate-900 dark:text-white">What we build</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ACH squads cover AI orchestration, rapid prototyping, software engineering, and launch-readiness in a single run. Explore the services we adapt to every build.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.slug} id={service.slug}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-slate-900 dark:text-white">{service.name}</h2>
                  <Badge>{service.slug.replace("-", " ")}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
                <ul className="grid gap-2 text-sm text-slate-500 dark:text-slate-300">
                  {service.deliverables.map((item) => (
                    <li key={item} className="inline-flex items-center gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-500" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

      </section>



      <section className="mt-20 grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[2fr_1fr]">



        <div>



          <h2 className="font-display text-3xl text-slate-900 dark:text-white">Our 48-hour cadence</h2>



          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">



            Every engagement follows a predictable rhythm. We combine async documentation, rapid working sessions, and open communication so you always know where things stand.



          </p>



          <div className="mt-8 grid gap-6">



            {engagementRhythm.map((phase) => (



              <div key={phase.name} className="rounded-2xl border border-slate-100 bg-white/60 p-6 dark:border-slate-800 dark:bg-slate-950/40">



                <div className="flex items-center justify-between text-sm uppercase tracking-wide text-slate-400">



                  <span>{phase.duration}</span>



                  <span>{phase.name}</span>



                </div>



                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{phase.description}</p>



              </div>



            ))}



          </div>



        </div>



        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">



          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">What we promise</h3>



          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">



            {guarantees.map((item) => (



              <li key={item} className="flex items-start gap-2">



                <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-500" />



                {item}



              </li>



            ))}



          </ul>



          <Button asChild variant="ghost" className="mt-4">



            <Link href="/backstage">Peek inside the lab</Link>



          </Button>



        </aside>



      </section>



      <section className="mt-20 rounded-3xl bg-slate-950 p-10 text-white">



        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">



          <div>



            <h2 className="font-display text-3xl">Ready to build momentum?</h2>



            <p className="mt-3 max-w-xl text-sm text-slate-300">



              Share your challenge and we will tailor a sprint that fits--prototype only, production build, or ongoing AI operations. The first 48 hours are on us.



            </p>



          </div>



          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:border-white hover:bg-white/10">



            <Link href="/start-a-project">



              Share your brief



              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />



            </Link>



          </Button>



        </div>



      </section>



    </div>



  );



}





