import ComingSoon from "@/components/coming-soon";

export default function Explorer() {
  return (
    <main className="grow w-full pb-4">
      <ComingSoon
        {...{
          text: "Wen Validators",
          words: [
            {
              text: "Soon",
              className: "text-blue-500 dark:text-purple-500",
            },
          ],
        }}
      />
    </main>
  );
}
