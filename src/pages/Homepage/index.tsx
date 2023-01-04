import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Books from "./Books";
import BookDetail from "./BookDetail";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/20/solid";

export default function Homepage() {
  const [books, setBooks] = useState([]) as any;
  const [authors, setAuthors] = useState([]) as any;
  const [genres, setGenres] = useState([]) as any;
  const [userId, setUserId] = useState([]) as any;
  const [search, setSearch] = useState("") as any;
  const [searchGenre, setSearchGenre] = useState("") as any;
  const [searchAuthor, setSearchAuthor] = useState("") as any;
  const navigate = useNavigate();
  const [singleBook, setSingleBook] = useState({
    name: "",
    tbl_author: { name: "" },
    tbl_genre: { name: "" },
    publicationYear: 0,
    remark: "",
  }) as any;
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { name: "All rentals", href: "#", current: true },
    { name: "Only Actives", href: "#", current: false },
    { name: "Not active rentals", href: "#", current: false },
  ];

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user") as string);
    if (!user) {
      navigate("/login");
    } else {
      axios.get(`${process.env.REACT_APP_BASE_URL}/books`).then((response) => {
        setBooks(response.data);
      });
      //GetUserData
      setUserId(user.loginResult.id);
      getAssets();
    }
  }, [isOpen]);

  useEffect(() => {
    const params: any = {};
    if (search) {
      params.name = search;
    }
    if (searchGenre && searchGenre !== 0) {
      params.genre = searchGenre;
    }
    if (searchAuthor && searchAuthor !== 0) {
      params.author = searchAuthor;
    }

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/books`, {
        params: params,
      })
      .then((response) => {
        setBooks(response.data);
      });
  }, [search, searchGenre, searchAuthor]);

  const rentBook = (book: any) => {
    if (book.tbl_copies.length >= 1) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/rentals/users/${userId}/books/${book.tbl_copies[0].id}`,
          {}
        )
        .then((response) => {
          alert(response.data.message);
          setIsOpen(false);
        });
    } else {
      alert("No copies available :(");
      setIsOpen(false);
    }
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

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-white h-screen">
      <Navbar />
      <div className="bg-white">
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

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-between align-middle justify-between border-b border-gray-200 pt-8 pb-6">
              <h1 className="text-4xl text-justify font-bold tracking-tight text-gray-900">
                Books
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <div className="bg-white px-4 ">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Search by name
                          </label>
                          <input
                            type="text"
                            name="search"
                            id="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoComplete="address-level2"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
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

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
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
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <button
                            onClick={() => {
                              setSearch("");
                              setSearchAuthor("");
                              setSearchGenre("");
                            }}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
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

              <div className="w-full">
                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Replace with your content */}
                  <Books
                    books={books}
                    isModalOpen={setIsOpen}
                    setSingleBook={setSingleBook}
                  />
                  <BookDetail
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    singleBook={singleBook}
                    rentBook={rentBook}
                  />
                  {/* /End replace */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
