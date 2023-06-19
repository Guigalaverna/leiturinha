import { poppins } from '@/styles/poppins';
import { sign } from 'crypto';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { RiMenu3Fill } from 'react-icons/ri';

export function Header() {
  const [modalIsShowingToUser, setModalIsShowingToUser] = useState(false);

  function handleToggleVisibilityOfModal() {
    setModalIsShowingToUser(!modalIsShowingToUser);
  }

  return (
    <>
      <header className="w-full h-20 bg-red-500 flex items-center justify-between px-5">
        <Image
          src="/logo-white.svg"
          alt="Logo branca do Leiturinha"
          width={130}
          height={130}
        />

        <nav className="hidden md:block">
          <ul className="flex gap-5">
            <Link
              href="/app/dashboard"
              className="text-base text-white font-normal cursor-pointer transition-colors"
            >
              Painel
            </Link>
            <Link
              href="/app/library"
              className="text-base text-white font-normal cursor-pointer transition-colors"
            >
              Biblioteca
            </Link>

            <a
              href=""
              onClick={() => signOut()}
              className="text-base text-white font-normal cursor-pointer transition-colors"
            >
              Sair
            </a>
          </ul>
        </nav>

        <button
          className="bg-red-400 p-2 rounded-lg hover:brightness-[0.8] transition-all md:hidden"
          onClick={handleToggleVisibilityOfModal}
        >
          <RiMenu3Fill size={24} color="white" />
        </button>
      </header>

      <div
        className={`${poppins.className} fixed flex flex-col items-center justify-center z-10 bg-background inset-0`}
        style={{ display: modalIsShowingToUser ? 'flex' : 'none' }}
      >
        <h2 className="uppercase text-base text-zinc-400 leading-tight">
          Menu
        </h2>

        <ul className="flex flex-col items-center mt-10 gap-2">
          <Link
            href="/app/dashboard"
            className="text-2xl font-medium hover:text-red-500 transition-colors"
          >
            Painel
          </Link>
          <Link
            href="/app/library"
            className="text-2xl font-medium hover:text-red-500 transition-colors"
          >
            Biblioteca
          </Link>

          <a
            href="#"
            onClick={() => signOut()}
            className="text-2xl font-medium hover:text-red-500 transition-colors"
          >
            Sair
          </a>
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
    </>
  );
}
