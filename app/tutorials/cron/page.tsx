"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import CronBuilder from "../_components/CronBuilder";

function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <pre
      className={cn(
        "bg-muted text-sm px-3 py-2 rounded-md font-mono overflow-x-auto",
        className
      )}
    >
      {children}
    </pre>
  );
}

export default function CronTutorialPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Topbar
        title="Cron Expression Guide"
        subtitle="Learn how to schedule automated workflow executions"
        workflowId="tutorial"
        hideButtons={true}
        goBack={true}
      />

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Intro */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold">What is a Cron Expression?</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A <b>cron expression</b> is a simple string used to schedule tasks
            to run automatically at specific times. It’s made of <b>five</b>{" "}
            space-separated fields that represent time in UTC.
            <br />
            Cron expressions are commonly used to run background jobs, automated
            workflows, periodic updates, and more.
          </p>
        </section>

        <Separator />

        {/* Cron Fields */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Cron Format</h2>

          <Card className="p-6">
            <CodeBlock className="text-lg text-center">* * * * *</CodeBlock>
            <p className="text-center text-sm text-muted-foreground pt-2">
              Each <code>*</code> represents a time field.
            </p>
          </Card>

          <div className="grid md:grid-cols-5 gap-4 pt-2">
            {[
              { label: "Minute", range: "0 – 59" },
              { label: "Hour", range: "0 – 23" },
              { label: "Day of Month", range: "1 – 31" },
              { label: "Month", range: "1 – 12" },
              { label: "Day of Week", range: "0 – 6 (Sun–Sat)" },
            ].map((item) => (
              <Card key={item.label} className="p-4 space-y-2">
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.range}</p>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Common Cron Examples</h2>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <CodeBlock>0 * * * *</CodeBlock>
              <p className="text-muted-foreground">Every hour</p>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <CodeBlock>0 0 * * *</CodeBlock>
              <p className="text-muted-foreground">Every day at midnight</p>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <CodeBlock>0 12 * * 1</CodeBlock>
              <p className="text-muted-foreground">Every Monday at noon</p>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <CodeBlock>*/5 * * * *</CodeBlock>
              <p className="text-muted-foreground">Every 5 minutes</p>
            </div>
          </Card>
        </section>

        <Separator />

        {/* Tips */}
        <section className="space-y-6 pb-16">
          <h2 className="text-2xl font-semibold">Helpful Tips</h2>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <b>*</b> means “any value”
            </li>
            <li>
              You can specify ranges using <b>1-5</b>
            </li>
            <li>
              You can specify lists using <b>1,15,30</b>
            </li>
            <li>
              You can specify intervals using <b>*/10</b> (every 10 units)
            </li>
            <li>
              <b>All times are interpreted in UTC</b>
            </li>
          </ul>
        </section>
        <section>
          <CronBuilder />
        </section>
      </main>
    </div>
  );
}
