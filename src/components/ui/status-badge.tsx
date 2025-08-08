import {CircleCheckBig, HandFist, Clover } from "lucide-react";
import {Badge} from "@/components/ui/badge";

function StatusBadge({ status }: { status: 'success' | 'praying' | 'try_harder' }) {
    const variants = {
        success: {className: "bg-green-950/75 text-green-500 text-md h-8 px-3 gap-2 flex items-center hover:bg-green-950 hover:border-green-500", icon: CircleCheckBig, text: 'success' },
        praying: {className: "bg-yellow-950/75 text-yellow-500 text-md h-8 px-3 gap-2 flex items-center hover:bg-yellow-950 hover:border-yellow-500", icon: Clover, text: 'praying' },
        try_harder: {className: "bg-red-950/75 text-red-500 text-md h-8 px-3 gap-2 flex items-center hover:bg-red-950 hover:border-red-500", icon: HandFist, text: 'try harder' }
    }

    const config = variants[status]

    return (
        <Badge className={config.className} >
            <config.icon className="!w-4 !h-4"/>
            {config.text}
        </Badge>
    )
}

export { StatusBadge }