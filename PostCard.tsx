<div className="card-glass sparkle p-4 shadow-glass transition hover:shadow-moon">
  <div className="flex gap-3">
    <img src={authorAvatar} className="h-10 w-10 rounded-full ring-1 ring-white/10" />
    <div className="flex-1">
      <div className="flex items-center gap-2 text-ink-300 text-sm">
        <span className="font-medium text-moon-100">{authorName}</span>
        <span>·</span>
        <time>{timeAgo}</time>
      </div>

      {/* 본문 */}
      <p className="mt-2 leading-relaxed text-moon-100/95">{content}</p>

      {/* 이미지가 있으면 달빛 테두리 */}
      {images?.length ? (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {images.map((src:string,i:number)=>(
            <img key={i} src={src} className="rounded-lg ring-1 ring-white/10 shadow-glass"/>
          ))}
        </div>
      ):null}

      {/* 태그 */}
      {!!tags?.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t:string)=>(
            <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-white/5 ring-1 ring-white/10">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* 액션 바 */}
      <div className="mt-3 flex items-center gap-4 text-ink-300">
        <button className="hover:text-stardust-400">♡ {likeCount}</button>
        <button className="hover:text-stardust-400">✦ 북마크</button>
        <button className="hover:text-stardust-400">↩ 인용</button>
      </div>
    </div>
  </div>
</div>
