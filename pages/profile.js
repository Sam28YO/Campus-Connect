import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Profile() {
  const { data, error } = useSWR("https://dummyjson.com/users", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <ul className="flex flex-col container gap-6 mx-auto px-4 py-8">
        {data.users.map((user) => (
          <div className="bg-black bg-gradient-to-r from-pink-200 to-pink-400 rounded-lg shadow-lg text-green-900 p-4">
            <h2 className="text-lg font-bold">User ID: {user.id}</h2>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </ul>
    </>
  );
}
