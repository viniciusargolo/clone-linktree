'use client'

// 1. Importe o hook 'useParams' do next/navigation
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconAlertCircle, IconLoader3 } from '@tabler/icons-react';
import Link from 'next/link';
import LinkNEXT from './_components/link';

interface Link {
  linkId: string;
  title: string;
  url: string;
}

interface appearance {
    theme: string
}

interface PublicProfile {
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  links: Link[];
  theme: appearance[]
}


export default function PublicProfilePage() {
  
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const params = useParams();
  
  const username = Array.isArray(params.username) ? params.username[0] : params.username;

  useEffect(() => {
    if (!username) return;

    const fetchPublicProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3333/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Este perfil não foi encontrado.');
          }
          throw new Error('Falha ao buscar os dados do perfil.');
        }

        const data = await response.json();
        setProfile(data);

      } catch (err) {
        if(err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicProfile();
    
  }, [username]);

  

  if (isLoading) {
    return (
      <div className='flex gap-2 items-center justify-center min-h-screen w-full'>
        <IconLoader3 className='animate-spin'/>
        <span>Carregando perfil...</span>
      </div>
      )
  }

  if (error) {
    return (
      <div className='flex gap-2 items-center justify-center min-h-screen w-full'>
        <IconLoader3 className='animate-spin'/>
        <div className='flex flex-col gap-2 items-center'>
          <span>Houve um erro:</span>
          <span>{error}</span>
        </div>
      </div>
      )
  }

  if (!profile) {
    return (
      <div className='min-h-screen w-full flex flex-col gap-2 items-center justify-center'>
        <div className='flex gap-2 items-center justify-center'>
          <IconAlertCircle/>
          <span className='text-xl'>Perfil não encontrado...</span>
        </div>
        <Link href="/" className='text-pink-400 underline text-xl'>Voltar</Link>
      </div>
    )
  }

  return (
    <div className='max-w-5xl mx-auto min-h-[100vh_-_40px] mt-10'>
      <div className='flex w-full justify-center'>
        <Image className='rounded-full object-cover border-2 border-zinc-600' src={profile.avatar || '/user.jpg'} width={200} height={200} alt={`Avatar de ${profile.name}`} />
      </div>
      <div className='flex items-center gap-2 justify-between w-full'>
        <h1 className='text-xl font-medium'>{profile.name}</h1>
        <p className='text-sm text-zinc-600'>#{profile.username}</p>
      </div>
      <div className='flex flex-col items-start bg-zinc-950/10 w-full px-4 py-2 my-2 border-b-2 border-zinc-800'>
        <p className='font-medium'>Bio:</p>
        <p className='text-sm font-normal text-zinc-600'>{profile.bio}</p>
      </div>
        <div>
        {profile.links && profile.links.length > 0 ? (
          <>
            <h2 className='text-2xl text-center py-5'>Links</h2>
            <ul className='flex flex-col gap-5'>
              {profile.links.map((link) => (
                <li key={link.linkId}>
                 <Link href={link.url} rel="noopener noreferrer" target="_blank" className={`block bg-blue-300 border-b-2 border-blue-500 p-3 hover:bg-blue-200 transition-all duration-300 transform hover:translate-x-1 text-center text-xl font-medium text-zinc-950`}>{link.title}</Link>
                {/* <LinkNEXT color={theme} url={link.url} title={link.title}/> */}
                </li>
              ))}
            </ul>
          </>
        ) : (
        <h2 className='text-sm text-center py-5 text-zinc-600'>
          Que vazio! {profile.name} ainda não tem links...
        </h2>
      )}
  </div>
    </div>
  );
}