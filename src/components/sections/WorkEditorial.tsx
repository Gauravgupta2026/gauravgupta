"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WORK_EDITORIAL } from "@/content/workEditorial";
import styles from "./WorkEditorial.module.css";
import { CollectionFilter } from "@/components/ui/CollectionFilter";
import presentation from "@/components/ui/ProjectPresentation.module.css";

const FILTERS = [
  { key: "all", label: "All work" },
  { key: "shape", label: "Taking shape" },
  { key: "making", label: "In the making" },
  { key: "finished", label: "Finished work" },
] as const;
type WorkFilter = (typeof FILTERS)[number]["key"];

type ProjectRowProps = {
  id: string;
  title: string;
  description: string;
  role: string;
  detail: string;
  image: string;
  detailImage: string;
  primaryAlt: string;
  secondaryAlt: string;
  href?: string;
  reverse?: boolean;
  priority?: boolean;
};

function ProjectMeta({ role, detail }: { role: string; detail: string }) {
  return (
    <p className={`${styles.meta} ${presentation.facts}`}>
      <span>{role}</span>
      <span>{detail}</span>
    </p>
  );
}

function ProjectRow({
  id,
  title,
  description,
  role,
  detail,
  image,
  detailImage,
  primaryAlt,
  secondaryAlt,
  href,
  reverse = false,
  priority = false,
}: ProjectRowProps) {
  const content = (
    <>
      <div className={`${styles.mediaGrid} ${reverse ? styles.reverse : ""}`}>
        <figure className={`${presentation.frame} ${styles.primaryMedia}`}>
          <Image
            alt={primaryAlt}
            fill
            priority={priority}
            sizes="(max-width: 527px) calc(100vw - 48px), (max-width: 1023px) 480px, 58vw"
            src={image}
          />
        </figure>
        <figure className={`${presentation.frame} ${styles.secondaryMedia}`}>
          <Image
            alt={secondaryAlt}
            fill
            sizes="(max-width: 527px) calc(100vw - 48px), (max-width: 1023px) 480px, 42vw"
            src={detailImage}
          />
        </figure>
      </div>

      <div
        className={`${styles.projectCopy} ${reverse ? styles.copyRight : styles.copyLeft}`}
      >
        <h2 className={presentation.title}>{title}</h2>
        <p className={presentation.purpose}>{description}</p>
        <ProjectMeta role={role} detail={detail} />
      </div>
    </>
  );

  return (
    <Reveal as="article" id={id} className={styles.project} variant="project">
      {href ? (
        <Link className={styles.projectLink} href={href}>
          {content}
        </Link>
      ) : (
        content
      )}
    </Reveal>
  );
}

const WORK_PROJECTS = [
  { ...WORK_EDITORIAL.sachetana, id: "work-sachetana", primaryAlt: "Two phones displaying a calm, privacy-focused reflection interface", secondaryAlt: "A close-up phone showing a private mood check-in", priority: true },
  { ...WORK_EDITORIAL.wylde, id: "work-wylde", primaryAlt: "Two people crossing a quiet brutalist interior", secondaryAlt: "Friends gathering inside a softly lit brutalist social space", reverse: true },
  { ...WORK_EDITORIAL.luckyDay, image: WORK_EDITORIAL.luckyDay.primaryImage, id: "work-lucky-day", primaryAlt: "Two phones displaying a dark, celestial card game", secondaryAlt: "Overlapping phones with a card-game screen and a light control interface" },
  { ...WORK_EDITORIAL.internship, id: "work-research", primaryAlt: "A pale research and search interface displayed on a laptop", secondaryAlt: "A detailed research workspace with filters, sources and a selected result", reverse: true },
];

export function WorkEditorial() {
  const [filter, setFilter] = useState<WorkFilter>("all");
  const changeFilter = (next: WorkFilter) => {
    setFilter(next);
    const root = document.getElementById("page-gallery");
    const headerClearance = 96;
    if (root && root.getBoundingClientRect().top < headerClearance) window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - headerClearance, behavior: "instant" });
  };
  const visible = WORK_PROJECTS.filter(project => filter === "all" || project.stage === filter);
  return (
    <div id="page-gallery" className={styles.page}>
      <div className={styles.toolbar}>
        <CollectionFilter options={FILTERS} value={filter} onChange={key => changeFilter(key as WorkFilter)} label="Filter work by stage" />
        <p className={styles.resultCount} role="status">{visible.length} {visible.length === 1 ? "project" : "projects"}</p>
      </div>
      <div className={styles.collection}>
        <div className={styles.paper}>
          <div>
            {visible.map(project => <ProjectRow key={project.id} {...project} />)}
            {visible.length === 0 && <p className={styles.empty}>No work in this stage yet. <button onClick={() => changeFilter("all")}>View all work</button></p>}
          </div>
        </div>
      </div>
    </div>
  );
}
