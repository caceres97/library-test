export default function UserTable(props: any) {
  return (
    <div className="m-5 bg-white dark:bg-gray-900">
      <div className="space-x-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-2 text-center">
                User
              </th>
              <th scope="col" className="py-3 px-2">
                Email
              </th>
              <th scope="col" className="py-3 px-2 text-center">
                Is Admin?
              </th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user: any) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-2 text-center">{user.name}</td>
                <td className="py-4 px-2 text-left">{user.email}</td>
                <td className="py-4 px-2 text-center">
                  {user.isAdmin ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
