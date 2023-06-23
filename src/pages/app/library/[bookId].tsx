import { Header } from '@/components/Header';
import { client } from '@/lib/notion';
import { poppins } from '@/styles/poppins';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Book } from '../../../../@types/Book';
import Image from 'next/image';
import axios from 'axios';

interface ServerSideProps {
  book: Book;
}

export default function Book({ book }: ServerSideProps) {
  const router = useRouter();

  const bookTitle = book.properties.Título.title[0].plain_text;
  const bookCoverUrl = book.properties['Capa do livro'].files[0].external.url;
  const bookCategories = book.properties.Categorias.multi_select.map(
    cat => cat.name
  );
  const bookDescription = book.properties.Descrição.plain_text;
  const bookIsAvailable = book.properties['Está disponível?'].checkbox;

  return (
    <main
      className={`${poppins.className} w-full h-full bg-background flex flex-col`}
    >
      <Header />

      <section className="w-full grid grid-rows-2 p-6">
        <aside className="w-full flex gap-6">
          <Image
            src={bookCoverUrl}
            alt={`Capa do livro: ${bookTitle}`}
            width={200}
            className="shadow-[7px_7px] shadow-red-500 rounded-lg"
            height={100}
          />
          <div>
            <h1 className="text-[1.3rem] font-semibold text-text-500 mt-5">
              {bookTitle}
            </h1>
            <ul className="flex gap-3 mt-3.5">
              {bookCategories.map(bookCategory => {
                return (
                  <li
                    className="bg-red-300 uppercase text-[0.6rem] p-2 text-red-900 font-bold rounded-lg"
                    key={bookCategory}
                  >
                    {bookCategory}
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-2 mt-3.5">
              <label htmlFor="isAvailable" className="text-base">
                Está disponível?
              </label>
              <input
                id="isAvailable"
                name="isAvailable"
                type="checkbox"
                checked={bookIsAvailable}
              />
            </div>
          </div>
        </aside>
        <aside className="mt-10">
          <p className="text-justify">{bookDescription}</p>
        </aside>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { bookId } = query;

  const book: Book = Object(
    await client.pages.retrieve({
      page_id: String(bookId),
    })
  );

  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      book.properties.Título.title[0].plain_text
    )}&key=${process.env.GOOGLE_API_KEY}`
  );

  book.properties.Descrição.plain_text =
    response.data.items[0].volumeInfo.description;

  return {
    props: {
      book: book,
    },
  };
};
