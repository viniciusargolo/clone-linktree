import Link from "next/link";

export default function Header() {
    return (
        <header className="max-w-7xl mx-auto py-10">
            {/* anchor */}
            <div className="flex items-center gap-5 justify-center">
                <Link href={"/"} className="text-5xl p-2 text-transparent font-medium bg-gradient-to-r
                 from-pink-600 from-0% to-pink-300 to-95% bg-clip-text
                hover:animate-pulse hover:scale-110 hover:-rotate-2 transform transition-all duration-300
                ">anchor<i>fy</i></Link>
            </div>
        </header>
    )
}