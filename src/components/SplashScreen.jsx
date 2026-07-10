import { motion } from "framer-motion";
import logoimg from "../assets/logoimg.jpg";

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={logoimg}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-blue-950/70 backdrop--sm" />

      {/* Animated Blur Circles */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-5xl md:text-7xl font-extrabold text-white"
        >
          Welcome
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
          }}
          className="mt-5 text-lg text-blue-100"
        >
          Loading Portfolio...
        </motion.p>

        {/* Loader */}

        <div className="mt-10 flex justify-center">

          <div className="flex gap-3">

            {[0,1,2].map((i)=>(
              <motion.div
                key={i}
                className="h-4 w-4 rounded-full bg-white"
                animate={{
                  y:[0,-10,0],
                  opacity:[0.4,1,0.4]
                }}
                transition={{
                  repeat:Infinity,
                  duration:0.8,
                  delay:i*0.2
                }}
              />
            ))}

          </div>

        </div>

      </div>
    </motion.div>
  );
}