import { useParams, useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { ENV } from "../env";

// Get files in a chapter folder via S3 API, sorted alphabetically
async function getChapterFiles(chapter: string): Promise<string[]> {
  try {
    const prefix = `chapter-${chapter}/`;
    const url = `${ENV.AWS_ENDPOINT_URL_S3}/${ENV.BUCKET_NAME}?list-type=2&prefix=${encodeURIComponent(prefix)}`;
    
    const response = await fetch(url);
    if (!response.ok) return [];
    
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const keys = Array.from(xmlDoc.getElementsByTagName('Key'))
      .map(key => key.textContent)
      .filter((key): key is string => key !== null && key.endsWith('.webp'))
      .sort(); // Alphabetical order
    
    return keys;
  } catch (error) {
    console.error('Error listing chapter files:', error);
    return [];
  }
}

function buildUrl(filename: string) {
  return `${ENV.S3_BASE}/${filename}`;
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

  useEffect(() => {
    if (!chapter || !page) return;
    let abort = false;
    
    async function run() {
      if (!chapter || !page) return;
      
      // Get all files in current chapter
      const files = await getChapterFiles(chapter);
      const pageNum = Number(page);
      const fileIndex = pageNum - 1; // Convert 1-based page to 0-based index
      
      // Get current image URL (may be broken, that's ok)
      const currentFile = files[fileIndex];
      const imageUrl = currentFile ? buildUrl(currentFile) : '';
      
      // Previous page logic
      let prevUrl: string | undefined;
      if (fileIndex > 0) {
        prevUrl = `/${chapter}/${pageNum - 1}`;
      }
      
      // Next page logic  
      let nextUrl: string | undefined;
      if (fileIndex + 1 < files.length) {
        nextUrl = `/${chapter}/${pageNum + 1}`;
      } else {
        // Try first page of next chapter
        const nextChapter = String(Number(chapter) + 1);
        const nextChapterFiles = await getChapterFiles(nextChapter);
        if (nextChapterFiles.length > 0) {
          nextUrl = `/${nextChapter}/1`;
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
  }, [chapter, page]);

  if (!nav) return <div className="text-center p-8 animate-pulse">Loading…</div>;

  return (
    <main className="flex flex-col items-center gap-4 py-8">
      <h1 className="text-3xl font-bold">{ENV.APP_NAME}</h1>
      <NavBar nav={nav} navigate={navigate} />
      <div
        className="max-w-full cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-label={nav.nextUrl ? 'Next page' : 'Current page (no next page)'}
        onClick={() => nav.nextUrl && navigate(nav.nextUrl)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && nav.nextUrl) {
            e.preventDefault();
            navigate(nav.nextUrl);
          }
        }}
      >
        <img
          src={nav.imageUrl}
          alt={`${ENV.APP_NAME} Chapter ${chapter} Page ${page}`}
          className="max-w-full h-auto border shadow rounded"/>
      </div>
      <NavBar nav={nav} navigate={navigate} />
    </main>
  );
}

function NavBar({ nav, navigate }: { nav: NavState; navigate: (to: string) => void }) {
  return (
    <nav className="flex gap-2">
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
    </nav>
  );
}
