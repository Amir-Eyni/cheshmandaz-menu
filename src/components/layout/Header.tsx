import { site } from "@/config/site";

export function Header() {
  return (
    <header className="py-6 text-center">
      <div className="relative inline-block">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent mx-auto mb-2"
          aria-hidden="true"
        >
          <path d="M12 2h2v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V2z" />
          <path d="M12 2v8" />
          <path d="M8 12h8" />
          <path d="M10 2h4" />
        </svg>
        <h1 className="text-accent text-2xl font-bold mt-3">{site.name}</h1>
        <p className="text-muted text-sm tracking-wider mt-1" dir="ltr" lang="en">
          {site.tagline}
        </p>
        <div className="w-16 h-px bg-accent mx-auto mt-3" />
      </div>
    </header>
  );
}
