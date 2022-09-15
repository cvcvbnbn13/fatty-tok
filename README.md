# Fatty-Tok

A Funny Repo using **TypeScript & React(Next.js)** , css framework **Tailwindcss** , deploy by **Vercel**.

網站連結：[Fatty-Tok](https://fatty-tok.vercel.app/)

### 目錄

- [專案簡介](#專案簡介)
- [目錄結構說明](#目錄結構說明)
- [如何執行](#如何執行)

## 專案簡介

```
日常發想，剛好適逢instagram發起抵制TikTok化的網路運動，就試做一個clone版本
```

## 目錄結構說明

├── components
│ ├── Comments
│ ├── Discover
│ ├── Footer
│ ├── LikeButton
│ ├── Navbar
│ ├── NoResults
│ ├── Sidebar
│ ├── SuggestedAccounts
│ ├── VideoCard
│ ├── index.js

├── fatty-tok-backend **_sanity 後端_**
│ ├── schemas
│ │ ├── comment.js
│ │ ├── post.js
│ │ ├── postedBy.js
│ │ ├── user.js
│ │ ├── scheam.js

├── pages
│ ├── api
│ │ ├──discover
│ │ │ ├── [topic].ts
│ │ ├── post
│ │ │ ├── [id].ts
│ │ │ ├── index.ts
│ │ ├── profile
│ │ │ ├── [userId].ts
│ │ ├── search
│ │ │ ├── [searchTerm].ts
│ │ ├── auth.ts
│ │ ├── like.ts
│ │ ├── users.ts
│ ├── detail
│ │ ├── [id].tsx
│ ├── profile
│ │ ├── [userId].tsx
│ ├── search
│ │ ├── [searchTerm].tsx
│ ├── \_app.tsx
│ ├── upload.tsx
│ ├── index.tsx

├── public
├── store **_zustand-state-management_**
├── styles
├── utils
├── types.d.ts
├── next.config.js

## 🚀 如何執行

### Dev Server Guide

1. Clone the project from [Fatty-Tok](https://github.com/cvcvbnbn13/fatty-tok).
2. Move the root path in project folder.
3. Run `npm i` or `npm install` to install node_modules.
4. The default server is on `localhost:3000`, please check you don't have any server on it.
5. Run `npm run dev` to start dev server.

Steps

```git bash
git clone https://github.com/cvcvbnbn13/fatty-tok.git
cd fatty-tok
npm install && npm audit fix
npm run dev
```
