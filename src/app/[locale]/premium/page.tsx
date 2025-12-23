'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Rocket, ShieldCheck, Crown, CheckCircle2 } from 'lucide-react'

const PLANS = [
    {
        name: 'Gratuit',
        price: '0€',
        features: ['5 likes par jour', 'Forum accès limité', 'Chat basique'],
        icon: Rocket,
        color: 'text-zinc-500',
        buttonText: 'Plan Actuel',
        current: true
    },
    {
        name: 'Premium',
        price: '9.99€/mois',
        features: ['Likes illimités', 'Visio illimitée', 'Accès prioritaire', 'Badge profil vérifié'],
        icon: Crown,
        color: 'text-amber-500',
        buttonText: 'Passer au Premium',
        current: false,
        recommended: true
    }
]

export default function PremiumPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Boostez votre expérience</h1>
                <p className="text-zinc-400 max-w-lg mx-auto">Débloquez toutes les fonctionnalités et multipliez vos chances de rencontre.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {PLANS.map((plan) => {
                    const Icon = plan.icon
                    return (
                        <Card key={plan.name} className={`relative border-zinc-800 bg-zinc-900/50 text-zinc-100 overflow-hidden ${plan.recommended ? 'ring-2 ring-zinc-100' : ''}`}>
                            {plan.recommended && (
                                <div className="absolute top-0 right-0 bg-zinc-100 text-zinc-900 text-[10px] font-bold uppercase px-3 py-1 rounded-bl-lg">
                                    Recommandé
                                </div>
                            )}
                            <CardHeader className="text-center pb-2">
                                <Icon className={`h-12 w-12 mx-auto mb-4 ${plan.color}`} />
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <div className="text-3xl font-bold mt-2">{plan.price}</div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-zinc-400">
                                            <CheckCircle2 className="h-4 w-4 text-zinc-100 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full h-12 text-md font-semibold ${plan.current
                                            ? 'bg-zinc-800 text-zinc-500 pointer-events-none'
                                            : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                                        }`}
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="mt-12 text-center text-xs text-zinc-600 flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Paiement sécurisé via Stripe
            </div>
        </div>
    )
}
