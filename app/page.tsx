'use client';

import { useMemo, useRef, useState } from 'react';
import styles from './page.module.css';
import data from '../data/oscars-2026.json';

type Nominee = {
  category: string;
  nominee: string;
  winner: boolean;
};

type CategoryGroup = {
  category: string;
  nominees: Nominee[];
};

const actingCategories = [
  'Best Director',
  'Best Actor',
  'Best Actress',
  'Best Supporting Actor',
  'Best Supporting Actress',
];

const screenplayCategories = [
  'Best Original Screenplay',
  'Best Adapted Screenplay',
  'Best Original Score',
];

// Extract film name from nominee string (before " - " if present)
function extractFilm(nominee: string, category: string): string {
  if (actingCategories.includes(category)) {
    const parts = nominee.split(' - ');
    return parts.length > 1 ? parts[parts.length - 1] : nominee;
  }
  if (screenplayCategories.includes(category)) {
    const parts = nominee.split(' - ');
    return parts[0];
  }
  if (category === 'Best Original Song') {
    const parts = nominee.split(' - ');
    return parts.length > 1 ? parts[parts.length - 1] : nominee;
  }
  return nominee.replace(/\s*\(.*?\)\s*$/, '');
}

// Extract person name from nominee string (the non-film part)
function extractPerson(nominee: string, category: string): string | null {
  if (actingCategories.includes(category)) {
    const parts = nominee.split(' - ');
    return parts.length > 1 ? parts[0] : null;
  }
  if (screenplayCategories.includes(category)) {
    const parts = nominee.split(' - ');
    return parts.length > 1 ? parts.slice(1).join(' - ') : null;
  }
  if (category === 'Best Original Song') {
    const parts = nominee.split(' - ');
    return parts.length > 1 ? parts[0] : null;
  }
  return null;
}

function formatCount(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function getCategoryId(category: string) {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const nominees = data as Nominee[];

  const nomineesByCategory = useMemo(() => {
    const grouped = new Map<string, Nominee[]>();

    for (const nominee of nominees) {
      const existing = grouped.get(nominee.category);

      if (existing) {
        existing.push(nominee);
      } else {
        grouped.set(nominee.category, [nominee]);
      }
    }

    return grouped;
  }, [nominees]);

  const categories = useMemo(() => Array.from(nomineesByCategory.keys()), [nomineesByCategory]);

  const filmNominations = useMemo(() => {
    if (!selectedFilm) return [];
    return nominees.filter((n) => extractFilm(n.nominee, n.category) === selectedFilm);
  }, [selectedFilm, nominees]);

  const lowerSearch = search.toLowerCase().trim();

  const openCategory = (category: string) => {
    setExpandedCategories((prev) => {
      if (prev[category]) {
        return prev;
      }

      return {
        ...prev,
        [category]: true,
      };
    });
  };

  const toggleCategory = (category: string, isExpanded: boolean) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !isExpanded,
    }));
  };

  const scrollToCategory = (category: string) => {
    openCategory(category);
    setSelectedFilm(null);

    setTimeout(() => {
      categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

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
          <div className={styles.headerTop}>
            <div>
              <p className={styles.eyebrow}>Awards Explorer</p>
              <h1 className={styles.title}>Oscars 2026</h1>
              <p className={styles.subtitle}>
                Browse by category, then jump into any film to see how its nomination run stacks
                up.
              </p>
            </div>
            <div className={styles.headerStat}>{formatCount(total, 'nomination')}</div>
          </div>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search this film's categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className={styles.backLink} type="button" onClick={() => setSelectedFilm(null)}>
          &larr; All categories
        </button>
        <h2 className={styles.filmViewTitle}>{selectedFilm}</h2>
        <p className={styles.filmViewSubtitle}>
          {formatCount(wins, 'win')}, {formatCount(total, 'nomination')}
        </p>
        {filtered.length === 0 ? (
          <p className={styles.noResults}>No matching categories.</p>
        ) : (
          <ul className={`${styles.nomineeList} ${styles.filmNomineeList}`}>
            {filtered.map((n) => {
              const person = extractPerson(n.nominee, n.category);
              return (
                <li
                  key={`${n.category}-${n.nominee}`}
                  className={`${styles.nominee} ${n.winner ? styles.winner : ''}`}
                >
                  <button
                    className={styles.categoryTitleLink}
                    type="button"
                    onClick={() => scrollToCategory(n.category)}
                  >
                    {n.category}
                  </button>
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

  const searchActive = lowerSearch.length > 0;
  const filteredCategories = categories
    .map((category) => {
      const catNominees = nomineesByCategory.get(category) ?? [];

      if (!searchActive) return { category, nominees: catNominees };

      const matches = catNominees.filter(
        (n) =>
          n.category.toLowerCase().includes(lowerSearch) ||
          n.nominee.toLowerCase().includes(lowerSearch)
      );

      if (matches.length === 0) return null;

      return { category, nominees: matches };
    })
    .filter((group): group is CategoryGroup => group !== null);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <p className={styles.eyebrow}>Awards Explorer</p>
            <h1 className={styles.title}>Oscars 2026</h1>
            <p className={styles.subtitle}>
              Category cards start collapsed. Open what you need, or search to narrow the field.
            </p>
          </div>
          <div className={styles.headerStat}>{formatCount(categories.length, 'category')}</div>
        </div>
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
        filteredCategories.map(({ category, nominees: catNominees }) => {
          const isExpanded = expandedCategories[category] ?? searchActive;
          const metaLabel = searchActive
            ? formatCount(catNominees.length, 'match')
            : formatCount(catNominees.length, 'nominee');

          return (
            <div
              key={category}
              className={styles.category}
              ref={(el) => {
                categoryRefs.current[category] = el;
              }}
            >
              <button
                className={styles.categoryToggle}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={getCategoryId(category)}
                onClick={() => toggleCategory(category, isExpanded)}
              >
                <span className={styles.categoryTitleGroup}>
                  <span className={styles.categoryTitle}>{category}</span>
                  <span className={styles.categoryMeta}>{metaLabel}</span>
                </span>
                <span className={styles.categoryIcon} aria-hidden="true">
                  {isExpanded ? '^' : 'v'}
                </span>
              </button>
              <div
                id={getCategoryId(category)}
                className={`${styles.categoryContent} ${
                  isExpanded ? styles.categoryContentExpanded : ''
                }`}
              >
                <div className={styles.categoryContentInner}>
                  <ul className={styles.nomineeList}>
                    {catNominees.map((n) => {
                      const film = extractFilm(n.nominee, n.category);
                      const person = extractPerson(n.nominee, n.category);

                      return (
                        <li
                          key={`${category}-${n.nominee}`}
                          className={`${styles.nominee} ${n.winner ? styles.winner : ''}`}
                        >
                          {person ? (
                            <>
                              {person} &middot;{' '}
                              <button
                                className={styles.filmLink}
                                type="button"
                                onClick={() => setSelectedFilm(film)}
                              >
                                {film}
                              </button>
                            </>
                          ) : (
                            <button
                              className={styles.filmLink}
                              type="button"
                              onClick={() => setSelectedFilm(film)}
                            >
                              {n.nominee}
                            </button>
                          )}
                          {n.winner && <span className={styles.winnerBadge}>Winner</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
