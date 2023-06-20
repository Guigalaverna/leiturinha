import { Header } from '@/components/Header';
import { poppins } from '@/styles/poppins';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Library() {
  return (
    <main
      className={`${poppins.className} w-full h-screen bg-background flex flex-col`}
    >
      <Header />

      <section className="p-6">
        <header>
          <h2 className="text-2xl font-semibold">Biblioteca</h2>
          <p className="mt-2 text-zinc-400">
            Veja os livros que estão disponíveis para reservar e ler
          </p>

          <div className="flex flex-col gap-6 justify-center items-center">
            <input
              type="text"
              placeholder="O Retrato de Dorian Gray"
              className="mt-10  w-full p-4 rounded-full bg-zinc-100 border-zinc-200 border-4"
            />
            <button className="bg-red-500 flex items-center justify-center p-4 text-[1.1rem] w-full rounded-lg text-white gap-6">
              Buscar
            </button>
          </div>
        </header>
        <section></section>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
