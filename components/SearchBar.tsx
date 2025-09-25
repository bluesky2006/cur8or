import Form from "next/form";

export default function SearchBar() {
  return (
    <div>
      <Form action="/search">
        <input
          type="text"
          placeholder="Search artworks..."
          className="border border-gray-300 rounded-full px-4 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="ml-2 bg-yellow-500 text-white rounded-full px-4 py-3 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Search
        </button>
      </Form>
    </div>
  );
}
