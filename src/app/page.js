import Link from "next/link";
export default function Home_page() {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
  <h1 className="text-5xl font-bold text-cyan-600">
        Product Management module using Next.js
      </h1>

      <Link href="input">
      <button className="bg-yellow-300 text-xl text-black-100 rounded hover:bg-yellow-600 px-4 py-2"> 
        Go To Product Form Page
      </button>
      </Link>
    </div>
  );
}