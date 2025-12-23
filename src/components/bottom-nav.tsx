'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, MessageSquare, User, Bell, LayoutDashboard, MessageCircle, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Discovery', href: '/discovery', icon: Heart },
    { name: 'Chat', href: '/chat', icon: MessageCircle },
    { name: 'Forum', href: '/forum', icon: MessageSquare },
    { name: 'Premium', href: '/premium', icon: Crown },
    { name: 'Alertes', href: '/notifications', icon: Bell },
    { name: 'Profil', href: '/profile', icon: User },
]

export function BottomNav() {
    const pathname = usePathname()

    if (pathname === '/login') return null

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-amber-500/20 md:px-12 shadow-[0_-5px_15px_rgba(251,191,36,0.05)]">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-all duration-300 group",
                                isActive ? "text-amber-500" : "text-zinc-600 hover:text-zinc-400"
                            )}
                        >
                            <Icon className={cn("h-6 w-6 transition-transform", isActive ? "scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "group-hover:scale-105")} />
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
