"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { journalEntries } from "@/data/home";
import styles from "./Journal.module.scss";

const INTERVAL_MS = 5500;
const total = journalEntries.length;

export default function JournalSlides() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % total),
      INTERVAL_MS,
    );
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <div
      className={styles.slides}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.stack} aria-live={paused ? "polite" : "off"}>
        {journalEntries.map((entry, i) => (
          <article
            key={entry.title}
            className={`${styles.entry} ${i === active ? styles.active : ""} ${
              i < active ? styles.past : ""
            }`}
            aria-hidden={i === active ? undefined : "true"}
          >
            <div className={styles.eventGrid}>
              <div className={styles.date}>
                <p className={styles.day}>{entry.day}</p>
                <p className={styles.month}>{entry.month}</p>
              </div>

              <div className={styles.narrative}>
                <p className={styles.category}>{entry.category}</p>
                <h3 className={styles.eventTitle}>{entry.title}</h3>
                <p className={styles.copy}>{entry.copy}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.controls}>
        <Link href="/news-events" className={styles.explore}>
          <span>Explore</span>
          <Image
            src="/assets/icons/arrow-up-right-light.svg"
            alt=""
            width={16}
            height={16}
          />
        </Link>

        <div className={styles.nav}>
          <span className={styles.counter} aria-hidden="true">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous entry"
            onClick={() => setActive((i) => (i - 1 + total) % total)}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="M10 3 5 8l5 5" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next entry"
            onClick={() => setActive((i) => (i + 1) % total)}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="m6 3 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
