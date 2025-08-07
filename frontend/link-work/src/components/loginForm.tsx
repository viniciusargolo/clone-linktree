'use client'

import { IconAlertCircle, IconCheck, IconChevronLeft, IconLoader3 } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginForm() {

    const [emailOrUsername, setEmailOrUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("http://localhost:3333/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ emailOrUsername, password })
            })

            const data = await response.json()

            
            if(!response.ok) {
                throw new Error(data.message || "Houve um erro ao tentar se cadastrar. Tente novamente!")
            }
            
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user))
            setSuccess(data.message)
            window.location.href = '/dashboard';

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
            function verifyUserLogged() {

                const token = localStorage.getItem("authToken")
            if(token) {
                window.location.href = "/dashboard"
            }
            
            return
        }
        verifyUserLogged()
    }, [])


    return (
        <div className="flex flex-col gap-20">
            <div className="flex justify-between items-center gap-5">
                <Link href="/" className="group justify-start flex gap-1 items-center py-2 text-xl text-zinc-400 hover:underline">
                    <IconChevronLeft className="transform group-hover:-translate-x-0.5 transition-transform duration-300" size={18}/>
                    Página inicial
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-xl text-zinc-400">Não possui um conta?</span>
                    <Link href="/register" className="group justify-start flex gap-1 items-center py-2 text-xl text-blue-600 underline">
                        Cadastre-se
                    </Link>
                </div>
            </div>
            <>
                {success && (<div className="flex items-center gap-2 justify-start bg-green-700/10 border-b-2 border-green-700 p-3 w-full">
                    <IconCheck size={22} stroke={2} className="text-green-700"/>
                    <p className="text-green-700 text-md font-medium">Login efetuado com sucesso.</p>
                </div>)
                }
                {error && <div className="flex items-center gap-2 justify-start bg-red-700/10 border-b-2 border-red-700 p-3 w-full">
                <IconAlertCircle size={22} stroke={2} className="text-red-700"/>
                <p className="text-red-700 text-md font-medium">{error}</p>
                </div>}
            </>
            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-5 w-full">
                <div className="w-full">
                    <label htmlFor="emailOrUsername" className="font-medium text-xl text-pink-500">E-mail ou usuário</label>
                    <input value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} id="emailOrUsername" name="emailOrUsername" type="text" placeholder="Ex.: fulanodetal@email.com ou seu usuário" className="
                    border-b-2 border-zinc-600 p-5 w-full focus:border-pink-500 outline-0 text-zinc-400
                    text-2xl
                    " required/>
                </div>
                <div className="w-full"> 
                    <label htmlFor="password" className="font-medium text-xl text-pink-500">Senha</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" placeholder="Sua senha..." className="
                    border-b-2 border-zinc-600 p-5 w-full focus:border-pink-500 outline-0 text-zinc-400
                    text-2xl
                    " required/>
                </div>
                {/* <span className="text-zinc-400 block w-full text-xs text-center pt-5">Se tudo estiver OK, você será redirecionado, automaticamente, para fazer o login.</span> */}
                <button disabled={isLoading} type="submit" className="mt-5 w-full bg-pink-500 text-black font-medium text-xl py-5 cursor-pointer transform hover:translate-y-1 transition-all duration-300 hover:bg-pink-400">
                    {isLoading ? <span className="flex items-center gap-2 justify-center"><IconLoader3 className="animate-spin" size={18} /> Entrando...</span> : "Entrar"}
                </button>
            </form>
            <div className="flex flex-col gap-2 items-center text-zinc-400">
                <span className="text-center text-zinc-400 text-xs">Ao utilizar nossos serviços, automaticamente, você está aceitando e concordando com os nossos <Link className="text-blue-600 underline font-medium" href={"/terms-of-use"}>termos de uso</Link>.</span>
                <span className="text-sm">&copy; All rights reserved. <strong>Anchorfy&reg;</strong>, 2025</span>
            </div>
        </div>
    )
}



