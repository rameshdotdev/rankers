import { CreditCard } from "lucide-react";

export default function Pass() {
  return (
    <div className="py-12 text-center">
      <div className="inline-block p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 mb-4">
        <CreditCard className="w-8 h-8 text-zinc-400" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
        Coming Soon
      </h3>
      <p className="text-zinc-500 mt-2 font-mono text-sm">
        UPGRADE MODULES ARE CURRENTLY OFFLINE
      </p>
    </div>
  );
}
