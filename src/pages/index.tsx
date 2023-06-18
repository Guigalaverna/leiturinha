import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

import { getSession, signIn } from 'next-auth/react';

import Image from 'next/image';

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col bg-background p-10 lg:px-24 py-[3rem]">
      <header className="w-full flex items-center justify-between">
        <Image
          src="/logo-black.svg"
          alt="Logo do Leiturinha"
          width={160}
          height={100}
        />

        <button
          className="px-7 py-3 bg-red-500 rounded-md text-white font-medium"
          onClick={() => signIn('google')}
        >
          Login
        </button>
      </header>
      <div className="w-full h-full flex flex-col items-center justify-center gap-10 lg:flex-row lg:justify-between">
        <section className="flex flex-col items-center md:items-start md:gap-4">
          <h1 className="text-text-500 font-semibold text-2xl lg:text-4xl lg:max-w-xl lg:leading-tight">
            Descubra, compartilhe e registre suas{' '}
            <span className="relative">
              <span className="relative ml-[0.25rem] mr-[1rem] z-[1] after:content-[' '] after:w-[calc(100%+0.5rem)] after:-translate-x-[0.25rem] inline-grid after:absolute after:bottom-0 after:-z-[1] after:left-0 after:h-4 after:bg-red-500">
                opiniões
              </span>
            </span>
            <span className="relative">
              <span className="relative z-[1] after:content-[' '] after:w-[calc(100%+0.5rem)] after:-translate-x-[0.25rem] inline-grid after:absolute after:bottom-0 after:-z-[1] after:left-0 after:h-4 after:bg-red-500">
                literárias
              </span>
            </span>
          </h1>
        </section>
        <Image
          src="/landing-hero.svg"
          alt="Ilustração de pessoas lendo ao redor de uma máquina de escrever"
          width={699}
          height={500}
        />
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/app/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
