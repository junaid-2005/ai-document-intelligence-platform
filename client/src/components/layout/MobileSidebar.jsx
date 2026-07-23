import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Sidebar from "../Sidebar";

function MobileSidebar({
  open,
  onClose,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={onClose}
            className="
            fixed
            inset-0
            z-40
            bg-slate-950/45
            backdrop-blur-sm
            lg:hidden
            "
          />

          <motion.div
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 28,
            }}
            className="
            fixed
            left-0
            top-0
            bottom-0
            z-50
            w-72
            bg-white
            shadow-2xl
            lg:hidden
            "
          >
            <button
              onClick={onClose}
              className="
              absolute
              right-4
              top-4
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              transition
              hover:bg-slate-100
              "
            >
              <X size={18} />
            </button>

            <div className="h-full overflow-y-auto">
              <Sidebar mobile />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileSidebar;