import { useParams, useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";

const S3_BASE = "https://your-s3-bucket.s3.amazonaws.com/peachboy"; // TODO: env

function buildUrl(chapter: string, page: string) {
  return `${S3_BASE}/chapter-${chapter}/${page}.webp`;
}

interface NavState {
  hasPrev: boolean;
  hasNext: boolean;
  imageUrl: string;
  nextUrl?: string;
  prevUrl?: string;
}

export default function ComicPage() {
  const { chapter, page } = useParams<{ chapter: string; page: string }>();
  const navigate = useNavigate();
  const [nav, setNav] = useState<NavState | null>(null);
  const [notFound, setNotFound] = useState(false);

  const imageUrl = useMemo(() => (chapter && page ? buildUrl(chapter, page) : ""), [chapter, page]);

  useEffect(() => {
    if (!chapter || !page) return;
    let abort = false;
    async function run() {
      const currentOk = await head(imageUrl);
      if (!currentOk) {
        if (!abort) setNotFound(true);
        return;
      }
  const pNum = Number(page);
  const prevPage: string | null = pNum > 1 ? String(pNum - 1) : null;
      let prevUrl: string | undefined;
      if (prevPage) {
        const prevExists = await head(buildUrl(chapter!, prevPage));
        if (prevExists) {
          prevUrl = `/chapter-${chapter}/${prevPage}`;
        }
      }
      // Next in same chapter
      const nextPage = String(pNum + 1);
      let nextUrl: string | undefined;
      if (await head(buildUrl(chapter!, nextPage))) {
        nextUrl = `/chapter-${chapter}/${nextPage}`;
      } else {
        // Try first page next chapter
        const nextChapter = String(Number(chapter) + 1);
        if (await head(buildUrl(nextChapter, "1"))) {
          nextUrl = `/chapter-${nextChapter}/1`;
        }
      }
      if (!abort) {
        setNav({
          hasPrev: !!prevUrl,
          hasNext: !!nextUrl,
          imageUrl,
          nextUrl,
          prevUrl,
        });
      }
    }
    run();
    return () => {
      abort = true;
    };
  }, [chapter, page, imageUrl]);

  if (notFound) return <div className="text-center p-8">Page not found.</div>;
  if (!nav) return <div className="text-center p-8 animate-pulse">Loading…</div>;

  return (
    <main className="flex flex-col items-center gap-4 py-8">
      <h1 className="text-3xl font-bold">Peach Boy</h1>
      <NavBar nav={nav} navigate={navigate} />
      <img
        src={nav.imageUrl}
        alt={`Peach Boy Chapter ${chapter} Page ${page}`}
        className="max-w-full h-auto border shadow rounded"
      />
      <NavBar nav={nav} navigate={navigate} />
    </main>
  );
}

function NavBar({ nav, navigate }: { nav: NavState; navigate: (to: string) => void }) {
  return (
    <nav className="flex gap-2">
      <button
        className="px-3 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
        onClick={() => navigate(`/chapter-1/1`)}
        disabled={nav.imageUrl.endsWith('/chapter-1/1.webp')}
      >
        First
      </button>
      <button
        className="px-3 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
        disabled={!nav.prevUrl}
        onClick={() => nav.prevUrl && navigate(nav.prevUrl)}
      >
        Previous
      </button>
      <button
        className="px-3 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
        disabled={!nav.nextUrl}
        onClick={() => nav.nextUrl && navigate(nav.nextUrl)}
      >
        Next
      </button>
      <button
        className="px-3 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
        disabled={!nav.nextUrl}
        onClick={() => nav.nextUrl && navigate(nav.nextUrl)}
        title="Latest (placeholder until a discovery strategy is added)"
      >
        Latest
      </button>
    </nav>
  );
}

async function head(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}
