'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, MessageSquare, User, Bell, LayoutDashboard, MessageCircle, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function BottomNav() {
    const pathname = usePathname()
    const t = useTranslations('Nav')

    const navItems = [
        { name: t('discovery'), href: '/discovery', icon: Heart },
        { name: t('chat'), href: '/chat', icon: MessageCircle },
        { name: t('forum'), href: '/forum', icon: MessageSquare },
        { name: t('premium'), href: '/premium', icon: Crown },
        { name: t('notifications'), href: '/notifications', icon: Bell },
        { name: t('profile'), href: '/profile', icon: User },
    ]

    if (pathname.includes('/login')) return null

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-amber-500/20 md:px-12 shadow-[0_-5px_15px_rgba(251,191,36,0.05)]">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname.endsWith(item.href)
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative",
                                isActive ? "text-amber-500" : "text-zinc-600 hover:text-zinc-400"
                            )}
                        >
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative"
                            >
                                <Icon className={cn("h-6 w-6 transition-transform", isActive ? "drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "")} />
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute -inset-2 bg-amber-500/10 blur-md rounded-full -z-10"
                                    />
                                )}
                            </motion.div>
                            <span className={cn(
                                "text-[9px] uppercase tracking-[0.1em] font-bold transition-all",
                                isActive ? "opacity-100" : "opacity-60"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
