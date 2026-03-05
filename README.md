# Linktree Clone (Agregador de Links)

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-Success)
![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)

## Sobre o Projeto

Este projeto é um clone funcional da ideia por trás do Linktree, desenvolvido para centralizar links de redes sociais, portfólios e contatos em uma única página responsiva e de carregamento rápido. O objetivo deste projeto foi aplicar conceitos de desenvolvimento Full Stack, desde a criação da interface com **Next.js** e **Tailwind CSS** até a persistência de dados utilizando **Node.js** e **Prisma ORM**.

## Funcionalidades

- Interface responsiva (Mobile First).
- Listagem dinâmica de links cadastrados no banco de dados.
- Painel administrativo para criar, editar e excluir links (CRUD).
- Autenticação de usuários.
- Estilização moderna utilizando utilitários do Tailwind CSS.

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

**Front-end:**
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

**Back-end & Banco de Dados:**
- [Node.js](https://nodejs.org/en/) com [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- PostgreSQL

## Como rodar o projeto localmente

Siga os passos abaixo para testar o projeto na sua máquina:

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18+) e o **Git** instalados na sua máquina.

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/viniciusargolo/clone-linktree.git
   ```
2. **Instale as dependências:**
   ```bash
   cd backend/
   npm install
   cd ..
   cd frontend/link-work
   npm install
   ```
3. **Configuração das Variáveis de Ambiente (.env):**
   Na pasta `backend/`, crie um arquivo chamado `.env`. Você pode copiar o modelo abaixo e preencher com as suas credenciais locais.
   ```env
   # Exemplo do que deve conter no seu .env
   DATABASE_URL="postgresql://[seu_usuario]:[sua_senha]@localhost:5432/[nome_do_banco]?schema=public"
   JWT_SECRET="sua_chave_secreta_de_autenticacao"
   ```
   
