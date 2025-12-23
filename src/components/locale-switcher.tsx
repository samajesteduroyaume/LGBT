'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: string) => {
        // pathname looks like "/fr/discovery"
        // we want to replace "fr" with "en"
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <Select value={locale} onValueChange={handleLocaleChange}>
            <SelectTrigger className="w-[120px] bg-black border-amber-500/20 text-amber-500/80 font-bold uppercase text-[10px] tracking-widest focus:ring-amber-500/30">
                <SelectValue placeholder="Langue" />
            </SelectTrigger>
            <SelectContent className="bg-black border-amber-500/20 text-zinc-400">
                <SelectItem value="fr" className="focus:bg-amber-500/10 focus:text-amber-500 uppercase text-[10px] font-bold tracking-widest">Français</SelectItem>
                <SelectItem value="en" className="focus:bg-amber-500/10 focus:text-amber-500 uppercase text-[10px] font-bold tracking-widest">English</SelectItem>
                <SelectItem value="de" className="focus:bg-amber-500/10 focus:text-amber-500 uppercase text-[10px] font-bold tracking-widest">Deutsch</SelectItem>
                <SelectItem value="es" className="focus:bg-amber-500/10 focus:text-amber-500 uppercase text-[10px] font-bold tracking-widest">Español</SelectItem>
            </SelectContent>
        </Select>
    );
}
