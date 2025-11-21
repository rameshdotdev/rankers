import { getUser } from "@/utils/user";

export default function Profile() {
  const user = getUser();
  const handleEditProfile = () => {
    // future: open profile edit form / modal
    alert("Profile edit flow coming soon ✏️");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-6 p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm">
        <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
          {/* <UserCircle className="w-10 h-10 text-zinc-400" /> */}
          <img
            src={user.avatar}
            alt="username"
            className="w-20 h-20 rounded-full bg-contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-zinc-500 font-mono text-sm">{user.email}</p>
          <p className="text-zinc-500 font-mono text-xs mt-1">ID: {user.id}</p>
        </div>
        <button
          onClick={handleEditProfile}
          className="ml-auto text-sm text-emerald-600 font-mono hover:underline"
        >
          EDIT
        </button>
      </div>
    </div>
  );
}
