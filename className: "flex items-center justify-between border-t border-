const COLORS = {
  bg: "#0a0a0a",
  panel: "#141414",
  glow: "#2196f3",
  glow2: "#64b5f6",
  text: "#f0f0f0",
  sub: "#888888",
  accent: "#1976d2"
};

// Utility Functions
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const load = (k, def) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : def;
  } catch (e) {
    return def;
  }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const randomNick = () => {
  const adj = [
    "은하", "잔물결", "번짐", "달빛", "초승", "고요", "송곳", "시안", 
    "잉크", "별사탕", "고래", "청해", "비늘", "안개", "우주", "전파", "유성", "심야"
  ];
  const ani = [
    "고양이", "까치", "문어", "수달", "물고기", "참새", "너구리", 
    "사막여우", "늑대", "제비"
  ];
  return adj[Math.floor(Math.random() * adj.length)] + 
         ani[Math.floor(Math.random() * ani.length)] + 
         "#" + Math.floor(100 + Math.random() * 900);
};

// Korean Text Processing
const STOP_WORDS = [
  "그리고", "그래서", "하지만", "그러나", "나는", "우리는", "너는", "오늘", 
  "지금", "정말", "약간", "너무", "진짜", "그냥", "근데", "하면", "하려고", 
  "해서", "하다", "했다", "하는", "했더니", "있다", "없다", "같다", "보다"
];

const KEYWORD_MAP = {
  "우울": "위로", "슬퍼": "위로", "힘들": "위로", "불안": "위로",
  "행복": "기쁨", "기뻐": "기쁨", "웃김": "유머", "웃겨": "유머",
  "시험": "수능", "수능": "수능", "공부": "공부", "과제": "공부",
  "친구": "친구", "연애": "연애", "사랑": "연애",
  "게임": "게임", "롤": "게임", "그림": "그림", "그려": "그림",
  "음악": "음악", "노래": "음악", "학교": "학교", "선생": "학교",
  "부모": "가족", "엄마": "가족", "아빠": "가족",
  "운동": "운동", "러닝": "운동",
  "날씨": "날씨", "비": "날씨", "더워": "날씨", "추워": "날씨"
};

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[\n.,!?~\-(){}'";:]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function suggestTags(text, extra = "") {
  const words = [...tokenize(text), ...tokenize(extra)];
  const counts = {};
  
  for (const word of words) {
    if (word.length < 2 || STOP_WORDS.includes(word)) continue;
    const key = KEYWORD_MAP[word] || word;
    counts[key] = (counts[key] || 0) + 1;
  }
  
  let arr = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);
  
  const preferredCategories = [
    "위로", "기쁨", "수능", "공부", "친구", "연애", "게임", 
    "그림", "음악", "학교", "가족", "운동", "날씨"
  ];
  
  const chosen = [];
  for (const category of preferredCategories) {
    if (arr.includes(category)) chosen.push(category);
  }
  for (const item of arr) {
    if (!chosen.includes(item)) chosen.push(item);
  }
  
  return chosen.slice(0, 3);
}

function generateAutoReply(text) {
  const lowerText = (text || "").toLowerCase();
  
  if (/우울|슬퍼|불안|힘들/.test(lowerText)) {
    return "조금 젖어도 괜찮아. 파도는 늘 돌아와.";
  }
  if (/수능|시험|공부|과제/.test(lowerText)) {
    return "한 줄씩, 한 문제씩. 물은 돌을 이겨.";
  }
  if (/기쁨|행복|좋아|신남/.test(lowerText)) {
    return "좋음을 오래 보관하는 법: 천천히 말하기.";
  }
  
  return "흔들려도 흐르자. 여기선 함께.";
}

// Storage Configuration
const DB_KEY = 'ovra_posts';
const NICK_KEY = 'ovra_nick';
const SETTING_KEY = 'ovra_settings';
const BOOKMARKS_KEY = 'ovra_bookmarks';
const LIKES_KEY = 'ovra_likes';
const BLOCKED_KEY = 'ovra_blocked';

