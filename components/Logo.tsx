import { cn } from "@/lib/utils";
import { NetworkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo({
  fontSize = "text-2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
        <NetworkIcon size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className={` text-stone-700 dark:text-stone-300 `}>Extract</span>
        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          ly
        </span>
      </div>
    </Link>
  );
}

export default Logo;
