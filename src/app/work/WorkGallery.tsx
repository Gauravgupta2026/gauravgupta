"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { paperProjects } from "@/content/paperPortfolio";
import { featuredWork } from "@/content/featuredWork";
import { CollectionFilter } from "@/components/ui/CollectionFilter";
import sachetana from "../../../public/assets/work/sachetana-wellness.jpg";
import wylde from "../../../public/assets/work/wylde-space.jpg";
import luckyDay from "../../../public/assets/work/lucky-day-hero.jpg";
import styles from "./Work.module.css";

const FILTERS = [
  { key: "all", label: "All work" },
  { key: "build", label: "In build" },
  { key: "writeup", label: "Write-ups in progress" },
] as const;
const IMAGES = { sachetana, wylde, "lucky-day": luckyDay };

export function WorkGallery() {
  const [filter, setFilter] = useState("all");
  const projects = paperProjects.filter(project => filter === "all" || (filter === "build" ? project.state === "In build" : project.state === "Write-up in progress"));
  return <>
    <div className={styles.toolbar}>
      <div className={styles.filters}><CollectionFilter options={FILTERS} value={filter} onChange={setFilter} label="Filter projects by current status" /></div>
      <p className={styles.count} role="status" aria-live="polite">{projects.length} {projects.length === 1 ? "project" : "projects"}</p>
    </div>
    <div className={styles.collection}>
      {projects.map(project => <article className={styles.project} key={project.slug}>
        <Link className={styles.projectLink} href={`/projects/${project.slug}`}>
          <Image className={styles.image} src={IMAGES[project.slug]} alt={project.alt} sizes="(max-width: 767px) calc(100vw - 48px), 660px" />
          <div className={styles.copy}>
            <h2>{project.title}</h2>
            <p className={styles.purpose}>{project.purpose}</p>
            <div className={styles.details}><p>{project.role}</p><p>{featuredWork.find(item => item.slug === project.slug)?.context}</p><p>{project.state}</p></div>
          </div>
        </Link>
      </article>)}
    </div>
  </>;
}
