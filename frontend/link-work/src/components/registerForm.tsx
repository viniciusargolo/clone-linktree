'use client'

import { IconAlertCircle, IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("http://localhost:3333/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, username, password })
            })

            await response.json()
            
            if(!response.ok) {
                throw new Error("Houve um erro ao tentar se cadastrar. Tente novamente!")
            }

            window.location.href = '/login';

        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="flex flex-col gap-20">
            <div className="flex justify-between items-center gap-5">
                <Link href="/" className="group justify-start flex gap-1 items-center py-2 text-xl text-zinc-400 hover:underline">
                    <IconChevronLeft className="transform group-hover:-translate-x-0.5 transition-transform duration-300" size={18}/>
                    Página inicial
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-xl text-zinc-400">Já tem conta?</span>
                    <Link href="/login" className="group justify-start flex gap-1 items-center py-2 text-xl text-blue-600 underline">
                        Login
                    </Link>
                </div>
            </div>
            <div>
                {error && <div className="flex items-center gap-2 justify-start bg-red-700/10 border-b-2 border-red-700 p-3 w-full">
                <IconAlertCircle size={22} stroke={2} className="text-red-700"/>
                <p className="text-red-700 text-md font-medium">{error}</p>
                </div>}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-5 w-full">
                <div className="w-full">
                    <label htmlFor="name" className="font-medium text-xl text-pink-500">Nome Completo</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" type="text" placeholder="Ex.: Fulano de tal" className="
                    border-b-2 border-zinc-600 p-5 w-full focus:border-blue-600 outline-0 text-zinc-400
                    text-2xl
                    " required/>
                </div>
                <div className="w-full">
                    <label htmlFor="email" className="font-medium text-xl text-pink-500">E-mail</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" placeholder="Ex.: fulanodetal@email.com" className="
                    border-b-2 border-zinc-600 p-5 w-full focus:border-blue-600 outline-0 text-zinc-400
                    text-2xl
                    " required/>
                </div>
                <div className="flex items-center gap-5 w-full">
                    <div className="w-full">
                        <label htmlFor="username" className="font-medium text-xl text-pink-500">Usuário</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" type="text" placeholder="Ex.: fulanodetaloficial" className="
                        border-b-2 border-zinc-600 p-5 w-full focus:border-blue-600 outline-0 text-zinc-400
                        text-2xl
                        " required/>
                    </div>
                    <div className="w-full"> 
                        <label htmlFor="password" className="font-medium text-xl text-pink-500">Senha</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" placeholder="Informe uma senha forte" className="
                        border-b-2 border-zinc-600 p-5 w-full focus:border-blue-600 outline-0 text-zinc-400
                        text-2xl
                        " required/>
                    </div>
                </div>
                <span className="text-zinc-400 block w-full text-xs text-center pt-5">Se tudo estiver OK, você será redirecionado, automaticamente, para fazer o login.</span>
                <button disabled={isLoading} type="submit" className="mt-5 w-full bg-pink-500 text-black font-medium text-xl py-5 cursor-pointer transform hover:translate-y-1 transition-all duration-300 hover:bg-pink-400">
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
            <div className="flex flex-col gap-2 items-center text-zinc-400">
                <span className="text-center text-zinc-400 text-xs">Ao se cadastrar, automaticamente, você está aceitando e concordando com os nossos <Link className="text-blue-600 underline font-medium" href={"/terms-of-use"}>termos de uso</Link>.</span>
                <span className="text-sm">&copy; All rights reserved. <strong>Linkfy&reg;</strong>, 2025</span>
            </div>
        </div>
    )
}