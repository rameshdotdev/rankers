import { getUser } from "@/utils/user";

export default function Profile() {
  const user = getUser();
  const handleEditProfile = () => {
    // future: open profile edit form / modal
    alert("Profile edit flow coming soon ✏️");
  };

  return (
    <div className="w-full max-w-2xl mx-auto md:mx-0 px-4 sm:px-0 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        {/* Text content */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold break-words">
            {user.name}
          </h3>
          <p className="text-zinc-500 font-mono text-xs sm:text-sm break-all">
            {user.email}
          </p>
          <p className="text-zinc-500 font-mono text-[10px] sm:text-xs mt-1">
            ID: {user.id}
          </p>
        </div>

        {/* Edit button */}
        <button
          onClick={handleEditProfile}
          className="w-full sm:w-auto sm:ml-auto text-xs sm:text-sm text-emerald-600 font-mono hover:underline mt-2 sm:mt-0"
        >
          EDIT
        </button>
      </div>
    </div>
  );
}
