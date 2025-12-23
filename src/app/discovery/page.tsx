'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, X, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function DiscoveryPage() {
    const [profiles, setProfiles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const supabase = createClient()

    useEffect(() => {
        async function fetchProfiles() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .neq('id', user.id)
                .limit(20)

            if (data) setProfiles(data)
            setLoading(false)
        }
        fetchProfiles()
    }, [supabase])

    const handleLike = async (profileId: string) => {
        toast.success('Like sent! (Matching logic to be implemented in DB)')
        nextProfile()
    }

    const handleDislike = () => {
        nextProfile()
    }

    const nextProfile = () => {
        setCurrentIndex((prev) => prev + 1)
    }

    if (loading) return <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">Discovery Loading...</div>

    if (currentIndex >= profiles.length) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Plus aucun profil pour le moment !</h2>
                    <p className="text-zinc-400">Revenez plus tard ou élargissez vos critères.</p>
                </div>
            </div>
        )
    }

    const currentProfile = profiles[currentIndex]

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md relative aspect-[3/4]">
                <Card className="w-full h-full border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl">
                    <div className="h-full w-full relative">
                        <Avatar className="h-full w-full rounded-none">
                            <AvatarImage src={currentProfile.avatar_url} className="object-cover" />
                            <AvatarFallback className="bg-zinc-800 text-zinc-400 text-4xl">
                                {currentProfile.username?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <h3 className="text-2xl font-bold">{currentProfile.username}</h3>
                            <p className="text-zinc-300 text-sm line-clamp-2">{currentProfile.bio}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex gap-6 mt-8">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-16 w-16 rounded-full border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-red-500 hover:border-red-500 transition-all"
                    onClick={handleDislike}
                >
                    <X className="h-8 w-8" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-16 w-16 rounded-full border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-green-500 hover:border-green-500 transition-all"
                    onClick={() => handleLike(currentProfile.id)}
                >
                    <Heart className="h-8 w-8" />
                </Button>
            </div>
        </div>
    )
}
