"use client";

import Topbar from "@/app/workflow/_components/topbar/Topbar";
import React from "react";

function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* --- TOPBAR --- */}
      <Topbar
        title="How to Find a Selector"
        subtitle="Tutorial: Finding the selector of an element using dev tools"
        workflowId="tutorial-page-selector"
        hideButtons={true}
        executionPage={true}
        goBack
      />

      {/* --- Sci-fi floating blobs --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl animate-radar"></div>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-24 animate-fade-in-up">
        {/* --- Title --- */}
        <h1 className="text-center text-5xl font-bold mb-8 animated-gradient-text">
          How to Find a CSS Selector
        </h1>

        <p className="text-center text-lg text-muted-foreground mb-16">
          A simple sci-fi guide to locating the exact element you want to
          scrape.
        </p>

        {/* --- Step Card 1 --- */}
        <div className="mb-12 rounded-xl border border-emerald-500/20 bg-card/30 p-6 backdrop-blur-md shadow-xl animate-float-slow">
          <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
            1. Open Developer Tools
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Right-click the element you want to scrape and select{" "}
            <span className="text-emerald-300">“Inspect”</span>. This opens the
            browser’s Developer Tools and highlights the exact HTML element.
          </p>

          <pre className="mt-4 rounded-lg bg-black/40 p-4 text-emerald-300 text-sm">
            {`<div class="product-price">$19.99</div>`}
          </pre>
        </div>

        {/* --- Step Card 2 --- */}
        <div className="mb-12 rounded-xl border border-emerald-500/20 bg-card/30 p-6 backdrop-blur-md shadow-xl animate-float-medium">
          <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
            2. Right-Click ➜ Copy ➜ Copy Selector
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            In the Elements panel, right-click the highlighted element. Choose{" "}
            <span className="text-emerald-300">“Copy Selector”</span>. This
            gives you the precise CSS path to that element.
          </p>

          <pre className="mt-4 rounded-lg bg-black/40 p-4 text-emerald-300 text-sm">
            {`#main > div.product > div.info > div.product-price`}
          </pre>
        </div>

        {/* --- Step Card 3 --- */}
        <div className="mb-16 rounded-xl border border-emerald-500/20 bg-card/30 p-6 backdrop-blur-md shadow-xl animate-float-slower">
          <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
            3. Paste the Selector Inside Your Scraper Node
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Inside your scraping workflow, paste the selector into the
            <span className="text-emerald-300"> "Selector”</span> field.
          </p>

          <pre className="mt-4 rounded-lg bg-black/40 p-4 text-emerald-300 text-sm">
            {`selector: "#main > div.product > div.info > div.product-price"`}
          </pre>
        </div>

        {/* --- Outro --- */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground">
            You're now ready to extract anything from any page.
            <span className="text-emerald-400"> Your scraper awaits. 🚀</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
