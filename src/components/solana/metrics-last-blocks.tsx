"use client";

import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { Connection } from "@solana/web3.js";

import { BentoGridItem } from "@/components/ui/bento-grid";

import { config } from "@/config";

import { cn, timeSince } from "@/lib/utils";
import { Progress } from "../ui/progress";

export function SolanaMetricsLastBlocks(props: { className?: string }) {
  const [epoch, setEpoch] = React.useState<{
    epoch: number;
    slot: number;
    slotsInEpoch: number;
  }>({ epoch: 0, slot: 0, slotsInEpoch: 0 });
  const [lastBlocks, setLastBlocks] = React.useState<
    {
      hash: string;
      time: number;
      transactions: number;
    }[]
  >([]);

  const fetchLastBlocks = useCallback(async () => {
    const connection = new Connection(config.rpcEndpoint, {
      commitment: "confirmed",
    });
    const epoch = await connection.getEpochInfo();

    let block;
    try {
      block = await connection.getBlock(epoch.absoluteSlot, {
        maxSupportedTransactionVersion: 2,
      });
    } catch (error) {
      return;
    }

    setEpoch({
      epoch: epoch.epoch,
      slot: epoch.slotIndex,
      slotsInEpoch: epoch.slotsInEpoch,
    });

    if (!block || !block.blockTime) return;

    if (lastBlocks.find((b) => b.hash === block.blockhash)) return;

    const blocks = lastBlocks;
    blocks.unshift({
      hash: block.blockhash,
      time: block.blockTime,
      transactions: block.transactions.length,
    });

    setLastBlocks(blocks.slice(0, 6));
  }, [lastBlocks, setLastBlocks]);

  useEffect(() => {
    fetchLastBlocks();
  }, []);

  useEffect(() => {
    // Fetch last blocks repeatedly
    const interval = setInterval(() => {
      fetchLastBlocks();
    }, 1000);

    return () => clearInterval(interval);
  }, [epoch, fetchLastBlocks]);

  return (
    <BentoGridItem
      title={"Last blocks"}
      description={
        <span className="text-sm">
          Current Epoch: {epoch.epoch}{" "}
          <Progress
            value={
              epoch.epoch > 0 ? (epoch.slot / epoch.slotsInEpoch) * 100 : 0
            }
            className="mt-1 h-1 w-[50%]"
          />
        </span>
      }
      header={<SkeletonLastBlocks {...{ lastBlocks }} />}
      className={cn("[&>p:text-lg] md:col-span-1", props.className)}
    />
  );
}

const SkeletonLastBlocks = (props: {
  lastBlocks: {
    hash: string;
    time: number;
    transactions: number;
  }[];
}) => {
  const { lastBlocks } = props;
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  if (!lastBlocks.length) return;

  <motion.div
    initial="initial"
    animate="animate"
    whileHover="hover"
    className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
  >
    {arr.map((_, i) => (
      <motion.div
        key={"skelenton-two" + i}
        variants={variants}
        style={{
          maxWidth: Math.random() * (100 - 40) + 40 + "%",
        }}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
      ></motion.div>
    ))}
  </motion.div>;

  return (
    <div className="overflow-hidden flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] border border-transparent dark:border-white/[0.2] bg-neutral-50 dark:bg-black text-neutral-600 dark:text-neutral-300">
      <ul className="w-full text-sm">
        {lastBlocks.map((block, i) => (
          <li
            key={block.hash}
            className="w-full flex items-center justify-between gap-2 p-2"
          >
            <div className="">{timeSince(block.time)}</div>
            <p>
              {block.hash.slice(0, 6)}...{block.hash.slice(-6)}
            </p>
            <p className="text-xs">{block.transactions} txs</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
