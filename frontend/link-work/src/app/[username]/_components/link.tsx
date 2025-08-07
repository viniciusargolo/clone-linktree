import Link from "next/link"

interface linkProps {
    color: string | null
    url: string
    title: string
}

export default function LinkNEXT({color, url, title}: linkProps ){
    return (
        <Link href={url} rel="noopener noreferrer" target="_blank" className={`block bg-${color}-300 border-b-2 border-${color}-500 p-3 hover:bg-${color}-200 transition-all duration-300 transform hover:translate-x-1 text-center text-xl font-medium text-zinc-950`}>{title}</Link>
    )
}