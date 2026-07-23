import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function UserMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="
      flex
      items-center
      gap-2
      px-4
      py-2
      rounded-xl
      hover:bg-slate-100
      "
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}

export default UserMenu;