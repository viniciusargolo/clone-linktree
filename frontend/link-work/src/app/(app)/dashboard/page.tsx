'use client'

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { IconAlertCircle, IconCancel, IconCheck, IconEye, IconGraph, IconHourglass, IconLinkPlus, IconLoader3, IconPaint, IconUserCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { formatLongDate } from "@/utils/formatDatetime";
import LinkRow, { LinkData } from "./_components/LinkRow";

interface Appearance {
    id: string
    pageBackground: string
    pageTextColor: string
    buttonBackground: string
    buttonTextColor: string
}

interface UserProfile {
  id: number
  name: string
  username: string
  email: string
  bio?: string
  avatarUrl?: string
  links?: LinkData[]
  plan?: string
  appearance: Appearance
}

export default function Dashboard() {
    
    const [user, setUser] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [section, setSection] = useState<"default" | "account" | "appearance" | "links" | "analytics">("default")
    const [success, setSuccess] = useState<string | null>(null)
    const router = useRouter()

    // Criar link
    const [modalLink, setModalLink] = useState<boolean>(false)
    const [titleLink, setTitleLink] = useState<string>("")
    const [urlLink, setUrlLink] = useState<string>("")

    const [name, setName] = useState(user?.name)
    const [bio, setBio] = useState(user?.bio)

    const [pageBackground, setPageBackground] = useState("#f5efe1")
    const [pageTextColor, setPageTextColor] = useState("#19191e")
    const [buttonBackground, setButtonBackground] = useState("#f6339a")
    const [buttonTextColor, setButtonTextColor] = useState("#19191e")

    const [currentPassword, setCurrentPassword ] = useState("")
    const [newPassword, setNewPassoword] = useState("")

    useEffect(() => {
        if (!error && !success) return

        const timer = setTimeout(() => {
            setError(null)
            setSuccess(null)
        }, 5000)

        return () => clearTimeout(timer)
    }, [error, success])

    function handleError(message: string) {
        setError(message)
        setTimeout(() => {
            setError(null)
        }, 5000)
    }

    function handleSuccess(message: string) {
        setSuccess(message)
        setTimeout(() => {
            setSuccess(null)
        }, 5000)
    }
   
   const fetchUserData = useCallback( async () => {
        const token = localStorage.getItem("authToken")
        
        if(!token) {
            setError("Você não está autenticado. Por favor, faça o login.")
            setIsLoading(false)
            localStorage.removeItem("userData")
            localStorage.removeItem("authToken")
            router.push("/login")
        }         
        
        try {
            const response = await fetch("http://localhost:3333/manage/profile/me", {
                method: "GET",
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            
            if (!response.ok) {
                const errorData = await response.json();
                localStorage.removeItem("userData")
                localStorage.removeItem("authToken")
                router.push("/login")
                throw new Error(errorData.message);
            }
            
            const userData = await response.json()
            setUser(userData)

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                console.error(error)
            }
        } finally {
            setIsLoading(false)
        }
    }, [router, setError, setIsLoading, setUser])

        
    useEffect(() => {
        fetchUserData()
        console.log(user?.appearance.buttonBackground)
    }, [fetchUserData])
    
    function handleLogout() {
            localStorage.removeItem("userData")
            localStorage.removeItem("authToken")
            window.location.href = "/login"
    }


    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault()

        const token = localStorage.getItem("authToken")
        if(!token) {
            setError("Você não está autenticado. Por favor, faça o login.")
            setIsLoading(false)
            router.push("/login")
        }   

        try {
            const response = await fetch("http://localhost:3333/manage/profile/me", {
            method: "PUT",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, bio })
            })

            if (!response.ok) {
             throw new Error("Você está tentando atualizar com os mesmos dados. Tente algo diferente! 👍")
            }

            const updatedUser = await response.json()
            setUser(updatedUser)
            setName(updatedUser.name)
            setBio(updatedUser.bio)
            window.location.reload()

        } catch (error) {
            if (error instanceof Error) {
            setError(error.message)
            setTimeout(() => {
                window.location.reload()
            }, 5000)
            }
        }
    }

    async function changePassword(e: React.FormEvent) {
        e.preventDefault()

        try {

            const token = localStorage.getItem("authToken")
            if(!token) {
                setError("Você não está autenticado. Por favor, faça o login.")
                setIsLoading(false)
                router.push("/login")
            }  

            const response = await fetch("http://localhost:3333/manage/profile/me/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            })

            if(!response.ok) {
                throw new Error("Algo não saiu como esperado. Tente novamente.")
            }

            const data = await response.json()
            setSuccess(data)
            setTimeout(() => {
                  setSuccess(null)
            }, 5000)

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                setTimeout(() => {
                  setError(null)
                }, 5000)
            }
        }
    }

    function handleModalLink() {
        setModalLink(prev => !prev)
    }

    async function createNewLink(e: React.FormEvent){
        e.preventDefault()
        try {
            const token = localStorage.getItem("authToken")
            if(!token) {
                setError("Você não está autenticado. Por favor, faça o login.")
                setIsLoading(false)
                router.push("/login")
            }

            const response = await fetch("http://localhost:3333/manage/links/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    title: titleLink,
                    url: urlLink
                 })
            })

            if(!response.ok) {
                throw new Error("Houve um erro ao tentar cadastrar o link. Tente novamente!")
            }

            const data = await response.json()
            setSuccess(data)
            window.location.reload()
            
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        }
    }

    async function updateTheme(e: React.FormEvent) {
        e.preventDefault()

        try {
            const token = localStorage.getItem("authToken")
            if(!token) {
                setError("Você não está autenticado. Por favor, faça o login.")
                setIsLoading(false)
                router.push("/login")
            }
            

            const response = await fetch(`http://localhost:3333/manage/appearance/${user?.appearance.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    pageBackground,
                    pageTextColor,
                    buttonBackground,
                    buttonTextColor
                 })
            })

            if(!response.ok) {
                throw new Error("Erro ao tentar mudar o tema. Tente novamente!")
            }

            const data = await response.json()
            setSuccess(data.message)
            
        } catch (error) {
            if(error instanceof Error){
                setError(error.message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        }
    }

   
    // async function deleteLink(e: React.FormEvent){

    // }

    
    if (isLoading) {
        return (
            <div className="flex items-center gap-2 justify-center min-h-screen animate-pulse">
                <IconLoader3 className="animate-spin"/>
                <span>Carregando...</span>
            </div>  
        )
    }

    if (!user) {
        return <div className="flex items-center justify-center min-h-screen">{error}</div>
    }

    return (
        <div className="min-h-screen px-10">
            <header className="max-w-7xl mx-auto flex gap-10 items-center justify-between py-10">
                <div className="flex flex-col">
                    <Link href={"/dashboard"} className="text-5xl p-2 text-transparent font-medium bg-gradient-to-r from-pink-600 from-0% to-pink-300 to-90% bg-clip-text">anchor<i>fy</i></Link>
                    <p className="text-md text-zinc-400">Gerencie a sua conta com o dashboard</p>
                </div>
                <div className="flex items-center gap-4">
                    <a href={`http://localhost:3000/${user.username}`} target="_blank" className="text-transparent font-medium bg-gradient-to-r from-blue-600 from-0% to-blue-300 to-90% bg-clip-text">Ver página</a>
                    <span className="font-medium text-xs">{user.name}</span>
                    <div className="w-12.5 h-12.5 relative">
                        <Image className='rounded-full object-conver' title={user.avatarUrl ? `Foto de ${user.name}` : "Usuário sem foto"} src={user.avatarUrl ? user.avatarUrl : '/user.jpg'} width={50} height={50} alt={`Avatar de ${user.name}`} />
                        <span className="absolute top-11 left-1/9 bg-pink-400 px-1 text-xs font-medium">{user.plan}</span>
                    </div>
                    <button className="bg-pink-400 px-3 py-1 cursor-pointer hover:bg-pink-500 font-medium" onClick={handleLogout}>Sair</button>
                </div>
            </header>
            <div className={`my-2 max-w-7xl mx-auto absolute right-10 bottom-8`}>
                {success && (<div className="flex items-center gap-2 justify-start bg-green-700/10 border-b-1 border-green-700 p-3 w-full">
                    <IconCheck size={22} stroke={2} className="text-green-700"/>
                    <p className="text-green-700 text-md font-medium">{success}</p>
                </div>)
                }
                {error && (<div className="flex items-center gap-2 justify-start bg-red-700/10 border-b-1 border-red-700 p-3 w-full">
                    <IconAlertCircle size={22} stroke={2} className="text-red-700"/>
                    <p className="text-red-700 text-md font-medium">{error}</p>
                </div>)
                }
            </div>
            <div className="grid grid-cols-[250px_1fr] max-w-7xl mx-auto">
                <div>
                    <nav className="flex flex-col">
                        <li onClick={() => setSection("default")} className="w-full p-5 hover:bg-black/5 flex gap-2 items-center cursor-pointer">
                            <IconEye/>
                            <span className="font-medium">Visão geral</span>
                        </li>
                        <li onClick={() => setSection("account")} className="w-full p-5 hover:bg-black/5 flex gap-2 items-center cursor-pointer">
                            <IconUserCircle/>
                            <span className="font-medium">Minha conta</span>
                        </li>
                        <li onClick={() => setSection("appearance")} className="w-full p-5 hover:bg-black/5 flex gap-2 items-center cursor-pointer">
                            <IconPaint/>
                            <span className="font-medium">Aparência</span>
                        </li>
                        <li onClick={() => setSection("links")} className="w-full p-5 hover:bg-black/5 flex gap-2 items-center cursor-pointer">
                            <IconLinkPlus/>
                            <span className="font-medium">Links</span>
                        </li>
                        <li onClick={() => setSection("analytics")} className="w-full p-5 hover:bg-black/5 flex gap-2 items-center cursor-pointer">
                            <IconGraph/>
                            <span className="font-medium">Analytics</span>
                        </li>
                    </nav>
                </div>
                <main className="pl-6 min-h-screen ">
                {section === "default" && 
                    <div>
                        <div>
                            <p className="text-xl font-bold">Visão geral</p>
                            <span className="text-xs text-zinc-600">Panorâma geral das suas informações e links</span>
                        </div>
                        <div className="my-10">
                            <h2 className="text-xl font-medium mb-2">Dados pessoais</h2>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Nome</p>
                                    <p className="text-sm">{user.name}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Nome de usuário</p>
                                    <p className="text-sm">{user.username}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">E-mail</p>
                                    <p className="text-sm">{user.email}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Bio</p>
                                    <p className="text-sm">{user.bio}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 my-10">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl font-medium mb-2">Links</p>
                                    <table>
                                        <thead>
                                            <tr className="bg-black/20">
                                                <td className="p-2 text-sm font-medium text-center">Título</td>
                                                <td className="p-2 text-sm font-medium text-center">URL</td>
                                                <td className="p-2 text-sm font-medium text-center">Data de criação</td>
                                                <td className="p-2 text-sm font-medium text-center">Última atualização</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {user.links?.map(link => (
                                                    <tr key={link.id}>
                                                        <td className="p-2 text-sm font-medium">{link.title}</td>
                                                        <td className="p-2 text-sm text-center">
                                                            <Link href={link.url} target="_blank" className="hover:underline">{link.url}</Link>
                                                        </td>
                                                        <td className="p-2 text-sm text-center">{formatLongDate(link.createdAt)}</td>
                                                        <td className="p-2 text-sm text-center">{formatLongDate(link.updatedAt)}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {section === "account" && 
                    <div className="flex flex-col gap-5 items-start min-w-full mb-10">
                        <div>
                            <h2 className="text-xl font-bold">Minha conta</h2>
                            <span className="text-xs text-zinc-600">Alterar dados</span>
                        </div>
                        <div className="min-w-full">
                        <form onSubmit={handleUpdateProfile} className="flex flex-col min-w-full gap-5">
                            <div className="min-w-full flex flex-col gap-5 mt-10">
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-medium mb-2">Alterar informações pessoais</h2>
                                </div>
                                <div>
                                    <label htmlFor="name">Nome</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" type="text" className="w-full p-3 bg-black/10 outline-none border-b-1 border-pink-300 focus:border-pink-500 placeholder:text-zinc-500 text-zinc-500" placeholder={`Novo nome...`} />
                                </div>
                                <div>
                                    <label htmlFor="bio">Bio</label>
                                    <input value={bio} onChange={(e) => setBio(e.target.value)} maxLength={60} name="bio" type="text" className="w-full p-3 bg-black/10 outline-none border-b-1 border-pink-300 focus:border-pink-500 placeholder:text-zinc-500 text-zinc-500" placeholder={`O que você falar sobre você?`} />
                                    <span className="text-xs text-black/50">{user.bio ? `Bio: ${user.bio}` : "Você ainda não definiu nenhuma bio."}</span>
                                </div>
                                
                                <button type="submit" className="bg-pink-400 hover:bg-pink-500 cursor-pointer text-black p-3 ">Salvar</button>
                            </div>
                        </form>
                        <div className="min-w-full flex flex-col gap-5 mt-10">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-medium mb-2">Alterar e-mail</h2>
                            </div>
                            <div className="w-full">
                                <label htmlFor="email">E-mail</label>
                                <input name="email" id="email" type="email" className="w-full p-3 bg-black/10 outline-none border-b-1 border-pink-300 focus:border-pink-500 placeholder:text-zinc-500 text-zinc-500" placeholder={user.email} />
                            </div>
                            <button className="bg-pink-400 w-full hover:bg-pink-500 cursor-pointer text-black p-3 ">Alterar e-mail</button>
                        </div>
                        <div className="flex flex-col gap-5 min-w-full mt-10">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-medium mb-2">Alterar senha</h2>
                                <span className="bg-black/10 dark:bg-white/10 px-1 py-0.5 text-sm"><strong>Dica:</strong> Prefira sempre uma senha forte. Não repita senhas utilizadas em outros apps.</span>
                            </div>
                            <form onSubmit={changePassword}>
                                <div className="flex items-end gap-5 min-w-full">
                                    <div className="w-full">
                                        <label htmlFor="currentPassword">Senha atual</label>
                                        <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} name="currentPassword" id="currentPassword" type="password" className="w-full p-3 bg-black/10 outline-none border-b-1 border-pink-300 focus:border-pink-500 placeholder:text-zinc-500 text-zinc-500" placeholder="Insira sua senha atual..." />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="newPassword">Nova senha</label>
                                        <input value={newPassword} onChange={(e) => setNewPassoword(e.target.value)} name="newPassword" id="newPassword" type="password" className="w-full p-3 bg-black/10 outline-none border-b-1 border-pink-300 focus:border-pink-500 placeholder:text-zinc-500 text-zinc-500" placeholder="Insira sua nova senha..." />
                                    </div>
                                    <button type="submit" className="bg-pink-400 hover:bg-pink-500 cursor-pointer text-black p-3 ">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                }
                {section === "appearance" && 
                    <div className="flex flex-col gap-2 items-start min-h-full">
                        <div>
                            <h2 className="text-xl font-bold">Aparência</h2>
                            <span className="text-xs text-zinc-600">Mude o tema do seu perfil. Deixe do seu jeito...</span>
                        </div>
                        <div className="flex gap-5 items-center justify-start w-full">
                            <form onSubmit={updateTheme} className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="blue">Cor da página {pageBackground}</label>
                                    <input onChange={e => setPageBackground(e.target.value)} type="color" id="pageBackground" value={pageBackground} name="pageBackground" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="blue">Cor da Fonte da Página {pageTextColor}</label>
                                    <input onChange={e => setPageTextColor(e.target.value)} type="color" id="pageTextColor" value={pageTextColor} name="pageTextColor" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="blue">Cor dos Botões {buttonBackground}</label>
                                    <input onChange={e => setButtonBackground(e.target.value)} type="color" id="buttonBackground" value={buttonBackground} name="buttonBackground" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="blue">Cor da Fonte dos Botões {buttonTextColor}</label>
                                    <input onChange={e => setButtonTextColor(e.target.value)} type="color" id="buttonTextColor" value={buttonTextColor} name="buttonTextColor" />
                                </div>
                                <button type="submit" className="bg-pink-400 hover:bg-pink-500 cursor-pointer text-black p-3">Salvar</button>
                            </form>
                        </div>
                    </div>
                }
                {section === "links" && 
                <div className="flex flex-col gap-2 items-start w-full">
                    <div className="flex justify-between min-w-full">
                        <div>
                            <h2 className="text-xl font-bold">Links</h2>
                            <span className="text-xs text-zinc-600">Configure os links que irão aparecer para os seus clientes</span>
                        </div>
                        <div>
                            <button onClick={handleModalLink} className="bg-pink-400 px-3 py-1 cursor-pointer  hover:bg-pink-500 font-medium group flex items-center gap-2">
                                {modalLink ? (
                                    <><IconCancel size={18} /><span>Cancelar</span></>
                                ) : (
                                    <><IconLinkPlus size={18} /><span>Adicionar Link</span></>
                                )
                            }
                            </button>
                        </div>
                    </div>
                    {modalLink &&
                                        
                        <form onSubmit={createNewLink} className="flex gap-2 items-center min-w-full">
                            <input value={titleLink} onChange={(e) => setTitleLink(e.target.value)} type="text" name="title" id="title" placeholder="Nome do link..." className="w-full p-3 bg-black/10 outline-none border-b-1 border-pink-300 focus:border-pink-500 placeholder:text-zinc-500 text-zinc-500"/>
                            <input value={urlLink} onChange={(e) => setUrlLink(e.target.value)} type="text" name="url" id="url" placeholder="URL do link..." className="w-full p-3 bg-black/10 outline-none border-b-1 border-pink-300 focus:border-pink-500 placeholder:text-zinc-500 text-zinc-500"/>
                            <button type="submit" className="bg-pink-400 p-3 cursor-pointer  hover:bg-pink-500 font-medium group text-center w-full">Criar</button>   
                        </form>

                                        
                    }    
                    <table className="w-full">
                        <thead>
                            <tr className="bg-black/20 border-b-1">
                                <td className="w-48 p-2 text-sm font-medium text-nowrap text-center">Título do link</td>
                                <td className="p-2 text-sm font-medium text-nowrap text-center">URL</td>
                                <td className="w-32 p-2 text-sm font-medium text-nowrap text-center">Data de criação</td>
                                <td className="w-32 p-2 text-sm font-medium text-nowrap text-center">Última atualização</td>
                                <td className="w-32 p-2 text-sm font-medium text-nowrap text-center">Opções</td>
                                {/* <td className="w-20 p-2 text-sm font-medium text-nowrap text-center">Excluir?</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            {user.links?.map((link) => (
                                <LinkRow 
                                    key={link.id}
                                    link={link}
                                    onError={handleError}
                                    onSuccess={handleSuccess}
                                    onUpdated={fetchUserData}
                                />
                            ))}
                        </tbody>
                    </table>                                               
                </div>
                }
                {section === "analytics" && 
                    <div className="flex flex-col gap-2 items-start min-h-full">
                        <div>
                            <h2 className="text-xl font-bold">Analytics</h2>
                            <span className="text-xs text-zinc-600">Visualize as métricas gerais de cada link do seu perfil</span>
                        </div>
                        <div className="flex w-full items-center justify-center flex-1">
                            <div className="flex items-center gap-2">
                                <IconHourglass size="20" className="text-zinc-600"/>
                                <p className="text-zinc-600 text-sm">Em breve</p>
                            </div>
                        </div>
                    </div>
                }
                </main>
            </div>
        </div>
    )
}