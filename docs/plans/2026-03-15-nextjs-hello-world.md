# Next.js Hello World Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace hello.html with a minimal Next.js 14 App Router project in the tramvaj/temp repo.

**Architecture:** Manually scaffolded Next.js 14 project with App Router, TypeScript, no src directory, no extra dependencies.

**Tech Stack:** Next.js 14, React 18, TypeScript

---

### Task 1: Delete hello.html

**Files:**
- Delete: `hello.html`

**Step 1: Remove the file**

```bash
git rm hello.html
```

**Step 2: Verify removal**

```bash
git status
```
Expected: `deleted: hello.html` staged.

---

### Task 2: Create package.json

**Files:**
- Create: `package.json`

**Step 1: Write package.json**

```json
{
  "name": "temp",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5"
  }
}
```

---

### Task 3: Create tsconfig.json

**Files:**
- Create: `tsconfig.json`

**Step 1: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### Task 4: Create next.config.js

**Files:**
- Create: `next.config.js`

**Step 1: Write next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
```

---

### Task 5: Create app/layout.tsx

**Files:**
- Create: `app/layout.tsx`

**Step 1: Write the root layout**

```tsx
export const metadata = {
  title: 'Hello World',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

### Task 6: Create app/page.tsx

**Files:**
- Create: `app/page.tsx`

**Step 1: Write the page**

```tsx
export default function Home() {
  return <h1>Hello, World!</h1>;
}
```

---

### Task 7: Install dependencies and verify build

**Step 1: Install deps**

```bash
npm install
```

**Step 2: Verify build succeeds**

```bash
npm run build
```
Expected: Build completes without errors.

---

### Task 8: Commit and push

**Step 1: Stage all files**

```bash
git add package.json tsconfig.json next.config.js app/
git add package-lock.json .next/ .gitignore 2>/dev/null || true
```

**Step 2: Commit**

```bash
git commit -m "feat: scaffold Next.js 14 App Router hello world"
```

**Step 3: Push**

```bash
git push origin main
```
