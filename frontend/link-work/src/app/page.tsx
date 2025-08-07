import Header from "@/components/header"
import { IconArrowUpRight } from "@tabler/icons-react"
import Link from "next/link"

export default function Home() {

  return (
    <div className="px-10 relative min-h-screen selection:bg-pink-400 selection:text-white">
      <Header />
      <div className="w-full flex flex-col gap-10 mt-30 py-5 items-center justify-center">
        <h1 className="text-7xl font-bold w-full text-center ">Permita que os seus fãs te encontre...</h1>
      </div>
      <div className="flex flex-col gap-20 items-center">
        <Link href="/register" className="w-full flex group justify-center items-center bg-pink-500 hover:bg-pink-400 p-10 mt-20 border-2 border-black">
          <span className="font-medium text-center text-7xl uppercase">Quero me conectar</span>
          <IconArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-5 transition-all duration-300" size={70}/>
        </Link>
        <Link href={"/login"} className="text-4xl font-medium hover:underline underline-offset-1">Já tenho conta</Link>
      </div>
    </div>
  )
}
