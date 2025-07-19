
# README-AI 🪄  
### Zero-friction README generator powered by AI

> Paste your project details — or link your repo — and get a **publication-ready README.md** in seconds.  
> No sign-up, no ads, 100 % free.

---

## ✨ Features

| Feature | What it does |
|---|---|
| **Smart AI Parser** | Transforms raw notes → polished Markdown |
| **Challenge Mode** | Auto-adds day #, title & reflection for #100DaysOfCode, Advent-of-Code, etc. |
| **Repository Import** | Reads `package.json`, `Cargo.toml`, `requirements.txt`, and more |
| **Template Gallery** | 6 hand-crafted styles: Classic, Minimal, Corporate, Creative, Docs-like, Challenge-centric |
| **Live Preview** | Monaco + rendered pane synced in real time |
| **One-Click Export** | Download `.md`, copy to clipboard, or commit straight to GitHub |
| **Dark / Light Mode** | Respects your OS preference |

---

## 🚀 Quick Start

1. **Go** → [readme-creator-app](https://readme-creator-app.vercel.app)  
2. **Choose** a project type (Standard / Challenge / Library / DevOps)  
3. **Fill** the wizard (or paste a repo URL)  
4. **Preview** & tweak  
5. **Download** your `README.md`

---

## 🏆 Challenge Mode Example

| Field | Sample |
|---|---|
| Day | `42` |
| Challenge Title | `Markdown Parser` |
| Link | `https://leetcode.com/problems/...` |
| Reflection | `Learned about regex capture groups.` |

Produces:

```markdown
# Day 42 – Markdown Parser
> LeetCode challenge solved using recursive descent parsing.
```

---

## 📸 Screenshots

| Light Mode | Dark Mode |
|---|---|
| ![light](https://readme-creator-app.vercel.app/assets/light.png) | ![dark](https://readme-creator-app.vercel.app/assets/dark.png) |

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Monaco Editor, React-Query  
- **AI Engine**: OpenAI GPT-4-turbo (client-side streaming)  
- **Export**: `docx.js` for .docx, `turndown` for HTML→Markdown  
- **Hosting**: Vercel Edge Functions

---

## 🧪 Local Development

```bash
git clone https://github.com/readme-ai/app.git
cd app
pnpm i
pnpm dev      # http://localhost:3000
```

---


## 🤝 Contributing

We ❤️ PRs! feel free to contribute to the app 🙂.

---

## 📄 License

MIT © README-AI contributors

---

## 🙋‍♂️ FAQ

**Q: Is it really free?**  
A: Yes—no limits, no watermarks.

**Q: Do you store my data?**  
A: No. Everything runs in your browser; we never see your content.

---

Made with 💙 by developers, for developers.
```