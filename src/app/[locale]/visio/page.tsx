import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Sparkles, ShieldCheck } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

export default function VisioPage() {
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        async function startVideo() {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                })
                setStream(mediaStream)
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream
                }
            } catch (err) {
                console.error("Erreur d'accès à la webcam:", err)
                toast.error("L'accès à la caméra a été refusé ou n'est pas disponible.")
            }
        }

        startVideo()

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = isVideoOff
            })
            setIsVideoOff(!isVideoOff)
        }
    }

    const toggleAudio = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = isMuted
            })
            setIsMuted(!isMuted)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-black text-white overflow-hidden relative">
            {/* Background Texture Luxe */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.05),transparent)] pointer-events-none" />

            {/* Remote Video (Full Screen Simulation) */}
            <div className="flex-1 relative bg-zinc-950 flex items-center justify-center">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6 z-10"
                    >
                        <div className="relative inline-block">
                            <Avatar className="h-40 w-40 mx-auto border-4 border-amber-500/20 shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-zinc-900 text-amber-500/30 text-6xl font-black italic">M</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-200 to-amber-500 p-2 rounded-full shadow-lg">
                                <Sparkles className="h-5 w-5 text-black" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2">
                                <h2 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">Marquis de Sade</h2>
                                <ShieldCheck className="h-5 w-5 text-amber-500" />
                            </div>
                            <p className="text-amber-500/60 font-medium uppercase tracking-[0.4em] text-[10px] animate-pulse">Signature Harmonique en cours...</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Local Video (Small Overlay) - Imperial Frame */}
                <motion.div
                    drag
                    dragConstraints={{ left: -300, right: 0, top: 0, bottom: 400 }}
                    className="absolute top-8 right-8 w-48 md:w-64 aspect-video bg-zinc-900 rounded-3xl border border-amber-500/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 group cursor-move"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none" />
                    {isVideoOff ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-amber-500/20 gap-2">
                            <VideoOff className="h-10 w-10" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Aura Masquée</span>
                        </div>
                    ) : (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                        />
                    )}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[8px] font-bold text-zinc-300 uppercase tracking-widest">Votre Éclat</span>
                    </div>
                </motion.div>
            </div>

            {/* Controls Bar - Floating Satin */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-24 px-8 rounded-[2rem] bg-zinc-950/80 backdrop-blur-2xl border border-amber-500/10 flex items-center justify-center gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-50">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${isMuted ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'bg-white/5 text-zinc-400 border border-white/10 hover:border-amber-500/40 hover:text-amber-500'}`}
                    onClick={toggleAudio}
                >
                    {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'bg-white/5 text-zinc-400 border border-white/10 hover:border-amber-500/40 hover:text-amber-500'}`}
                    onClick={toggleVideo}
                >
                    {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1, rotate: 135 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-16 w-16 rounded-3xl bg-gradient-to-r from-red-500 to-red-700 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(239,68,68,0.3)] transition-all"
                    onClick={() => window.history.back()}
                >
                    <PhoneOff className="h-7 w-7" />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-14 w-14 rounded-2xl bg-white/5 text-zinc-400 border border-white/10 flex items-center justify-center hover:border-amber-500/40 hover:text-amber-500 transition-all"
                >
                    <Settings className="h-6 w-6" />
                </motion.button>
            </div>
        </div>
    )
}
