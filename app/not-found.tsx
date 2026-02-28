import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20">
      <h1 className="neon-text mb-4 font-display text-6xl font-bold text-primary">404</h1>
      <p className="mb-6 text-lg text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:neon-glow"
      >
        Go Home
      </Link>
    </div>
  );
}
