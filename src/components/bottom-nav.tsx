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
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-t border-zinc-800 md:px-12">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-all duration-200",
                                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <Icon className={cn("h-6 w-6", isActive && "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]")} />
                            <span className="text-[10px] uppercase tracking-widest font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
