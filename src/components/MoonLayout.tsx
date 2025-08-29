import React from "react";

export default function MoonLayout({children}:{children:React.ReactNode}){
  return (
    <div className="min-h-dvh bg-night-900 text-moon-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-b from-night-900/80 to-transparent backdrop-blur-xs">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MoonLogo/>
            <h1 className="text-lg tracking-wide">OVRA</h1>
          </div>
          <nav className="flex items-center gap-2">
            <a className="px-3 py-1 rounded-md hover:bg-white/5" href="/">피드</a>
            <a className="px-3 py-1 rounded-md hover:bg-white/5" href="/explore">탐색</a>
            <a className="px-3 py-1 rounded-md hover:bg-white/5" href="/bookmarks">북마크</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">{children}</main>

      <footer className="mx-auto max-w-3xl px-4 py-12 text-ink-300 text-sm">
        달이 기울면, 고양이는 발자국을 남긴다.
      </footer>
    </div>
  );
}

function MoonLogo(){
  return (
    <div className="relative">
      <svg width="28" height="28" viewBox="0 0 24 24" className="animate-floaty">
        <path d="M12 2c-3.866 0-7 3.134-7 7 0 4.418 3.582 8 8 8 3.866 0 7-3.134 7-7 0-1.19-.28-2.312-.778-3.304A6.997 6.997 0 0 1 12 2z"
          fill="url(#g)"/>
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#b7c4ff"/><stop offset="1" stopColor="#e7ecff"/>
          </linearGradient>
        </defs>
      </svg>
      {/* 금가루 고리 */}
      <span className="absolute -right-2 -top-1 h-2 w-2 rounded-full bg-stardust-400/70 blur-[0.5px] animate-twinkle"></span>
    </div>
  );
}
