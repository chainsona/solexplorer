"use client";

import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export function SolanaMetricsTrendingCoins(props: { className?: string }) {
  const [coins, setCoins] = React.useState<
    {
      name: string;
      image: string;
      url: string;
    }[]
  >([]);

  const fetchTrendingCoinsFromJupiter = useCallback(async () => {
    const res = await fetch("/api/trending-coins");
    const data = await res.json();
    setCoins(data.coins);
  }, []);

  useEffect(() => {
    fetchTrendingCoinsFromJupiter();
  }, []);

  // TODO: Implement server side caching to avoid rate limiting
  // useEffect(() => {
  //   // Fetch trending coins from Jupiter repeatedly
  //   const interval = setInterval(() => {
  //     fetchTrendingCoinsFromJupiter();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [fetchTrendingCoinsFromJupiter]);

  return (
    <BentoGridItem
      title={"Trending Coins"}
      description={
        <span className="text-sm">Top 3 trending coins by daily volume</span>
      }
      header={<SkeletonTrendingCoins {...{ coins }} />}
      className={cn("[&>p:text-lg] md:col-span-2", props.className)}
    />
  );
}

const SkeletonTrendingCoins = (props: {
  coins: {
    name: string;
    image: string;
    url: string;
  }[];
}) => {
  const { coins } = props;

  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      {coins?.length > 2 && (
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
        >
          <motion.div
            variants={first}
            className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
          >
            <Image
              src={coins[1].image}
              alt="avatar"
              height="100"
              width="100"
              className="rounded-full h-10 w-10"
            />
            <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
              {coins[1].name}
            </p>
            <p className="border border-gray-500 bg-gray-100 dark:bg-gray-900/20 text-gray-400 text-xs rounded-full px-2 py-0.5 mt-4">
              #2
            </p>

            <Button
              className="mt-4"
              onClick={() => {
                window.open(coins[1].url, "_blank");
              }}
            >
              Swap
            </Button>
          </motion.div>

          <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
            <Image
              src={coins[0].image}
              alt="avatar"
              height="100"
              width="100"
              className="rounded-full h-10 w-10"
            />
            <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
              {coins[0].name}
            </p>
            <p className="border border-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-400 text-xs rounded-full px-2 py-0.5 mt-4">
              #1
            </p>

            <Button
              className="mt-4"
              onClick={() => {
                window.open(coins[0].url, "_blank");
              }}
            >
              Swap
            </Button>
          </motion.div>
          <motion.div
            variants={second}
            className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
          >
            <Image
              src={coins[2].image}
              alt="avatar"
              height="100"
              width="100"
              className="rounded-full h-10 w-10"
            />
            <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
              {coins[2].name}
            </p>
            <p className="border border-orange-900 bg-orange-200 dark:bg-orange-900/20 text-orange-700 text-xs rounded-full px-2 py-0.5 mt-4">
              #3
            </p>

            <Button
              className="mt-4"
              onClick={() => {
                window.open(coins[2].url, "_blank");
              }}
            >
              Swap
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
