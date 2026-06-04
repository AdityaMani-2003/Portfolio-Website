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
    const stripRef = useRef<HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = useState(0);

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const items: ProjectItem[] = content.projects.items;
    const totalCards = items.length;

    useEffect(() => {
        const updateWidth = () => {
            if (stripRef.current) {
                // The amount we need to translate is the difference between
                // the total content width and the viewport width
                const maxTranslate = stripRef.current.scrollWidth - window.innerWidth;
                setScrollWidth(maxTranslate > 0 ? maxTranslate : 0);
            }
        };
        
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [items]);

    // useScroll bound to the tall scroll-track wrapper
    const { scrollYProgress } = useScroll({
        target: scrollTrackRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0px", `-${scrollWidth}px`]
    );

    return (
        <section
            data-slot="projects"
            className="relative"
        >
            {/* Scroll-track wrapper: its height drives the scroll range */}
            <div
                ref={scrollTrackRef}
                style={{ height: `${(totalCards + 2) * 100}vh` }}
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
                        ref={stripRef}
                        style={{ x }}
                        className="flex items-stretch flex-1 w-max will-change-transform"
                    >
                        {/* Title Slide */}
                        <div 
                            className="shrink-0 flex flex-col justify-center px-container w-[90vw] md:w-[50vw] lg:w-[40vw]" 
                        >
                            <div className="flex flex-col gap-4 max-w-2xl pr-8">
                                <span className="title-counter">
                                    [003]
                                </span>
                                <h2 className="title">
                                    {content.projects.title}
                                </h2>
                                <p className="mt-4 text-muted-foreground text-lg md:text-xl leading-relaxed">
                                    {content.projects.intro}
                                </p>
                            </div>
                        </div>

                        {/* Project cards */}
                        {items.map((project: ProjectItem) => (
                            <HorizontalProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => handleOpenProject(project)}
                            />
                        ))}

                        {/* END block */}
                        <div className="shrink-0 flex items-center justify-center w-[50vw]">
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
                className="group relative shrink-0 cursor-pointer w-[85vw] md:w-[45vw] xl:w-[35vw] px-2 md:px-4"
            >
                <div className="relative w-full h-full overflow-hidden bg-muted border border-border/50 transition-all duration-700 ease-out group-hover:border-foreground/20 rounded-lg">
                    {/* Background image */}
                    <div className="absolute inset-4 md:inset-6 z-0 rounded-lg overflow-hidden bg-background/50 border border-border/30">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 85vw, (max-width: 1280px) 45vw, 35vw"
                            loading="lazy"
                            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-4 md:inset-6 z-10 flex flex-col justify-between p-6 xl:p-8">
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

                        <div className="flex flex-col gap-2 mt-auto">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-foreground opacity-20 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
                                {project.title}
                            </h3>
                            <div className="overflow-hidden mt-2">
                                <p className="text-sm md:text-base text-muted-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-300 opacity-0 group-hover:opacity-100 line-clamp-2 md:line-clamp-3">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

HorizontalProjectCard.displayName = "HorizontalProjectCard";