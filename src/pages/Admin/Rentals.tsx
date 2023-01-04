import moment from "moment";

export default function Rents(props: any) {
  return (
    <div className="m-5 bg-white dark:bg-gray-900">
      <div className="space-x-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-2">
                Email
              </th>
              <th scope="col" className="py-3 px-2 text-center">
                User
              </th>
              <th scope="col" className="py-3 px-2 text-center">
                Book
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Returning Date
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Is Active?
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.rentals.map((rental: any) => (
              <tr
                key={rental.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-2 text-left">{rental.tbl_user.email}</td>
                <td className="py-4 px-2 text-center">
                  {rental.tbl_user.name}
                </td>
                <td className="py-4 px-2 text-center">
                  {rental.tbl_copy.tbl_book.name}
                </td>
                <td className="py-4 px-6 text-center">
                  {moment(rental.endDate).format("LL").toString()}
                </td>
                <td className="py-4 px-6 text-center">
                  {rental.isActive ? "True" : "False"}
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => {
                      props.setSingleRental(rental);
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
