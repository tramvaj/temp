# Oscars 2026 Explorer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a searchable, cross-linked Oscars 2026 data explorer as a Next.js app.

**Architecture:** Single client component (`app/page.tsx`) with static JSON data, CSS modules for styling, and React state for search/view switching. No API routes, no external deps beyond what's already in package.json.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, CSS Modules

---

### Task 1: Add data file

**Files:**
- Create: `data/oscars-2026.json`

**Step 1: Copy the JSON data into the project**

Copy the Oscars JSON file from `/Users/trieste/Downloads/oscars-2026.json` to `data/oscars-2026.json` in the repo. Remove the markdown code fence wrappers if present — the file should be pure JSON.

**Step 2: Commit**

```bash
git add data/oscars-2026.json
git commit -m "feat: add oscars 2026 data"
```

---

### Task 2: Create CSS module

**Files:**
- Create: `app/page.module.css`

**Step 1: Write the stylesheet**

```css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a1a;
}

.header {
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 16px 0;
}

.searchInput {
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
}

.searchInput:focus {
  border-color: #888;
}

.backLink {
  display: inline-block;
  margin-bottom: 16px;
  color: #555;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}

.backLink:hover {
  color: #000;
}

.category {
  margin-bottom: 28px;
}

.categoryTitle {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #666;
  margin: 0 0 8px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid #e5e5e5;
}

.categoryTitleLink {
  cursor: pointer;
  color: #666;
  text-decoration: none;
}

.categoryTitleLink:hover {
  color: #000;
}

.nomineeList {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nominee {
  padding: 6px 0;
  font-size: 15px;
  line-height: 1.4;
}

.winner {
  font-weight: 600;
  color: #8B6914;
}

.winnerBadge {
  font-size: 12px;
  margin-left: 6px;
  color: #B8860B;
}

.filmLink {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: #ccc;
  text-underline-offset: 2px;
}

.filmLink:hover {
  text-decoration-color: #888;
}

.filmViewTitle {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.filmViewSubtitle {
  font-size: 14px;
  color: #888;
  margin: 0 0 20px 0;
}

.noResults {
  color: #888;
  font-size: 15px;
  margin-top: 24px;
}
```

**Step 2: Commit**

```bash
git add app/page.module.css
git commit -m "feat: add page styles"
```

---

### Task 3: Build the page component

**Files:**
- Modify: `app/page.tsx`

**Step 1: Replace `app/page.tsx` with the full implementation**

