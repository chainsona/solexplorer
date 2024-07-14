"use client";

import { motion } from "framer-motion";
import React, { useCallback, useEffect } from "react";

import { BentoGridItem } from "@/components/ui/bento-grid";

import { cn, formatNumber } from "@/lib/utils";
import Link from "next/link";

export function SolanaMetricsPrice(props: { className?: string }) {
  const [price, setPrice] = React.useState<string>("");
  const [marketCap, setMarketCap] = React.useState<string>("");

  const fetchSolInfo = useCallback(async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/solana"
    );
    const data = await response.json();
    setMarketCap(formatNumber(data.market_data?.market_cap?.usd || 0));
    setPrice(data.market_data?.current_price?.usd || 0);
  }, []);

  useEffect(() => {
    fetchSolInfo();
  }, []);

  useEffect(() => {
    // Fetch price and market cap repeatedly
    const interval = setInterval(() => {
      fetchSolInfo();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchSolInfo]);

  return (
    <BentoGridItem
      title={"SOL Price"}
      description={
        <Link href="https://coingecko.com/en/coins/solana">
          <span className="text-sm">
            ${marketCap ? marketCap : "-"} Market cap
          </span>
        </Link>
      }
      header={<SkeletonSolPrice {...{ price }} />}
      className={cn("[&>p:text-lg] md:col-span-1", props.className)}
    />
  );
}

const SkeletonSolPrice = (props: { price: string }) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg flex items-center justify-center text-4xl font-semibold">
        ${props.price ? props.price : "-"}
      </motion.div>
    </motion.div>
  );
};
