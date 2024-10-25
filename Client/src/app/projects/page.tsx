"use client"; // Marks this component as a Client Component

import { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "@/components/project-components/projectCard";
import { PageInfo, Project } from "@/types/all-types";
import qs from "qs";
import Navbar from "@/components/navbar";

// interface ProductsPageProps {
//   category: string;
//   limit: number;
// }

async function getProjects(
  page: number
): Promise<{ project: Project[]; total: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/projects";

  const url = new URL(path, baseUrl);

  // Use qs to populate the image and request more products by setting pageSize
  url.search = qs.stringify({
    populate: {
      projImage: {
        fields: ["alternativeText", "url"], // Fetch image URL and alt text
      },
    },
    pagination: {
      page: page, // Fetch the current page of products
      pageSize: 3, // Set to 1 to fetch only 1 product per page
    },
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  const total = data.meta.pagination.total; // Get total number of products

  return { project: data.data, total };
}

export default function ProjectsPage() {
  const [page, setPage] = useState(1); // Track the current page
  const [project, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0); // Track total number of products
  const [loading, setLoading] = useState(true);

  // Fetch products when the page changes
  const fetchProjects = async (page: number) => {
    setLoading(true);
    const { project, total } = await getProjects(page);
    console.log(project);
    setProjects(project);
    setTotal(total);
    setLoading(false);
  };

  // Fetch products on initial load and page change
  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  const totalPages = Math.ceil(total / 3); // Calculate total pages (1 product per page)

  return (
    <div>
      <div className="fixed w-full" style={{ zIndex: "999" }}>
        <Navbar />
      </div>
      <div className="w-full my-40 px-4 md:px-20 xl:px-40 grid gap-x-8 gap-y-16 grid-cols-1 md:grid-cols-3">
        {loading && <div>Loading projects...</div>}
        {!loading && project.length === 0 && (
          <div className="text-2xl font-medium">No projects found</div>
        )}
        {project.map((project: Project) => (
          <ProjectCard key={project.projId} project={project} />
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-LG hover:bg-gray-300 rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300  hover:bg-LG rounded hover:"
        >
          Next
        </button>
      </div>

      {/* Page number display */}
      <div className="mt-4 text-center">
        <p>
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
}
