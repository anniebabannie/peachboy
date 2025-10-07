import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { useNavigate } from "react-router";

export function Welcome() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center justify-center pt-20 pb-10 gap-8 px-4">
      <header className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-dark to-brand-light text-transparent bg-clip-text">
          Peach Boy
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          A wandering soul, a mysterious seed, and a journey that began with a fall from the sky.
        </p>
      </header>
      <div className="w-[420px] max-w-full rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10 dark:ring-white/10">
        <img
          src={logoLight}
          alt="Peach Boy Cover"
          className="block w-full dark:hidden"
        />
        <img
          src={logoDark}
          alt="Peach Boy Cover Dark"
          className="hidden w-full dark:block"
        />
      </div>
      <div className="flex gap-4">
        <button
          className="px-6 py-3 rounded-md bg-brand text-white font-semibold shadow hover:bg-brand-dark transition"
          onClick={() => navigate('/chapter-1/1')}
        >
          Start Reading
        </button>
        <button
          className="px-6 py-3 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          onClick={() => navigate('/chapter-1/1')}
        >
          Latest
        </button>
      </div>
    </main>
  );
}
