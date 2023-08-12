import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-[70%] mx-auto flex justify-center items-center">
      <div className="p-6 bg-slate-100 rounded-lg flex flex-col gap-4 justify-center text-center items-center">
        <span className="material-icons text-[50px]">block</span>
        <h1 className="text-2xl">Routes doesn't match any page</h1>
        <p className="text-sm">404 Not Found</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-xl text-sm shadow-lg flex items-center p-2 gap-2">
          <span className="material-icons text-sm">arrow_back</span>
          <Link href={'/'}>Bring me back</Link>
        </button>
      </div>
    </div>
  );
}