// PWA Installation
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

// Image Upload Utility
const uploadImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
};

// React Components
const Header = ({ nick, onSearch, currentView, onViewChange, onProfileClick }) => (
  React.createElement('header', {
    className: "sticky top-0 z-40 backdrop-blur border-b border-white/10"
  }, [
    React.createElement('div', {
      key: 'container',
      className: "mx-auto max-w-4xl px-4 py-3 flex items-center gap-3 justify-between card-glass sparkle"
    }, [
      React.createElement('div', {
        key: 'logo',
        className: "flex items-center gap-4"
      }, [
        React.createElement('h1', {
          key: 'title',
          className: "text-lg font-bold text-[--glow] cursor-pointer animate-float",
          onClick: () => onViewChange('home')
        }, "OVRA"),
        React.createElement('nav', {
          key: 'nav',
          className: "flex gap-2"
        }, [
          React.createElement('button', {
            key: 'home',
            className: `px-3 py-1 text-sm rounded-lg transition ${currentView === 'home' ? 'bg-[--glow] text-black' : 'text-[--sub] hover:text-[--tc]'}`,
            onClick: () => onViewChange('home')
          }, "홈"),
          React.createElement('button', {
            key: 'bookmarks',
            className: `px-3 py-1 text-sm rounded-lg transition ${currentView === 'bookmarks' ? 'bg-[--glow] text-black' : 'text-[--sub] hover:text-[--tc]'}`,
            onClick: () => onViewChange('bookmarks')
          }, "북마크"),
          React.createElement('button', {
            key: 'profile',
            className: `px-3 py-1 text-sm rounded-lg transition ${currentView === 'profile' ? 'bg-[--glow] text-black' : 'text-[--sub] hover:text-[--tc]'}`,
            onClick: () => onViewChange('profile')
          }, "내 글")
        ])
      ]),
      React.createElement('div', {
        key: 'search',
        className: "flex-1 max-w-sm flex items-center gap-2"
      }, [
        React.createElement('input', {
          key: 'searchInput',
          onChange: e => onSearch(e.target.value),
          placeholder: "검색…",
          className: "flex-1 rounded-lg px-3 py-2 bg-[--panel] border border-white/10 text-[--tc] placeholder-[--sub] outline-none focus:ring-2 ring-[--glow]/40"
        })
      ]),
      React.createElement('button', {
        key: 'profileBtn',
        className: "text-xs text-[--sub] hover:text-[--tc] transition cursor-pointer px-2 py-1 rounded",
        onClick: onProfileClick
      }, nick)
    ])
  ])
);

const Tag = ({ children }) => (
  React.createElement('span', {
    className: "px-2 py-1 rounded-full text-[10px] tracking-wide bg-white/5 border border-white/10 text-[--sub]"
  }, `#${children}`)
);

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  
  return React.createElement('div', {
    className: "fixed inset-0 z-50"
  }, [
    React.createElement('div', {
      key: 'backdrop',
      className: "absolute inset-0 bg-black/50",
      onClick: onClose
    }),
    React.createElement('div', {
      key: 'content',
      className: "absolute inset-x-0 bottom-0 md:inset-0 md:m-auto md:h-[80vh] max-h-[90vh] overflow-auto mx-2 md:mx-auto md:max-w-2xl rounded-3xl card-glass sparkle p-4"
    }, children)
  ]);
};

