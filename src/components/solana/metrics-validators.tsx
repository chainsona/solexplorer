"use client";

import { motion } from "framer-motion";
import React, { use, useCallback, useEffect } from "react";
import { Connection, VoteAccountInfo } from "@solana/web3.js";

import { BentoGridItem } from "@/components/ui/bento-grid";

import { config } from "@/config";

import { cn } from "@/lib/utils";

export function SolanaMetricsValidators(props: { className?: string }) {
  const [validators, setValidators] = React.useState<
    {
      activatedStake: number;
      commission: number;
      epochVoteAccount: boolean;
      lastVote: number;
      nodePubkey: string;
      votePubkey: string;
    }[]
  >([]);

  const fetchValidators = useCallback(async () => {
    const connection = new Connection(config.rpcEndpoint);
    const { current } = await connection.getVoteAccounts();

    const validators_ = current.map((v: VoteAccountInfo) => {
      return {
        activatedStake: v.activatedStake,
        commission: v.commission,
        epochVoteAccount: v.epochVoteAccount,
        lastVote: v.lastVote,
        nodePubkey: v.nodePubkey,
        votePubkey: v.votePubkey,
      };
    });
    setValidators(validators_);
  }, []);

  useEffect(() => {
    fetchValidators();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchValidators();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchValidators]);

  return (
    <BentoGridItem
      title={`${validators.length} validators`}
      description={<span className="text-sm">Nakamoto Coefficient: 19</span>}
      header={<SkeletonValidators />}
      className={cn("[&>p:text-lg] md:col-span-1", props.className)}
    />
  );
}

const SkeletonValidators = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};
