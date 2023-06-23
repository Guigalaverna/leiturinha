import { Header } from '@/components/Header';
import { client } from '@/lib/notion';
import { poppins } from '@/styles/poppins';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ServerSideProps {
  books: {
    results: {
      id: string;
      properties: {
        Título: {
          title: {
            plain_text: string;
          }[];
        };
        'Capa do livro': {
          files: {
            external: {
              url: string;
            };
          }[];
        };
        Categorias: {
          multi_select: {
            name: string;
          }[];
        };
        'Está disponível?': {
          checkbox: boolean;
        };
      };
    }[];
  };
}

export default function Library({ books: booksFromNotion }: ServerSideProps) {
  const [books, setBooks] = useState(booksFromNotion);

  console.log(books);

  return (
    <main
      className={`${poppins.className} w-full h-full bg-background flex flex-col`}
    >
      <Header />

      <section className="p-6">
        <header>
          <h2 className="text-2xl font-semibold">Biblioteca</h2>
          <p className="mt-2 text-zinc-400">
            Veja os livros que estão disponíveis para reservar e ler
          </p>

          <div className="flex gap-2 justify-center items-center my-10">
            <input
              type="text"
              placeholder="O Retrato de Dorian Gray"
              className="  w-full p-4 rounded-full bg-zinc-100 border-zinc-200 border-4"
            />
            <button className="bg-red-500 flex items-center justify-center p-4 text-[1.1rem] rounded-lg text-white gap-6">
              Buscar
            </button>
          </div>
        </header>
        <section className="flex flex-wrap items-start gap-6 md:justify-center md:gap-10">
          {books.results.map(book => {
            const title = book.properties.Título.title[0].plain_text;
            const coverUrl =
              book.properties['Capa do livro'].files[0].external.url;
            const categories = book.properties.Categorias.multi_select;
            const isAvailable = book.properties['Está disponível?'].checkbox;

            return (
              <Link
                key={book.id}
                className="flex flex-col items-start gap-3"
                href={`/app/library/${book.id}`}
              >
                <Image
                  src={coverUrl}
                  alt={`Capa do livro ${title}`}
                  width={200}
                  height={100}
                  className="shadow-[7px_7px] shadow-red-500 rounded-lg"
                />

                <span className="max-w-[200px]">{title}</span>
                <ul className="flex gap-2 max-w-[200px] flex-wrap">
                  {categories.map(category => (
                    <li
                      key={category.name}
                      className="bg-red-300 uppercase text-[0.6rem] p-2 text-red-900 font-bold rounded-lg"
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <label htmlFor="isAvailable" className="text-xs">
                    Está disponível?
                  </label>
                  <input
                    id="isAvailable"
                    name="isAvailable"
                    type="checkbox"
                    checked={isAvailable}
                  />
                </div>
              </Link>
            );
          })}
        </section>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const books = await client.databases.query({
    database_id: process.env.NOTION_DATABASE!,
  });

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
    props: {
      books,
    },
  };
};
