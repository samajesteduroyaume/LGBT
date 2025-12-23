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

    if (loading) return <div className="flex min-h-screen items-center justify-center bg-black text-amber-500 font-bold uppercase tracking-widest">Initialisation...</div>

    if (currentIndex >= profiles.length) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
                <div className="text-center">
                    <h2 className="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">Silence Royal</h2>
                    <p className="text-zinc-500 text-lg uppercase tracking-widest font-medium">L'exceptionnel se fait attendre.</p>
                </div>
            </div>
        )
    }

    const currentProfile = profiles[currentIndex]

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
            <div className="w-full max-w-md relative aspect-[3/4]">
                <Card className="w-full h-full border-amber-500/10 bg-zinc-950 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-amber-500/20">
                    <div className="h-full w-full relative">
                        <Avatar className="h-full w-full rounded-none">
                            <AvatarImage src={currentProfile.avatar_url} className="object-cover" />
                            <AvatarFallback className="bg-zinc-900 text-amber-500/30 text-6xl font-black">
                                {currentProfile.username?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent text-white">
                            <h3 className="text-3xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">{currentProfile.username}</h3>
                            <p className="text-zinc-500 text-sm font-medium tracking-wide line-clamp-2 uppercase">{currentProfile.bio}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex gap-8 mt-12">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-20 w-20 rounded-full border-amber-500/10 bg-zinc-950 text-zinc-600 hover:text-amber-200 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all shadow-xl"
                    onClick={handleDislike}
                >
                    <X className="h-10 w-10" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-20 w-20 rounded-full border-amber-500/20 bg-zinc-950 text-amber-500 hover:text-amber-400 hover:border-amber-500 hover:bg-amber-500/10 transition-all shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                    onClick={() => handleLike(currentProfile.id)}
                >
                    <Heart className="h-10 w-10 fill-current" />
                </Button>
            </div>
        </div>
    )
}
