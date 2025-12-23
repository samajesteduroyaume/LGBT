'use client';

import { motion } from 'framer-motion';

export function GoldLoader() {
    return (
        <div className="flex items-center justify-center">
            <div className="relative h-16 w-16">
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-amber-500/20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full border-t-2 border-amber-500"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute inset-2 rounded-full bg-gradient-to-tr from-amber-200 via-amber-500 to-amber-200 opacity-20 blur-md"
                    animate={{
                        scale: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </div>
    );
}
