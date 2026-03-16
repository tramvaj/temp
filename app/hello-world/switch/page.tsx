'use client';

import { useState } from 'react';
import styles from './page.module.css';

function SwitchDemo({
  title,
  description,
  defaultChecked = false,
  disabled = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className={styles.row}>
      <div className={styles.rowText}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button
        type="button"
        className={`${styles.track} ${checked ? styles.trackOn : ''} ${disabled ? styles.trackDisabled : ''}`}
        disabled={disabled}
        aria-label={title}
        onClick={() => {
          if (!disabled) {
            setChecked((value) => !value);
          }
        }}
      >
        <span className={`${styles.thumb} ${checked ? styles.thumbOn : ''}`} />
      </button>
    </label>
  );
}

export default function HelloWorldSwitchPage() {
  return (
    <main className={styles.shell}>
      <a href="/hello-world" className={styles.backLink}>
        ← Back to /hello-world
      </a>
      <h1 className={styles.title}>Switch Playground</h1>
      <p className={styles.intro}>
        This page is built from Figma node <code>1:8479</code>. Use this as a quick interaction test
        for binary controls.
      </p>

      <section className={styles.controls}>
        <SwitchDemo title="Enabled switch" description="Standard toggle, clickable." defaultChecked={true} />
        <SwitchDemo title="Notification toggle" description="Start in OFF and switch on when selected." />
        <SwitchDemo
          title="Disabled switch"
          description="Static, non-interactive disabled state."
          defaultChecked
          disabled
        />
      </section>
    </main>
  );
}
