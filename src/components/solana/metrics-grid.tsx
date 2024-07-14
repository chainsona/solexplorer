"use client";

import React from "react";
import { motion } from "framer-motion";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { SolanaMetricsLastBlocks } from "@/components/solana/metrics-last-blocks";
import { SolanaMetricsPrice } from "@/components/solana/metrics-price";
import { SolanaMetricsTPS } from "@/components/solana/metrics-tps";
import { SolanaMetricsTrendingCoins } from "@/components/solana/metrics-trending-coins";

import { cn } from "@/lib/utils";
import { SolanaMetricsValidators } from "./metrics-validators";

export function SolanaMetricsGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      <SolanaMetricsPrice />
      <SolanaMetricsLastBlocks />
      <SolanaMetricsTPS />
      <SolanaMetricsTrendingCoins />
      <SolanaMetricsValidators />
    </BentoGrid>
  );
}
