'use client'

import { formatLongDate } from "@/utils/formatDatetime"
import { useRouter } from "next/navigation"
import { useState } from "react"

export interface LinkData {
  id: string
  title: string
  url: string
  clicks: number
  createdAt: string
  updatedAt: string
}

interface LinkRowProps {
  link: LinkData
  onError: (message: string) => void
  onSuccess: (message: string) => void
  onUpdated: () => void
}

export default function LinkRow({ link, onError, onSuccess, onUpdated }: LinkRowProps) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editUrl, setEditUrl] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  function startEditing() {
    setEditTitle(link.title)
    setEditUrl(link.url)
    setIsEditing(true)
  }

  function cancelEditing() {
    setIsEditing(false)
  }

  async function saveLink() {
    setIsSaving(true)

    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        onError("Você não está autenticado. Por favor, faça o login.")
        router.push("/login")
        return
      }

      const response = await fetch(`http://localhost:3333/manage/links/${link.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: editTitle, url: editUrl })
      })

      if (!response.ok) {
        throw new Error("Erro ao tentar atualizar o link. Tente novamente!")
      }

      const data = await response.json()
      setIsEditing(false)
      onSuccess(data.message ?? "Link atualizado com sucesso!")
      onUpdated()
    } catch (error) {
      if (error instanceof Error) {
        onError(error.message)
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <tr className="cursor-text">
      <td className="p-2 text-sm truncate">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 bg-black/10 outline-none focus:border-pink-500 text-zinc-500"
          />
        ) : (
          link.title
        )}
      </td>

      <td className="p-2 text-sm truncate">
        {isEditing ? (
          <input
            type="text"
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
            className="w-full p-2 bg-black/10 outline-none focus:border-pink-500 text-zinc-500"
          />
        ) : (
          link.url
        )}
      </td>

      <td className="p-2 text-sm text-center">{formatLongDate(link.createdAt)}</td>
      <td className="p-2 text-sm text-center">{formatLongDate(link.updatedAt)}</td>

      <td className="p-2 text-sm text-center">
        <div className="flex flex-col gap-2">
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={saveLink}
                disabled={isSaving}
                className="text-xs bg-green-500 hover:bg-green-400 font-medium cursor-pointer p-1.5 disabled:opacity-50"
              >
                {isSaving ? "Salvando..." : "Salvar"}
              </button>
              <button
                onClick={cancelEditing}
                disabled={isSaving}
                className="text-xs bg-yellow-500 hover:bg-yellow-400 font-medium cursor-pointer p-1.5"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={startEditing}
              className="text-xs bg-blue-500 hover:bg-blue-400 font-medium cursor-pointer p-1.5"
            >
              Atualizar
            </button>
          )}
          <button className="bg-pink-500 text-xs hover:bg-pink-400 cursor-pointer font-medium p-1.5">
            Excluir
          </button>
        </div>
      </td>
    </tr>
  )
}