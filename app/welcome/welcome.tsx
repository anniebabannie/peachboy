import coverPlaceholder from "./cover.png";
import { useNavigate } from "react-router";
import { ENV } from "../env";

export function Welcome() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center justify-center pt-20 pb-10 gap-8 px-4">
      <header className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-dark to-brand-light text-black bg-clip-text">
          {ENV.APP_NAME}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          A wandering soul, a mysterious seed, and a journey that began with a fall from the sky.
        </p>
      </header>
      <figure
        className="w-[420px] max-w-full rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10 dark:ring-white/10 bg-gray-100 dark:bg-gray-900 cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Start reading"
        onClick={() => navigate('/1/1')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/1/1'); } }}
      >
        <img
          src={coverPlaceholder}
          alt={`${ENV.APP_NAME} Cover`}
          className="block w-full h-auto"
          loading="eager"
          decoding="async"
        />
      </figure>
      <div className="flex gap-2">
        <button
          className="px-5 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
          disabled
        >
          Previous
        </button>
        <button
          className="px-5 py-2 rounded-md bg-brand text-white font-semibold shadow hover:bg-brand-dark transition"
          onClick={() => navigate('/1/1')}
        >
          Next
        </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Replace the file <code>app/welcome/cover-placeholder.svg</code> with your real cover (same name or update import).</p>
    </main>
  );
}
