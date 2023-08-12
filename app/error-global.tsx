export default function Home() {
    return (
      <div className="h-screen w-[70%] mx-auto p-6 flex justify-center items-center">
        <div className="p-6 bg-slate-300 rounded-lg flex flex-col gap-4 justify-center text-center items-center">
          <span className="material-icons text-[30px]">warning</span>
          <h1 className="text-2xl">something went wrong</h1>
        </div>
      </div>
    );
  }
  