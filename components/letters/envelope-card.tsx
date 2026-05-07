"use client";

import { motion } from "framer-motion";

export default function EnvelopeCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full h-40 group cursor-pointer"
    >
      {/* Envelope Body */}
      <div className="absolute inset-0 bg-[#f3d5c0] rounded-sm shadow-md border border-[#e6bfa8]/50 overflow-hidden">
        {/* Bottom Fold Effect */}
        <div
          className="absolute inset-0 bg-[#eec9ae]"
          style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
        />

        {/* Left/Right Fold Effect */}
        <div
          className="absolute inset-0 bg-[#f7dcc6]"
          style={{ clipPath: "polygon(0 0, 0 100%, 40% 50%)" }}
        />
        <div
          className="absolute inset-0 bg-[#f7dcc6]"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 60% 50%)" }}
        />

        {/* Top Flap */}
        <div
          className="absolute top-0 left-0 right-0 h-20 bg-[#e6bfa8] shadow-sm z-10 transition-transform group-hover:-translate-y-1"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        ></div>

        {/* The 214Hz Wax Seal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-10 h-10 bg-rose-800 rounded-full flex items-center justify-center shadow-lg border-2 border-rose-900 rotate-12 group-hover:rotate-0 transition-transform">
            <span className="text-[8px] text-rose-100 font-bold font-mono tracking-tighter">
              214Hz
            </span>
          </div>
        </div>
      </div>

      {/* Optional Tag below */}
      <div className="absolute -bottom-6 left-0 right-0 text-center">
        <p className="text-[10px] text-stone-400 font-mono uppercase tracking-tighter">
          Signal: 214.00
        </p>
      </div>
    </motion.div>
  );
}
