# Fatty-Tok

A Funny Repo using **TypeScript & React(Next.js)** , css framework **Tailwindcss** , deploy by **Vercel**.

<a href="https://fatty-tok.vercel.app/">
Demo
</a>

## Struct of Fatty-Tok

- components
  - Comments
  - Discover
  - Footer
  - LikeButton
  - Navbar
  - NoResults
  - Sidebar
  - SuggestedAccounts
  - VideoCard
  - index.js
- fatty-tok-backend **_sanity 後端_**
  - schemas
    - comment.js
    - post.js
    - postedBy.js
    - user.js
    - scheam.js
- pages
  - api
    - discover
      - [topic].ts
    - post
      - [id].ts
      - index.ts
    - profile
      - [userId].ts
    - search
      - [searchTerm].ts
    - auth.ts
    - like.ts
    - users.ts
  - detail
    - [id].tsx
  - profile
    - [userId].tsx
  - search
    - [searchTerm].tsx
  - \_app.tsx
  - upload.tsx
  - index.tsx
- public
- store **_zustand-state-management_**
- styles
- utils
- types.d.ts
- next.config.js

## 🚀 Project Quick Start

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
