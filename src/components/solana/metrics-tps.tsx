"use client";

import React, { useCallback, useEffect } from "react";

import { ChartBar } from "@/components/charts/bar";
import { BentoGridItem } from "@/components/ui/bento-grid";

import { config } from "@/config";

import { cn } from "@/lib/utils";

export function SolanaMetricsTPS(props: { className?: string }) {
  const [tps, setTps] = React.useState<number>(0);
  const [tpsHistory, setTpsHistory] = React.useState<
    {
      key: string;
      value: number;
    }[]
  >([]);

  const fetchTps = useCallback(async () => {
    // Fetch True TPS
    // curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method":"getRecentPerformanceSamples", "params": [1]}'

    const response = await fetch(config.rpcEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getRecentPerformanceSamples",
        params: [1],
      }),
    });
    const data = await response.json();

    const slot = data.result[0].numSlots;
    const tps = Math.floor(
      data.result[0].numNonVoteTransactions / data.result[0].samplePeriodSecs
    );
    const history = tpsHistory.concat([{ key: slot, value: tps }]).slice(-10);

    setTps(tps);
    setTpsHistory(history);
  }, [tpsHistory, setTps, setTpsHistory]);

  useEffect(() => {
    // Fetch true TPS repeatedly
    const interval = setInterval(() => {
      fetchTps();
    }, 5000);

    return () => clearInterval(interval);
  }, [tpsHistory, fetchTps]);

  return (
    <BentoGridItem
      title={"True TPS"}
      description={<span className="text-sm">Non-voting transactions</span>}
      header={<SkeletonBarChart {...{ tps, tpsHistory }} />}
      className={cn("[&>p:text-lg] md:col-span-1", props.className)}
    />
  );
}

const SkeletonBarChart = (
  props: {
    tps: number;
    tpsHistory: {
      key: string;
      value: number;
    }[];
  } = {
    tps: 0,
    tpsHistory: [],
  }
) => (
  <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl">
    <div className="absolute top-4 right-8 text-xl font-semibold">
      {props.tps ? props.tps : "-"} <span className="text-sm">tx/s</span>
    </div>
    <ChartBar
      {...{
        label: "TPS",
        data: props.tpsHistory,
        color: "hsl(var(--chart-2))",
      }}
    />
  </div>
);
