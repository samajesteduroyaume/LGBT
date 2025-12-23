'use client'

import { createClient } from '@/utils/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react'

const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'match', content: 'Vous avez un nouveau match avec Jordan !', time: 'Il y a 2 min', icon: Heart, iconColor: 'text-red-500' },
    { id: 2, type: 'message', content: 'Alex vous a envoyé un message : "Salut ! Ça te dit..."', time: 'Il y a 15 min', icon: MessageCircle, iconColor: 'text-blue-500' },
    { id: 3, type: 'visit', content: 'Quelqu\'un a visité votre profil.', time: 'Il y a 1h', icon: UserPlus, iconColor: 'text-green-500' },
]

export default function NotificationsPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <header className="flex items-center gap-3 mb-8">
                    <Bell className="h-8 w-8 text-zinc-100" />
                    <h1 className="text-3xl font-bold">Notifications</h1>
                </header>

                <div className="space-y-4">
                    {MOCK_NOTIFICATIONS.map((notif) => {
                        const Icon = notif.icon
                        return (
                            <Card key={notif.id} className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-pointer text-zinc-100">
                                <CardContent className="flex items-start gap-4 p-4">
                                    <div className={`p-2 rounded-full bg-zinc-800 ${notif.iconColor}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{notif.content}</p>
                                        <p className="text-xs text-zinc-500 mt-1">{notif.time}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
