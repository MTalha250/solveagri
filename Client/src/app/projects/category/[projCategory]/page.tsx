"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectCard from "@/components/project-components/projectCard";
import { Project } from "@/types/all-types";
import qs from "qs";
import Navbar from "@/components/navbar";

export default function ProjectCategoryPage() {
  const { projCategory } = useParams(); // Get the category from the route params
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects based on the category
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/projects";

        // Query to fetch projects by category
        const query = qs.stringify({
          filters: {
            projCategory: projCategory, // Filter projects by category
          },
          populate: {
            projImage: {
              fields: ["url", "alternativeText"], // Fetch the image URL and alt text
            },
          },
        });

        const url = `${baseUrl}${path}?${query}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await res.json();

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        setProjects(data.data); // Store the fetched projects
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchProjects();
  }, [projCategory]);

  if (error) {
    return <div>Error fetching projects: {error}</div>;
  }

  return (
    <>
      <div className="fixed w-full" style={{ zIndex: "999" }}>
        <Navbar />
      </div>
      <div className="w-full my-40 px-4 md:px-20 xl:px-40 grid gap-x-8 gap-y-16 grid-cols-1 md:grid-cols-3">
        {projects.length === 0 && (
          <div>No projects found for this category</div>
        )}
        {projects.map((project: Project) => (
          <ProjectCard key={project.projId} project={project} />
        ))}
      </div>
    </>
  );
}
