import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import BookTable from "./BookTable";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";

export default function Admin() {
  const [books, setBooks] = useState([]) as any;
  const [authors, setAuthors] = useState([]) as any;
  const [genres, setGenres] = useState([]) as any;
  const [searchGenre, setSearchGenre] = useState("") as any;
  const [searchAuthor, setSearchAuthor] = useState("") as any;
  const navigate = useNavigate();

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user") as string);
    if (!user?.loginResult?.isAdmin) {
      navigate("/login");
    }

    getBooks();
  }, []);

  const getBooks = async () => {
    const books = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/books?available=all`
    );
    setBooks(books.data);
    getAssets();
  };

  const createBook = async (e: any) => {
    e.preventDefault();
    //Use formik
    const bookData = {
      name: e.target[0].value,
      copies: e.target[1].value,
      publicationYear: e.target[2].value,
      author: e.target[3].value,
      genre: e.target[4].value,
      remark: e.target[5].value,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/books`, bookData)
      .then((res) => {
        if (res.status === 200) {
          alert("Book Created");
          getBooks();
        } else {
          alert("Problems creating boko");
        }
      });
  };

  const getAssets = async () => {
    const authors = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/utils/authors`
    );
    const genres = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/utils/genres`
    );

    setAuthors(authors.data);
    setGenres(genres.data);
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div className="bg-white">
      <Navbar />
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Book Management
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                ></Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form onSubmit={createBook}>
                    <div className="overflow-hidden shadow sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid gap-6">
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Copies
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Publication Year
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Author
                            </label>
                            <select
                              id="author"
                              name="author"
                              value={searchAuthor}
                              onChange={(e) => setSearchAuthor(e.target.value)}
                              autoComplete="author-name"
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              {authors.map((author: any) => (
                                <option key={author.id} value={author.id}>
                                  {author.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Genre
                            </label>
                            <select
                              id="genre"
                              name="genre"
                              value={searchGenre}
                              onChange={(e) => setSearchGenre(e.target.value)}
                              autoComplete="country-name"
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              {genres.map((genre: any) => (
                                <option key={genre.id} value={genre.id}>
                                  {genre.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Remark
                            </label>
                            <textarea
                              name="remark"
                              id="remark"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <BookTable books={books} />
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
