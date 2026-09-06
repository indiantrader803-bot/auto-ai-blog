import { Coffee, Heart } from "lucide-react";

export default function BuyMeCoffee() {
  const username = process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE_USERNAME || "autoai";

  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-center sm:text-left">
        <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
          <Coffee className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">
            Enjoyed this analysis?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Support our independent AI research engine with a cup of coffee.
          </p>
        </div>
      </div>
      <a
        href={`https://buymeacoffee.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all"
      >
        <Coffee className="w-4 h-4 fill-slate-950" />
        Buy me a coffee
      </a>
    </div>
  );
}
