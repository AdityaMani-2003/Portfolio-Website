"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { BlurReveal } from "@/components/blur-reveal";
import { ProjectModal } from "@/components/project-modal";
import { motion, useScroll, useTransform } from "framer-motion";

export type ProjectItem = {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    image: string;
    demo?: string;
    repo?: string;
    stack?: string[];
};

export default function Projects() {
    const { content } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollTrackRef = useRef<HTMLDivElement>(null);

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const items: ProjectItem[] = content.projects.items;
    const totalCards = items.length;

    // useScroll bound to the tall scroll-track wrapper
    const { scrollYProgress } = useScroll({
        target: scrollTrackRef,
        offset: ["start start", "end end"],
    });

    // Translate the horizontal strip from 0% to -100% of its overflow
    const totalStripVw = totalCards * 80 + 50; // each card ~80vw + END block ~50vw
    const translateEnd = -(totalStripVw - 100);

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0vw", `${translateEnd}vw`]
    );

    return (
        <section
            data-slot="projects"
            className="relative"
        >
            {/* Title area – scrolls normally ABOVE the sticky section */}
            <div className="py-16 md:py-24 lg:py-32 pb-0">
                <div className="flex flex-col gap-4 px-container mb-0">
                    <BlurReveal>
                        <span className="title-counter">
                            [003]
                        </span>
                    </BlurReveal>

                    <BlurReveal>
                        <h2 className="title">
                            {content.projects.title}
                        </h2>
                    </BlurReveal>

                    <BlurReveal>
                        <p className="mt-4 text-muted-foreground text-lg">
                            {content.projects.intro}
                        </p>
                    </BlurReveal>
                </div>
            </div>

            {/* Scroll-track wrapper: its height drives the scroll range */}
            <div
                ref={scrollTrackRef}
                style={{ height: `${(totalCards + 1) * 100}vh` }}
                className="relative"
            >
                {/* Sticky viewport container */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

                    {/* Header bar */}
                    <div className="flex justify-between items-center px-container py-6 shrink-0">
                        <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">
                            {content.projects.title}
                        </span>
                        <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">
                            {content.projects.scroll_text || "SCROLL TO EXPLORE"}
                        </span>
                    </div>

                    {/* Horizontal sliding strip */}
                    <motion.div
                        style={{ x }}
                        className="flex items-stretch flex-1 will-change-transform"
                    >
                        {/* Project cards */}
                        {items.map((project: ProjectItem) => (
                            <HorizontalProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => handleOpenProject(project)}
                            />
                        ))}

                        {/* END block */}
                        <div className="shrink-0 flex items-center justify-center" style={{ width: "50vw" }}>
                            <span className="text-[12vw] md:text-[10vw] font-black tracking-tighter uppercase text-foreground/10 select-none">
                                {content.projects.end_text || "END"}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>
    );
}

/* ─── Horizontal Project Card ─────────────────────────────────────── */

const HorizontalProjectCard = React.memo(
    ({ project, onClick }: { project: ProjectItem; onClick?: () => void }) => {
        return (
            <div
                onClick={onClick}
                className="group relative shrink-0 cursor-pointer"
                style={{ width: "80vw", padding: "0 1rem" }}
            >
                <div className="relative w-full h-full overflow-hidden bg-muted border border-border/50 transition-all duration-700 ease-out group-hover:border-foreground/20 rounded-lg">
                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="80vw"
                            loading="lazy"
                            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 xl:p-12">
                        <div className="flex justify-between items-start">
                            <div className="overflow-hidden">
                                <span className="block text-xs xl:text-sm font-mono tracking-widest text-muted-foreground uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                    {project.category}
                                </span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="block text-xs xl:text-sm font-mono text-muted-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                    {project.year}
                                </span>
                            </div>
                        </div>

                        <h3 className="absolute bottom-6 xl:bottom-12 left-6 xl:left-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase text-foreground opacity-10 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
                            {project.title}
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
);

HorizontalProjectCard.displayName = "HorizontalProjectCard";