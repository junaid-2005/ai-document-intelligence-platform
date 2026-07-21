import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Brain, FileText } from "lucide-react";

function IntroAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6,
            },
          }}
          className="
          fixed
          inset-0
          z-9999
          flex
          items-center
          justify-center
          overflow-hidden
          bg-slate-950
          "
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
            className="
            absolute
            h-162.5
            w-162.5
            rounded-full
            bg-blue-600/10
            blur-3xl
            "
          />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
            absolute
            h-180
            w-180
            rounded-full
            border
            border-blue-500/10
            "
          />

          <div className="relative text-center">
            <motion.div
              initial={{
                scale: 0,
                rotate: -180,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.9,
              }}
              className="
              relative
              mx-auto
              flex
              h-32
              w-32
              items-center
              justify-center
              rounded-4xl
              bg-linear-to-br
              from-blue-600
              via-indigo-600
              to-violet-600
              shadow-[0_35px_90px_rgba(37,99,235,.35)]
              "
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                absolute
                inset-0
                rounded-4xl
                border
                border-white/15
                "
              />

              <Brain
                size={58}
                className="
                absolute
                text-white/15
                "
              />

              <FileText
                size={34}
                className="
                relative
                z-10
                text-white
                "
              />
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className="
              mt-10
              text-6xl
              font-black
              tracking-tight
              text-white
              md:text-7xl
              "
            >
              DocAI
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.7,
              }}
              className="
              mt-5
              text-xl
              text-slate-300
              "
            >
              AI Document Intelligence Platform
            </motion.p>

            <motion.div
              className="
              mt-12
              flex
              justify-center
              gap-3
              "
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.35, 1, 0.35],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.18,
                    repeat: Infinity,
                  }}
                  className="
                  h-3
                  w-3
                  rounded-full
                  bg-blue-500
                  "
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroAnimation;
