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