const PostCard = ({ post, onQuote, onOpen, onLike, onBookmark, onDelete, onReport, onAuthorClick, isLiked, isBookmarked, currentUser, isOwnPost }) => {
  const date = new Date(post.ts).toLocaleString();
  
  return React.createElement('article', {
    className: "rounded-lg card-glass sparkle hover:brightness-110 transition"
  }, [
    React.createElement('div', {
      key: 'content',
      className: "p-4"
    }, [
      React.createElement('div', {
        key: 'header',
        className: "flex items-center justify-between mb-3"
      }, [
        React.createElement('div', {
          key: 'authorInfo',
          className: "flex items-center gap-3"
        }, [
          React.createElement('div', {
            key: 'avatar',
            className: "h-8 w-8 rounded-full bg-gradient-to-b from-[--glow] to-[--accent] cursor-pointer",
            onClick: () => onAuthorClick(post.author)
          }),
          React.createElement('div', {
            key: 'meta',
            className: "flex flex-col"
          }, [
            React.createElement('span', {
              key: 'author',
              className: "text-sm font-medium text-[--tc] cursor-pointer hover:text-[--glow]",
              onClick: () => onAuthorClick(post.author)
            }, post.author),
            React.createElement('span', {
              key: 'date',
              className: "text-xs text-[--sub]"
            }, date)
          ])
        ]),
        React.createElement('div', {
          key: 'menu',
          className: "flex items-center gap-1"
        }, [
          isOwnPost && React.createElement('button', {
            key: 'delete',
            className: "p-1 text-[--sub] hover:text-red-400 transition text-xs",
            onClick: () => onDelete(post.id),
            title: "삭제"
          }, "🗑"),
          !isOwnPost && React.createElement('button', {
            key: 'report',
            className: "p-1 text-[--sub] hover:text-yellow-400 transition text-xs",
            onClick: () => onReport(post.id),
            title: "신고"
          }, "⚠")
        ])
      ]),
      React.createElement('div', {
        key: 'postContent',
        className: "space-y-2"
      }, [
        React.createElement('h3', {
          key: 'title',
          className: "font-medium text-[--tc] hover:underline cursor-pointer",
          onClick: () => onOpen(post)
        }, post.title || "(제목 없음)"),
        React.createElement('p', {
          key: 'body',
          className: "text-[--tc] leading-relaxed line-clamp-3 text-sm"
        }, post.body),
        post.image && React.createElement('img', {
          key: 'image',
          src: post.image,
          alt: "첨부 이미지",
          className: "max-w-full h-auto rounded-lg border border-white/10 cursor-pointer",
          onClick: () => onOpen(post)
        }),
        post.quoteOf && React.createElement('div', {
          key: 'quote',
          className: "p-3 rounded-lg bg-white/5 border border-white/10 ring-1 ring-white/5"
        }, [
          React.createElement('div', {
            key: 'quoteLabel',
            className: "text-xs text-[--glow] mb-1"
          }, "인용"),
          React.createElement('p', {
            key: 'quoteContent',
            className: "text-xs text-[--tc] leading-relaxed"
          }, [
            post.quoteOf.title,
            " — ",
            React.createElement('span', {
              key: 'quoteAuthor',
              className: "text-[--sub]"
            }, post.quoteOf.author),
            React.createElement('br', { key: 'br' }),
            post.quoteOf.body
          ])
        ]),
        post.tags.length > 0 && React.createElement('div', {
          key: 'tags',
          className: "flex flex-wrap gap-1"
        }, post.tags.map(tag => 
          React.createElement(Tag, { key: tag }, tag)
        ))
      ])
    ]),
    React.createElement('div', {
      key: 'actions',
      className: "flex items-center justify-between border-t border-white/10 px-4 py-2 text-[--sub] text-sm"
    }, [
      React.createElement('div', {
        key: 'actionButtons',
        className: "flex gap-4"
      }, [
        React.createElement('button', {
          key: 'like',
          className: `flex items-center gap-1 hover:text-[--tc] transition ${isLiked ? 'text-red-400' : ''}`,
          onClick: () => onLike(post.id)
        }, [
          React.createElement('span', { key: 'icon' }, isLiked ? '❤️' : '🤍'),
          React.createElement('span', { key: 'count' }, post.likes || 0)
        ]),
        React.createElement('button', {
          key: 'comments',
          className: "flex items-center gap-1 hover:text-[--tc] transition",
          onClick: () => onOpen(post)
        }, [
          React.createElement('span', { key: 'icon' }, '💬'),
          React.createElement('span', { key: 'count' }, post.comments.length)
        ]),
        React.createElement('button', {
          key: 'quote',
          className: "hover:text-[--tc] transition",
          onClick: () => onQuote(post)
        }, "인용"),
        React.createElement('button', {
          key: 'bookmark',
          className: `hover:text-[--tc] transition ${isBookmarked ? 'text-[--glow]' : ''}`,
          onClick: () => onBookmark(post.id)
        }, isBookmarked ? '⭐' : '☆')
      ])
    ])
  ]);
};

