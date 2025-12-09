"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export default function CronBuilder() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dom, setDom] = useState("*");
  const [month, setMonth] = useState("*");
  const [dow, setDow] = useState("*");
  const [copied, setCopied] = useState(false);

  const cron = useMemo(() => {
    return `${minute} ${hour} ${dom} ${month} ${dow}`;
  }, [minute, hour, dom, month, dow]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(cron);
    setCopied(true);
    toast.success("Cron expression copied!");
    setTimeout(() => setCopied(false), 1200);
  };

  const numOptions = (max: number) => {
    let arr = [];
    for (let i = 0; i <= max; i++) arr.push(i.toString());
    return arr;
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Interactive Cron Builder</h2>
      <p className="text-muted-foreground text-sm">
        Select values and we’ll generate a valid cron expression you can copy
        and paste.
      </p>

      <Separator />

      {/* Grid Selects */}
      <div className="grid md:grid-cols-5 gap-4">
        {/* Minute */}
        <div className="space-y-2">
          <Label>Minute</Label>
          <Select onValueChange={setMinute} defaultValue="*">
            <SelectTrigger>
              <SelectValue placeholder="*" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">Every minute (*)</SelectItem>
              {numOptions(59).map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hour */}
        <div className="space-y-2">
          <Label>Hour</Label>
          <Select onValueChange={setHour} defaultValue="*">
            <SelectTrigger>
              <SelectValue placeholder="*" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">Every hour (*)</SelectItem>
              {numOptions(23).map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Day of Month */}
        <div className="space-y-2">
          <Label>Day of Month</Label>
          <Select onValueChange={setDom} defaultValue="*">
            <SelectTrigger>
              <SelectValue placeholder="*" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">Every day (*)</SelectItem>
              {Array.from({ length: 31 }).map((_, i) => {
                const v = (i + 1).toString();
                return (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Month */}
        <div className="space-y-2">
          <Label>Month</Label>
          <Select onValueChange={setMonth} defaultValue="*">
            <SelectTrigger>
              <SelectValue placeholder="*" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">Every month (*)</SelectItem>
              {Array.from({ length: 12 }).map((_, i) => {
                const v = (i + 1).toString();
                return (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Day of Week */}
        <div className="space-y-2">
          <Label>Day of Week</Label>
          <Select onValueChange={setDow} defaultValue="*">
            <SelectTrigger>
              <SelectValue placeholder="*" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">Every day (*)</SelectItem>
              <SelectItem value="0">0 — Sunday</SelectItem>
              <SelectItem value="1">1 — Monday</SelectItem>
              <SelectItem value="2">2 — Tuesday</SelectItem>
              <SelectItem value="3">3 — Wednesday</SelectItem>
              <SelectItem value="4">4 — Thursday</SelectItem>
              <SelectItem value="5">5 — Friday</SelectItem>
              <SelectItem value="6">6 — Saturday</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Cron Output */}
      <div className="flex items-center justify-between gap-4">
        <pre className="bg-muted p-3 rounded-md font-mono text-sm flex-1 overflow-x-auto">
          {cron}
        </pre>

        <Button
          onClick={copyToClipboard}
          className="shrink-0"
          variant="outline"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
    </Card>
  );
}
