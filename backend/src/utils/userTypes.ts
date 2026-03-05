export type userData = {
    id: string
    name: string
    bio?: string | null
    email:  string
    username: string
    password: string
    avatarUrl?: string | null
    links?: string[] | null
    appearance?: string
}

export type appearance = {
    theme: string
}

export type userCredentials = {
    email: string
    password: string
}

export type LinkData = {
    id: string             
    title: string
    url: string       
    clicks?: number        
    createdAt: string
    ownerId: string
}

export interface CreateLinkData {
  title: string;
  url: string;
}