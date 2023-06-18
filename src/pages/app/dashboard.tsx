import { useState } from 'react';

import { RiMenu3Fill } from 'react-icons/ri';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Image from 'next/image';
import { poppins } from '@/styles/poppins';

import { quotes } from '@/lib/quotes.json';

interface ServerSideProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
  quote: {
    citation: string;
    author: string;
  };
}

export default function Dashboard({ user, quote }: ServerSideProps) {
  const [modalIsShowingToUser, setModalIsShowingToUser] = useState(false);

  function handleToggleVisibilityOfModal() {
    setModalIsShowingToUser(!modalIsShowingToUser);
  }

  return (
    <>
      <div
        className={`${poppins.className} fixed flex flex-col items-center justify-center z-10 bg-background inset-0`}
        style={{ display: modalIsShowingToUser ? 'flex' : 'none' }}
      >
        <h2 className="uppercase text-base text-zinc-400 leading-tight">
          Menu
        </h2>

        <ul className="flex flex-col items-center mt-10 gap-2">
          <li className="text-2xl font-medium hover:text-red-500 transition-colors">
            Painel
          </li>
          <li className="text-2xl font-medium hover:text-red-500 transition-colors">
            Biblioteca
          </li>
          <li className="text-2xl font-medium hover:text-red-500 transition-colors">
            Ranking
          </li>
          <li className="text-2xl font-medium hover:text-red-500 transition-colors">
            Sair
          </li>
        </ul>

        <footer className="mt-10">
          <button
            className="uppercase text-base text-zinc-400 leading-tight hover:text-zinc-600 transition-colors"
            onClick={handleToggleVisibilityOfModal}
          >
            Voltar
          </button>
        </footer>
      </div>

      <main className="w-full h-screen bg-background flex flex-col">
        <header className="w-full h-20 bg-red-500 flex items-center justify-between px-5">
          <Image
            src="/logo-white.svg"
            alt="Logo branca do Leiturinha"
            width={130}
            height={130}
          />

          <nav className="hidden md:block">
            <ul className="flex gap-5">
              <li className="text-base text-white font-normal cursor-pointer transition-colors">
                Painel
              </li>
              <li className="text-base text-white font-normal cursor-pointer transition-colors">
                Biblioteca
              </li>
              <li className="text-base text-white font-normal cursor-pointer transition-colors">
                Ranking
              </li>
              <li className="text-base text-white font-normal cursor-pointer transition-colors">
                Sair
              </li>
            </ul>
          </nav>

          <button
            className="bg-red-400 p-2 rounded-lg hover:brightness-[0.8] transition-all md:hidden"
            onClick={handleToggleVisibilityOfModal}
          >
            <RiMenu3Fill size={24} color="white" />
          </button>
        </header>

        <section className="flex flex-col items-start gap-10 p-6">
          <header className="w-full flex flex-col items-start justify-center">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl font-medium max-w-xs">
                Olá, <span className="font-semibold">{user.name}</span>!
              </h1>

              <div className="w-[50px] h-[50px] flex items-center justify-center relative">
                <Image
                  src={user?.image!}
                  alt={`Imagem de avatar do(a) ${user.name}`}
                  width={50}
                  height={50}
                  className="rounded-full border-4 border-red-500"
                />
                <span className="absolute -bottom-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center font-medium text-white">
                  1
                </span>
              </div>
            </div>

            <footer className="mt-5 flex flex-col gap-2 border-l-red-500 border-t-transparent border-b-transparent border-r-transparent border-solid border-l-8 pl-4">
              <p className="text-base italic text-zinc-800">
                “{quote?.citation}”
              </p>
              <p className="text-base italic text-zinc-500">
                — {quote?.author}
              </p>
            </footer>
          </header>

          <h2 className="text-[1.2rem] font-medium">Ações rápidas</h2>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);

  const randomQuouteArrayIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomQuouteArrayIndex];

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        name: session.user?.name,
        image: session.user?.image,
        email: session.user?.email,
      },
      quote: randomQuote,
    },
  };
};
