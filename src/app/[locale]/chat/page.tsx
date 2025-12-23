'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, ShieldAlert, Timer, Trash2, ShieldCheck, Sparkles, Video } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ChatPage() {
    const [messages, setMessages] = useState<any[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [user, setUser] = useState<any>(null)
    const [isSecretMode, setIsSecretMode] = useState(false)
    const supabase = createClient()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function setupChat() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            setUser(user)

            // Charger les derniers messages
            const { data } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true })

            if (data) setMessages(data)

            // Activer le temps réel
            const channel = supabase
                .channel('chat_main')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                    setMessages(prev => [...prev, payload.new])
                })
                .subscribe()

            return () => {
                supabase.removeChannel(channel)
            }
        }
        setupChat()
    }, [supabase])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    // Logique de suppression automatique pour le mode secret
    useEffect(() => {
        const timers = messages.filter(m => m.expires_at).map(msg => {
            const delay = new Date(msg.expires_at).getTime() - Date.now()
            if (delay > 0) {
                return setTimeout(() => {
                    setMessages(prev => prev.filter(m => m.id !== msg.id))
                    if (msg.sender_id === user?.id) toast.info("Message éphémère expiré.")
                }, delay)
            }
            return null
        })
        return () => timers.forEach(t => t && clearTimeout(t))
    }, [messages, user?.id])

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !user) return

        const expires_at = isSecretMode ? new Date(Date.now() + 10000).toISOString() : null

        const { error } = await supabase
            .from('messages')
            .insert({
                content: newMessage,
                sender_id: user.id,
                expires_at: expires_at,
                match_id: '00000000-0000-0000-0000-000000000000' // ID de test ou réel
            })

        if (error) {
            toast.error("L'élégance a été interrompue. (Erreur d'envoi)")
        } else {
            setNewMessage('')
            if (isSecretMode) {
                toast.success("Message secret envoyé (Expire dans 10s)", {
                    icon: <Timer className="h-4 w-4 text-amber-500" />,
                    className: "bg-zinc-950 border-amber-500/20 text-amber-200"
                })
            }
        }
    }

    return (
        <div className="flex h-screen flex-col bg-black text-white">
            <header className="flex items-center justify-between px-6 py-4 border-b border-amber-500/10 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-amber-500/20">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-zinc-900 text-amber-500 font-black">M</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">Marquis de Sade</h2>
                        <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">En ligne dans le cercle</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <Link href="/visio">
                        <button className="h-10 w-10 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 hover:bg-amber-500/10 transition-all shadow-lg">
                            <Video className="h-5 w-5" />
                        </button>
                    </Link>
                    <button className="text-zinc-500 hover:text-amber-500 transition-colors">
                        <ShieldCheck className="h-5 w-5" />
                    </button>
                </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`relative max-w-[85%] group`}>
                                <div className={`px-5 py-3 rounded-[2rem] shadow-xl ${msg.sender_id === user?.id
                                    ? msg.is_secret
                                        ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-tr-none border border-amber-500/40'
                                        : 'bg-zinc-100 text-zinc-900 rounded-tr-none'
                                    : 'bg-zinc-900 text-zinc-100 rounded-tl-none border border-white/5'
                                    }`}>
                                    <p className={`text-sm leading-relaxed ${msg.is_secret ? 'italic' : ''}`}>
                                        {msg.content}
                                    </p>

                                    <div className="flex items-center justify-end gap-2 mt-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                        {msg.is_secret && <Timer className="h-3 w-3 animate-pulse" />}
                                        <p className="text-[9px] font-bold uppercase tracking-tighter">
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                {msg.is_secret && (
                                    <div className="absolute -bottom-4 right-2 text-[8px] font-black text-amber-500/60 uppercase tracking-widest">
                                        Ephémère
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <footer className="p-6 border-t border-amber-500/10 bg-zinc-950/80 backdrop-blur-xl">
                <form onSubmit={sendMessage} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 px-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`relative h-6 w-11 rounded-full transition-colors ${isSecretMode ? 'bg-amber-500' : 'bg-zinc-800'}`}>
                                <motion.div
                                    animate={{ x: isSecretMode ? 22 : 4 }}
                                    className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm"
                                />
                            </div>
                            <input
                                type="checkbox"
                                checked={isSecretMode}
                                onChange={(e) => setIsSecretMode(e.target.checked)}
                                className="hidden"
                            />
                            <div className="flex flex-col">
                                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isSecretMode ? 'text-amber-500' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                                    Mode Secret
                                </span>
                                {isSecretMode && <span className="text-[8px] text-amber-500/60 font-medium">Disparition en 10s</span>}
                            </div>
                        </label>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="flex-1 relative">
                            <Input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={isSecretMode ? "Confiez votre secret..." : "Échangez avec élégance..."}
                                className={`h-14 rounded-2xl border-amber-500/10 bg-black text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-amber-500/30 transition-all ${isSecretMode ? 'border-amber-500/30 ring-1 ring-amber-500/10' : ''}`}
                            />
                            <Sparkles className={`absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500/20 transition-opacity ${isSecretMode ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                        <Button
                            type="submit"
                            size="icon"
                            className={`h-14 w-14 rounded-2xl transition-all shadow-2xl ${isSecretMode
                                ? 'bg-amber-500 hover:bg-amber-400 text-black'
                                : 'bg-zinc-100 hover:bg-white text-black'
                                }`}
                        >
                            <Send className="h-6 w-6" />
                        </Button>
                    </div>
                </form>
            </footer>
        </div>
    )
}
