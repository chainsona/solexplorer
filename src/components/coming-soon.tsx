"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function ComingSoon(props: {
  text: string;
  words: {
    text: string;
    className?: string;
  }[];
}) {
  const { text, words } = props;

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        {text}
      </p>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