const Composer = ({ nick, quoteTarget, onCancelQuote, onPost }) => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [tagInput, setTagInput] = React.useState("");
  const [image, setImage] = React.useState(null);
  const fileInputRef = React.useRef(null);
  
  React.useEffect(() => {
    const suggestedTags = suggestTags(title + " " + body);
    setTags(suggestedTags);
  }, [title, body]);
  
  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
    }
    setTagInput("");
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageData = await uploadImage(file);
      setImage(imageData);
    }
  };
  
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const submit = () => {
    if (!body.trim() && !title.trim()) return;
    onPost({ title, body, tags, quoteTarget, image });
    setTitle("");
    setBody("");
    setTags([]);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  return React.createElement('div', {
    className: "rounded-lg p-4 card-glass sparkle"
  }, [
    React.createElement('div', {
      key: 'composerContent',
      className: "flex gap-3"
    }, [
      React.createElement('div', {
        key: 'avatar',
        className: "h-8 w-8 shrink-0 rounded-full bg-gradient-to-b from-[--glow] to-[--accent]"
      }),
      React.createElement('div', {
        key: 'form',
        className: "flex-1 space-y-3"
      }, [
        React.createElement('input', {
          key: 'titleInput',
          value: title,
          onChange: e => setTitle(e.target.value.slice(0, 80)),
          placeholder: "제목 (최대 80자)",
          className: "w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-[--tc] placeholder-[--sub] outline-none focus:ring-2 ring-[--glow]/40"
        }),
        React.createElement('textarea', {
          key: 'bodyInput',
          value: body,
          onChange: e => setBody(e.target.value.slice(0, 500)),
          placeholder: "무엇을 나누고 싶나요? (최대 500자)",
          className: "w-full min-h-20 resize-y rounded-lg bg-white/5 placeholder-[--sub] text-[--tc] p-3 outline-none focus:ring-2 ring-[--glow]/40 border border-white/10"
        }),
        image && React.createElement('div', {
          key: 'imagePreview',
          className: "relative inline-block"
        }, [
          React.createElement('img', {
            key: 'img',
            src: image,
            alt: "미리보기",
            className: "max-w-32 h-auto rounded-lg border border-white/10"
          }),
          React.createElement('button', {
            key: 'removeBtn',
            onClick: removeImage,
            className: "absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
          }, "×")
        ]),
        quoteTarget && React.createElement('div', {
          key: 'quoteSection',
          className: "p-3 rounded-lg bg-white/5 border border-white/5"
        }, [
          React.createElement('div', {
            key: 'quoteLabel',
            className: "text-xs text-[--glow] mb-2"
          }, "인용할 글"),
          React.createElement('div', {
            key: 'quoteContent',
            className: "text-sm text-[--tc]"
          }, [
            React.createElement('div', {
              key: 'quoteTitle',
              className: "font-medium"
            }, quoteTarget.title),
            React.createElement('div', {
              key: 'quoteAuthor',
              className: "text-[--sub] text-xs"
            }, `@${quoteTarget.author}`),
            React.createElement('div', {
              key: 'quoteBody',
              className: "mt-1"
            }, quoteTarget.body)
          ]),
          React.createElement('button', {
            key: 'cancelQuote',
            className: "mt-2 text-xs text-[--glow] hover:underline",
            onClick: onCancelQuote
          }, "인용 취소")
        ]),
        React.createElement('div', {
          key: 'tagsSection',
          className: "flex items-center gap-2 flex-wrap"
        }, [
          ...tags.map(tag => 
            React.createElement(Tag, { key: tag }, tag)
          ),
          React.createElement('input', {
            key: 'tagInput',
            value: tagInput,
            onChange: e => setTagInput(e.target.value),
            placeholder: "#태그추가",
            className: "text-sm rounded-lg px-2 py-1 bg-white/5 border border-white/10 text-[--tc] placeholder-[--sub] outline-none"
          }),
          React.createElement('button', {
            key: 'addTag',
            className: "text-xs text-[--glow] hover:underline",
            onClick: addTag
          }, "추가")
        ]),
        React.createElement('div', {
          key: 'bottomSection',
          className: "flex items-center justify-between"
        }, [
          React.createElement('div', {
            key: 'tools',
            className: "flex gap-2"
          }, [
            React.createElement('input', {
              key: 'fileInput',
              ref: fileInputRef,
              type: 'file',
              accept: 'image/*',
              onChange: handleImageUpload,
              className: "hidden"
            }),
            React.createElement('button', {
              key: 'imageBtn',
              type: 'button',
              onClick: () => fileInputRef.current?.click(),
              className: "text-[--sub] hover:text-[--glow] transition text-sm",
              title: "이미지 첨부"
            }, "📷"),
            React.createElement('span', {
              key: 'charCount',
              className: "text-xs text-[--sub]"
            }, `${body.length}/500`)
          ]),
          React.createElement('button', {
            key: 'submitButton',
            className: "px-4 py-2 rounded-lg font-medium bg-[--glow] hover:bg-[--accent] text-white transition",
            onClick: submit
          }, "게시")
        ])
      ])
    ])
  ]);
};

