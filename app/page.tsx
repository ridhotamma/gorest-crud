import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen md:w-[70%] mx-auto p-6">
      <div className="animation-fade-in p-12 mt-20 shadow-lg rounded-lg bg-slate-100 text-center flex flex-col justify-center items-center gap-6">
        <h1 className="font-bold text-2xl">Welcome!</h1>
        <p>
          This Apps allows you to create, read, update, and delete from{" "}
          <Link className="text-blue-500" href={"https://gorest.co.in/"}>https://gorest.co.in/</Link>{" "}
          Public API
        </p>
        <p>You can click this follow actions:</p>
        <ul className="flex gap-4 flex-col md:flex-row justify-center items-center mt-4">
          <li>
            <Link href={'/users'} className="py-2 px-4 rounded-lg shadow-lg duration-200 bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
              <span>Explore User CRUD</span>
              <span className="material-icons">arrow_forward</span>
            </Link>
          </li>
          <li>
            <Link href={'/blogs'} className="py-2 px-4 rounded-lg shadow-lg duration-200 bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
              <span>Explore Blog CRUD</span>
              <span className="material-icons">arrow_forward</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
