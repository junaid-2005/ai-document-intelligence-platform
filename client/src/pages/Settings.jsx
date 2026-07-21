import DashboardLayout from "../layouts/DashboardLayout";

import { LogOut } from "lucide-react";

import { signOut } from "../services/authService";

function Settings() {
  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your account.
          </p>

        </div>

        <div
          className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-6
          "
        >
          <button
            onClick={handleLogout}
            className="
            flex
            items-center
            gap-2
            bg-red-500
            hover:bg-red-600
            text-white
            px-5
            py-3
            rounded-2xl
            transition
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Settings;