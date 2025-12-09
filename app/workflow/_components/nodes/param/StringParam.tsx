"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import { TaskParam } from "@/types/task";
import React, { useEffect, useId, useState } from "react";

function StringParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const id = useId();

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-1">*</p>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        className="text-xs"
        value={value}
        placeholder="Enter value/let it be auto entered by an input from this node"
        onChange={(e: any) => updateNodeParamValue(e.target.value)}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2 whitespace-pre-line">
          {param.helperText}
        </p>
      )}
      {param.linkText && param.linkHref && (
        <a
          href={param.linkHref}
          className="text-blue-700 px-2 whitespace-pre-line"
        >
          {param.linkText}
        </a>
      )}
    </div>
  );
}

export default StringParam;
