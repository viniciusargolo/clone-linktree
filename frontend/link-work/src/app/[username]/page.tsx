'use client'

// 1. Importe o hook 'useParams' do next/navigation
import { useParams } from 'next/navigation';
import {  useEffect, useState } from 'react';
import Image from 'next/image';
import { IconAlertCircle, IconLoader3 } from '@tabler/icons-react';
import Link from 'next/link';

interface Link {
  linkId: string;
  title: string;
  url: string;
}

interface Appearance {
  pageBackground: string
  pageTextColor: string
  buttonBackground: string
  buttonTextColor: string
}

interface PublicProfile {
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  links: Link[];
  appearance: Appearance;
}

export default function PublicProfilePage() {
  
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const params = useParams();
  
  const username = Array.isArray(params.username) ? params.username[0] : params.username;

  if (!username) return;

    
  useEffect(() => {
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
          console.error(error)
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchPublicProfile();
  }, [setError, setProfile, setIsLoading]);

  useEffect(() => {
    if (profile) {
      document.title = `Perfil de ${profile.username}`;
    }
  }, [profile]);


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
    <div style={{ backgroundColor: profile.appearance.pageBackground }} className={`min-w-full p-10 min-h-screen`}>
      <div className='max-w-2xl min-h-screen mx-auto bg-white rounded-2xl'>
        <div className='flex w-full justify-center p-5'>
          <Image className='rounded-full object-cover' src={profile.avatar || '/user.jpg'} width={150} height={150} alt={`Avatar de ${profile.name}`} />
          <div className='flex flex-col items-start justify-center w-full px-5'>
            <div className='flex items-centes gap-2 justify-between w-full'>
              <h1 className='text-xl font-medium'>{profile.name}</h1>
              <p className='text-sm'>#{profile.username}</p>
            </div>
            <div className='flex items-start w-full min-w-full'>
              {/* <p className='font-xs'>Bio</p> */}
              <p className='text-xs font-normal'>{profile.bio}</p>
            </div>
          </div>
        </div>
        
        <div>
          {profile.links && profile.links.length > 0 ? (
            <>
              <h2 className='text-2xl font-medium text-center py-2'>Links</h2>
              <ul className='flex flex-col gap-5'>
                {profile.links.map((link) => (
                  <li key={link.linkId}>
                  <Link style={{ backgroundColor: profile.appearance.buttonBackground, color: profile.appearance.buttonTextColor }} href={link.url} rel="noopener noreferrer" target="_blank" className={`block p-3 transition-all duration-300 transform hover:brightness-80 rounded-2xl mx-5 text-center text-xl font-medium`}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
          <h2 className='text-sm text-center py-5'>
            Que vazio! {profile.name} ainda não tem links...
          </h2>
          )}
        </div>
      </div>
    </div>
  );
}