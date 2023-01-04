export default function Books(props: any) {
  return (
    <div className="m-5 bg-white dark:bg-gray-900">
      <div className="space-x-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-2">
                Book Name
              </th>
              <th scope="col" className="py-3 px-2 text-center">
                Author
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Genre
              </th>
              <th scope="col" className="py-3 text-center">
                Publication Year
              </th>
              <th scope="col" className="py-3 text-center">
                Copies Available
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.books.map((book: any) => (
              <tr
                key={book.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {book.name}
                </th>
                <td className="py-4 px-2 text-center">
                  {book.tbl_author.name}
                </td>
                <td className="py-4 px-6 text-center">{book.tbl_genre.name}</td>
                <td className="py-4 text-center">{book.publicationYear}</td>
                <td className="py-4 text-center">{book.tbl_copies.length}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => {
                      props.setSingleBook(book);
                      props.isModalOpen(true);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