```tsx
'use client';

import { useState, useMemo, useRef } from 'react';
import styles from './page.module.css';
import data from '../data/oscars-2026.json';

type Nominee = {
  category: string;
  nominee: string;
  winner: boolean;
};

// Extract film name from nominee string (before " - " if present)
function extractFilm(nominee: string, category: string): string {
  // For acting/directing categories, the film is after the dash
  const actingCategories = [
    'Best Director',
    'Best Actor',
    'Best Actress',
    'Best Supporting Actor',
    'Best Supporting Actress',
  ];
  if (actingCategories.includes(category)) {
    const parts = nominee.split(' - ');
    return parts.length > 1 ? parts[parts.length - 1] : nominee;
  }
  // For screenplay categories, film is before the dash
  const screenplayCategories = [
    'Best Original Screenplay',
    'Best Adapted Screenplay',
    'Best Original Score',
    'Best Original Song',
  ];
  if (screenplayCategories.includes(category)) {
    const parts = nominee.split(' - ');
    return parts[0];
  }
  // For everything else, the nominee IS the film
  return nominee;
}

// Extract person name from nominee string (the non-film part)
function extractPerson(nominee: string, category: string): string | null {
  const actingCategories = [
    'Best Director',
    'Best Actor',
    'Best Actress',
    'Best Supporting Actor',
    'Best Supporting Actress',
  ];
  if (actingCategories.includes(category)) {
    const parts = nominee.split(' - ');
    return parts.length > 1 ? parts[0] : null;
  }
  const screenplayCategories = [
    'Best Original Screenplay',
    'Best Adapted Screenplay',
    'Best Original Score',
    'Best Original Song',
  ];
  if (screenplayCategories.includes(category)) {
    const parts = nominee.split(' - ');
    return parts.length > 1 ? parts.slice(1).join(' - ') : null;
  }
  return null;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const nominees = data as Nominee[];

  // Get unique categories in original order
  const categories = useMemo(() => {
    const seen = new Set<string>();
    return nominees
      .map((n) => n.category)
      .filter((c) => {
        if (seen.has(c)) return false;
        seen.add(c);
        return true;
      });
  }, [nominees]);

  // Get all nominations for a specific film
  const filmNominations = useMemo(() => {
    if (!selectedFilm) return [];
    return nominees.filter((n) => extractFilm(n.nominee, n.category) === selectedFilm);
  }, [selectedFilm, nominees]);

  const scrollToCategory = (category: string) => {
    setSelectedFilm(null);
    setTimeout(() => {
      categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const lowerSearch = search.toLowerCase();

  // Film view
  if (selectedFilm) {
    const filtered = lowerSearch
      ? filmNominations.filter(
          (n) =>
            n.category.toLowerCase().includes(lowerSearch) ||
            n.nominee.toLowerCase().includes(lowerSearch)
        )
      : filmNominations;

    const wins = filmNominations.filter((n) => n.winner).length;
    const total = filmNominations.length;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Oscars 2026</div>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <a className={styles.backLink} onClick={() => setSelectedFilm(null)}>
          &larr; All categories
        </a>
        <h2 className={styles.filmViewTitle}>{selectedFilm}</h2>
        <p className={styles.filmViewSubtitle}>
          {wins} win{wins !== 1 ? 's' : ''}, {total} nomination{total !== 1 ? 's' : ''}
        </p>
        {filtered.length === 0 ? (
          <p className={styles.noResults}>No matching categories.</p>
        ) : (
          <ul className={styles.nomineeList}>
            {filtered.map((n) => {
              const person = extractPerson(n.nominee, n.category);
              return (
                <li
                  key={n.category}
                  className={`${styles.nominee} ${n.winner ? styles.winner : ''}`}
                >
                  <a
                    className={styles.categoryTitleLink}
                    onClick={() => scrollToCategory(n.category)}
                  >
                    {n.category}
                  </a>
                  {person && <span> &middot; {person}</span>}
                  {n.winner && <span className={styles.winnerBadge}>Winner</span>}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  // Category view
  const filteredCategories = categories
    .map((cat) => {
      const catNominees = nominees.filter((n) => n.category === cat);
      if (!lowerSearch) return { category: cat, nominees: catNominees };
      const matches = catNominees.filter(
        (n) =>
          n.category.toLowerCase().includes(lowerSearch) ||
          n.nominee.toLowerCase().includes(lowerSearch)
      );
      if (matches.length === 0) return null;
      return { category: cat, nominees: matches };
    })
    .filter(Boolean) as { category: string; nominees: Nominee[] }[];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Oscars 2026</div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search nominees, films, categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredCategories.length === 0 ? (
        <p className={styles.noResults}>No results for &ldquo;{search}&rdquo;</p>
      ) : (
        filteredCategories.map(({ category, nominees: catNominees }) => (
          <div
            key={category}
            className={styles.category}
            ref={(el) => { categoryRefs.current[category] = el; }}
          >
            <h3 className={styles.categoryTitle}>{category}</h3>
            <ul className={styles.nomineeList}>
              {catNominees.map((n) => {
                const film = extractFilm(n.nominee, n.category);
                const person = extractPerson(n.nominee, n.category);
                return (
                  <li
                    key={n.nominee}
                    className={`${styles.nominee} ${n.winner ? styles.winner : ''}`}
                  >
                    {person ? (
                      <>
                        {person} &middot;{' '}
                        <a className={styles.filmLink} onClick={() => setSelectedFilm(film)}>
                          {film}
                        </a>
                      </>
                    ) : (
                      <a className={styles.filmLink} onClick={() => setSelectedFilm(film)}>
                        {n.nominee}
                      </a>
                    )}
                    {n.winner && <span className={styles.winnerBadge}>Winner</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
```

**Step 2: Verify build**

```bash
npm run build
```
Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: implement oscars explorer with search and cross-linking"
```

---

### Task 4: Push to GitHub

**Step 1: Push all commits**

```bash
git push origin main
```
