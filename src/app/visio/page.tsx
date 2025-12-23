'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function VisioPage() {
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)

    return (
        <div className="flex flex-col h-screen bg-zinc-950 text-white overflow-hidden">
            {/* Remote Video (Full Screen) */}
            <div className="flex-1 relative bg-zinc-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Avatar className="h-32 w-32 mx-auto border-4 border-zinc-800">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-zinc-800 text-zinc-400 text-4xl">J</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold">Jordan</h2>
                        <p className="text-zinc-500 animate-pulse">En attente de connexion...</p>
                    </div>
                </div>

                {/* Local Video (Small Overlay) */}
                <div className="absolute top-4 right-4 w-32 md:w-48 aspect-video bg-zinc-800 rounded-lg border-2 border-zinc-700 overflow-hidden shadow-xl">
                    {isVideoOff ? (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600">
                            <VideoOff className="h-8 w-8" />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                            <p className="text-[10px] text-zinc-500">Moi</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Controls Bar */}
            <div className="h-24 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-900 flex items-center justify-center gap-4 px-4">
                <Button
                    variant="outline"
                    size="icon"
                    className={`h-12 w-12 rounded-full border-zinc-800 ${isMuted ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-zinc-900 text-zinc-400'}`}
                    onClick={() => setIsMuted(!isMuted)}
                >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className={`h-12 w-12 rounded-full border-zinc-800 ${isVideoOff ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-zinc-900 text-zinc-400'}`}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>
                <Button
                    variant="destructive"
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-lg shadow-red-500/20"
                >
                    <PhoneOff className="h-6 w-6" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full border-zinc-800 bg-zinc-900 text-zinc-400"
                >
                    <Settings className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