const PostDetail = ({ post, onClose, onAddComment, onDeleteComment, currentUser }) => {
  const [commentText, setCommentText] = React.useState("");
  
  const submit = () => {
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText("");
  };
  
  return React.createElement('div', {}, [
    React.createElement('div', {
      key: 'header',
      className: "flex items-center gap-3 mb-3"
    }, [
      React.createElement('button', {
        key: 'closeButton',
        className: "text-[--glow] hover:underline",
        onClick: onClose
      }, "← 닫기"),
      React.createElement('h3', {
        key: 'title',
        className: "font-semibold text-[--tc]"
      }, "상세 보기")
    ]),
    React.createElement(PostCard, {
      key: 'postCard',
      post: post,
      onQuote: () => {},
      onOpen: () => {},
      onLike: () => {},
      onBookmark: () => {},
      onDelete: () => {},
      onReport: () => {},
      onAuthorClick: () => {},
      isLiked: false,
      isBookmarked: false,
      currentUser: currentUser,
      isOwnPost: false
    }),
    React.createElement('div', {
      key: 'commentsSection',
      className: "mt-4 p-4 rounded-lg border border-white/5 bg-white/5"
    }, [
      React.createElement('div', {
        key: 'commentsHeader',
        className: "text-sm text-[--sub] mb-3"
      }, `댓글 ${post.comments.length}`),
      React.createElement('div', {
        key: 'commentsList',
        className: "space-y-3 max-h-60 overflow-auto mb-3"
      }, [
        ...post.comments.map(comment => 
          React.createElement('div', {
            key: comment.id,
            className: "p-3 rounded-lg bg-[--panel] border border-white/5 flex justify-between"
          }, [
            React.createElement('div', {
              key: 'commentContent',
              className: "flex-1"
            }, [
              React.createElement('div', {
                key: 'commentMeta',
                className: "text-xs text-[--sub] mb-1"
              }, `${comment.author} · ${new Date(comment.ts).toLocaleString()}`),
              React.createElement('div', {
                key: 'commentText',
                className: "text-[--tc] text-sm"
              }, comment.text)
            ]),
            (comment.author === currentUser || post.author === currentUser) && React.createElement('button', {
              key: 'deleteComment',
              className: "text-[--sub] hover:text-red-400 transition text-xs",
              onClick: () => onDeleteComment && onDeleteComment(post.id, comment.id),
              title: "삭제"
            }, "🗑")
          ])
        ),
        post.comments.length === 0 && React.createElement('div', {
          key: 'noComments',
          className: "text-[--sub] text-sm text-center py-4"
        }, "아직 댓글이 없어요.")
      ]),
      React.createElement('div', {
        key: 'commentForm',
        className: "flex gap-2"
      }, [
        React.createElement('input', {
          key: 'commentInput',
          value: commentText,
          onChange: e => setCommentText(e.target.value.slice(0, 200)),
          placeholder: "댓글을 입력하세요 (최대 200자)",
          className: "flex-1 rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-[--tc] placeholder-[--sub] outline-none focus:ring-2 ring-[--glow]/40"
        }),
        React.createElement('button', {
          key: 'submitComment',
          className: "px-4 py-2 rounded-lg font-medium bg-[--glow] hover:bg-[--accent] text-white transition",
          onClick: submit
        }, "등록")
      ])
    ])
  ]);
};

