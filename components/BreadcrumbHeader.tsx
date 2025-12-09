"use client";

import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";
import { MobileSidebar } from "./Sidebar";

function BreadcrumbHeader() {
  const pathname = usePathname();
  const paths = pathname === "/" ? [""] : pathname?.split("/");

  return (
    <div className="flex items-center flex-start">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <BreadcrumbItem key={index}>
              {index > 0 && <span className="mx-1">&gt;</span>}
              <BreadcrumbLink className="capitalize" href={`/${path}`}>
                {path === "" ? "home" : path}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbHeader;
