import { CreditCard, Shield } from "lucide-react";

export default function Account() {
  const handleConfigureSecurity = () => {
    // future: open security settings
    alert("Security configuration flow coming soon 🔐");
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div className="p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-zinc-500" />
          <span className="font-mono text-sm">SECURITY_PROTOCOL</span>
        </div>
        <button
          onClick={handleConfigureSecurity}
          className="text-xs bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-sm"
        >
          CONFIGURE
        </button>
      </div>
      <div className="p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-sm flex justify-between items-center opacity-50">
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-zinc-500" />
          <span className="font-mono text-sm">
            SUBSCRIPTION_STATUS: INACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