// Infinite Scroll Hook
const useInfiniteScroll = (posts, postsPerPage = 10) => {
  const [displayedPosts, setDisplayedPosts] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    setDisplayedPosts(posts.slice(0, postsPerPage));
    setHasMore(posts.length > postsPerPage);
  }, [posts, postsPerPage]);

  const loadMore = React.useCallback(() => {
    const currentLength = displayedPosts.length;
    const newPosts = posts.slice(0, currentLength + postsPerPage);
    setDisplayedPosts(newPosts);
    setHasMore(newPosts.length < posts.length);
  }, [posts, displayedPosts.length, postsPerPage]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (hasMore) loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadMore]);

  return { displayedPosts, hasMore };
};

// App Component
function App() {
  const [nick, setNick] = React.useState(load(NICK_KEY, randomNick()));
  const [posts, setPosts] = React.useState(load(DB_KEY, []));
  const [search, setSearch] = React.useState("");
  const [quoteTarget, setQuoteTarget] = React.useState(null);
  const [detail, setDetail] = React.useState(null);
  const [settings, setSettings] = React.useState(load(SETTING_KEY, { autoReply: false }));
  const [currentView, setCurrentView] = React.useState('home');
  const [viewingAuthor, setViewingAuthor] = React.useState(null);
  const [likes, setLikes] = React.useState(load(LIKES_KEY, {}));
  const [bookmarks, setBookmarks] = React.useState(load(BOOKMARKS_KEY, []));
  const [blocked, setBlocked] = React.useState(load(BLOCKED_KEY, []));

  React.useEffect(() => save(NICK_KEY, nick), [nick]);
  React.useEffect(() => save(DB_KEY, posts), [posts]);
  React.useEffect(() => save(SETTING_KEY, settings), [settings]);
  React.useEffect(() => save(LIKES_KEY, likes), [likes]);
  React.useEffect(() => save(BOOKMARKS_KEY, bookmarks), [bookmarks]);
  React.useEffect(() => save(BLOCKED_KEY, blocked), [blocked]);

  const createPost = ({ title, body, tags, quoteTarget, image }) => {
    const base = {
      id: uid(),
      title,
      body,
      tags,
      author: nick,
      ts: Date.now(),
      likes: 0,
      comments: [],
      quoteOf: null,
      image
    };
    if (quoteTarget) {
      base.quoteOf = {
        id: quoteTarget.id,
        title: quoteTarget.title,
        author: quoteTarget.author,
        body: quoteTarget.body
      };
    }
    const newPosts = [base, ...posts];
    if (settings.autoReply) {
      base.comments.push({
        id: uid(),
        author: "OVRA-AI",
        text: generateAutoReply(title + " " + body),
        ts: Date.now()
      });
    }
    setPosts(newPosts);
    setQuoteTarget(null);
  };

  const addComment = (postId, text) => {
    setPosts(ps => ps.map(p => 
      p.id === postId 
        ? { ...p, comments: [...p.comments, { id: uid(), author: nick, text, ts: Date.now() }] }
        : p
    ));
  };

  const deleteComment = (postId, commentId) => {
    setPosts(ps => ps.map(p => 
      p.id === postId 
        ? { ...p, comments: p.comments.filter(c => c.id !== commentId) }
        : p
    ));
  };

  const toggleLike = (postId) => {
    const isLiked = likes[postId];
    const newLikes = { ...likes };
    
    if (isLiked) {
      delete newLikes[postId];
    } else {
      newLikes[postId] = true;
    }
    
    setLikes(newLikes);
    setPosts(ps => ps.map(p => 
      p.id === postId 
        ? { ...p, likes: (p.likes || 0) + (isLiked ? -1 : 1) }
        : p
    ));
  };

  const toggleBookmark = (postId) => {
    if (bookmarks.includes(postId)) {
      setBookmarks(bookmarks.filter(id => id !== postId));
    } else {
      setBookmarks([...bookmarks, postId]);
    }
  };

  const deletePost = (postId) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const reportPost = (postId) => {
    if (confirm('이 게시글을 신고하시겠습니까?')) {
      alert('신고가 접수되었습니다.');
    }
  };

  const viewAuthorPosts = (author) => {
    setViewingAuthor(author);
    setCurrentView('author');
  };

  const getFilteredPosts = () => {
    let filtered = posts.filter(p => !blocked.includes(p.author));
    
    if (search.trim()) {
      const key = search.toLowerCase();
      filtered = filtered.filter(p => 
        [p.title, p.body, p.author, ...p.tags].join(" ").toLowerCase().includes(key)
      );
    }
    
    switch (currentView) {
      case 'bookmarks':
        return filtered.filter(p => bookmarks.includes(p.id));
      case 'profile':
        return filtered.filter(p => p.author === nick);
      case 'author':
        return filtered.filter(p => p.author === viewingAuthor);
      default:
        return filtered;
    }
  };

  const filteredPosts = getFilteredPosts();
  const { displayedPosts, hasMore } = useInfiniteScroll(filteredPosts);

  // Initialize with seed post
  React.useEffect(() => {
    if (posts.length === 0) {
      const seed = {
        id: uid(),
        title: "OVRA 커뮤니티",
        body: "새로운 커뮤니티가 시작되었습니다. 자유롭게 소통해보세요!",
        tags: ["공지", "시작"],
        author: "관리자",
        ts: Date.now(),
        likes: 5,
        comments: []
      };
      setPosts([seed]);
    }
  }, []);

  const renderContent = () => {
    if (currentView === 'author' && viewingAuthor) {
      return React.createElement('div', {
        className: "space-y-4"
      }, [
        React.createElement('div', {
          key: 'authorHeader',
          className: "flex items-center gap-3 mb-6"
        }, [
          React.createElement('button', {
            key: 'backBtn',
            onClick: () => setCurrentView('home'),
            className: "text-[--glow] hover:underline"
          }, "← 돌아가기"),
          React.createElement('h2', {
            key: 'authorTitle',
            className: "text-lg font-medium text-[--tc]"
          }, `${viewingAuthor}님의 게시글 (${displayedPosts.length})`)
        ]),
        displayedPosts.length === 0 ? React.createElement('div', {
          key: 'noAuthorPosts',
          className: "text-center text-[--sub] py-8"
        }, "작성한 글이 없습니다.") : React.createElement('div', {
          key: 'authorPosts',
          className: "space-y-4"
        }, displayedPosts.map(post => 
          React.createElement(PostCard, {
            key: post.id,
            post,
            onQuote: setQuoteTarget,
            onOpen: setDetail,
            onLike: toggleLike,
            onBookmark: toggleBookmark,
            onDelete: deletePost,
            onReport: reportPost,
            onAuthorClick: viewAuthorPosts,
            isLiked: !!likes[post.id],
            isBookmarked: bookmarks.includes(post.id),
            currentUser: nick,
            isOwnPost: post.author === nick
          })
        ))
      ]);
    }

    return React.createElement('div', {
      className: "space-y-6"
    }, [
      currentView === 'home' && React.createElement(Composer, {
        key: 'composer',
        nick: nick,
        quoteTarget: quoteTarget,
        onCancelQuote: () => setQuoteTarget(null),
        onPost: createPost
      }),
      
      displayedPosts.length === 0 ? React.createElement('div', {
        key: 'noResults',
        className: "text-center text-[--sub] py-8"
      }, currentView === 'bookmarks' ? '북마크한 글이 없습니다.' :
         currentView === 'profile' ? '작성한 글이 없습니다.' :
         search ? '검색 결과가 없습니다.' : '게시글이 없습니다.') : React.createElement('div', {
        key: 'postsList',
        className: "space-y-4"
      }, [
        ...displayedPosts.map(post => 
          React.createElement(PostCard, {
            key: post.id,
            post,
            onQuote: setQuoteTarget,
            onOpen: setDetail,
            onLike: toggleLike,
            onBookmark: toggleBookmark,
            onDelete: deletePost,
            onReport: reportPost,
            onAuthorClick: viewAuthorPosts,
            isLiked: !!likes[post.id],
            isBookmarked: bookmarks.includes(post.id),
            currentUser: nick,
            isOwnPost: post.author === nick
          })
        ),
        hasMore && React.createElement('div', {
          key: 'loadingMore',
          className: "text-center py-4"
        }, React.createElement('div', {
          className: "text-[--sub] text-sm"
        }, "더 많은 게시글 로딩 중..."))
      ])
    ]);
  };

  return React.createElement('div', {
    className: "min-h-screen bg-[--bg]",
    style: { "--sub": COLORS.sub }
  }, [
    React.createElement(Header, {
      key: 'header',
      nick,
      onSearch: setSearch,
      currentView,
      onViewChange: setCurrentView,
      onProfileClick: () => {
        const newNick = randomNick();
        setNick(newNick);
      }
    }),
    
    React.createElement('main', {
      key: 'main',
      className: "mx-auto max-w-4xl px-4 py-6"
    }, [
      currentView === 'home' && React.createElement('div', {
        key: 'settings',
        className: "flex items-center justify-between text-xs text-[--sub] mb-6 p-3 rounded-lg card-glass sparkle"
      }, [
        React.createElement('div', {
          key: 'autoReply',
          className: "flex items-center gap-2"
        }, [
          React.createElement('span', { key: 'label' }, "자동 응원댓글"),
          React.createElement('label', {
            key: 'toggle',
            className: "inline-flex items-center gap-2 cursor-pointer select-none"
          }, [
            React.createElement('input', {
              key: 'checkbox',
              type: "checkbox",
              checked: settings.autoReply,
              onChange: e => setSettings({ ...settings, autoReply: e.target.checked })
            }),
            React.createElement('span', { key: 'status' }, settings.autoReply ? "켜짐" : "꺼짐")
          ])
        ]),
        React.createElement('button', {
          key: 'changeNick',
          className: "px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition",
          onClick: () => {
            const newNick = randomNick();
            setNick(newNick);
          }
        }, "닉네임 변경")
      ]),
      
      renderContent()
    ]),

    React.createElement(Modal, {
      key: 'modal',
      open: !!detail,
      onClose: () => setDetail(null)
    }, detail && React.createElement(PostDetail, {
      key: 'postDetail',
      post: detail,
      onClose: () => setDetail(null),
      onAddComment: addComment,
      onDeleteComment: deleteComment,
      currentUser: nick
    }))
  ]);
}

// Initialize the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
