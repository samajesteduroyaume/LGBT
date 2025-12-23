'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send } from 'lucide-react'

export default function ChatPage() {
    const [messages, setMessages] = useState<any[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function setupChat() {
            const supabase = createClient()
            if (!supabase.auth) return // Handle build-time / missing env vars

            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            // Fetch initial messages (mocking a match_id for demo)
            // In a real app, match_id would be a param
            /*
            const { data } = await supabase
              .from('messages')
              .select('*')
              .order('created_at', { ascending: true })
            if (data) setMessages(data)
            */

            // Subscribe to real-time messages
            const channel = supabase
                .channel('realtime:messages')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload: any) => {
                    setMessages((prev) => [...prev, payload.new])
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

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !user) return

        const messageObj = {
            content: newMessage,
            sender_id: user.id,
            created_at: new Date().toISOString(),
        }

        // Pessimistic UI for demo purpose, real app would insert into Supabase
        setMessages((prev) => [...prev, messageObj])
        setNewMessage('')

        // await supabase.from('messages').insert({ content: newMessage, sender_id: user.id })
    }

    return (
        <div className="flex h-screen flex-col bg-zinc-950 text-white">
            <header className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-zinc-800">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-zinc-800 text-zinc-400">U</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-semibold">Chat de Discussion</h2>
                        <p className="text-xs text-green-500">En ligne</p>
                    </div>
                </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-zinc-500 mt-20">
                        Commencez la conversation !
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender_id === user?.id
                            ? 'bg-zinc-100 text-zinc-900 rounded-tr-none'
                            : 'bg-zinc-800 text-zinc-100 rounded-tl-none'
                            }`}>
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-[10px] opacity-50 mt-1 text-right">
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="p-4 border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
                <form onSubmit={sendMessage} className="flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez un message..."
                        className="border-zinc-800 bg-zinc-900 focus-visible:ring-zinc-700"
                    />
                    <Button type="submit" size="icon" className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </footer>
        </div>
    )
}
