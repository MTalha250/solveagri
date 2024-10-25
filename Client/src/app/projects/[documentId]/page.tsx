"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Project } from "@/types/all-types";
import qs from "qs";
import Navbar from "@/components/navbar";

export default function ProjectPage() {
  const params = useParams();
  const projId = Array.isArray(params?.documentId)
    ? params.documentId[0]
    : params?.documentId; // Ensure `id` is always a string
  console.log(projId);
  const [project, setProject] = useState<Project | null>(null); // State to hold project data

  useEffect(() => {
    if (projId) {
      fetchProject(projId);
    }
  }, [projId]);

  async function fetchProject(id: string) {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
      const path = `/api/projects/${id}`;
      const url = new URL(path, baseUrl);

      url.search = qs.stringify({
        populate: {
          projImage: {
            fields: ["url", "alternativeText"], // Fetch the image URL and alt text
          },
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
        throw new Error("Failed to fetch product");
      }

      const data = await res.json();
      const projectData = data.data;

      console.log("Fetched Product Data from API:", projectData);

      setProject(projectData);
    } catch (error) {
      console.error("Error fetching the product:", error);
      toast.error("Error fetching the product.");
    }
  }

  // Render the project data or a loading state
  return project ? (
    <>
      <div className="fixed w-full" style={{ zIndex: "999" }}>
        <Navbar />
      </div>
      <main className="flex my-40 flex-col gap-10 px-4 md:px-20 lg:px-32 xl:px-64">
        <section className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl md:text-3xl text-black tracking-wide font-semibold">
            {project.projHeader}
          </h1>
          <h3 className="text-gray-500 tracking-wide">{project.projTitle}</h3>
        </section>

        <div className="w-full grid-cols-1 rounded-3xl max-h-[600px] overflow-hidden gap-x-8 gap-y-12">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${project.projImage?.url}`} // Assuming productImage is always present
            alt={project.projImage?.alternativeText || project.projTitle}
            className="w-full object-cover object-center"
          />
        </div>

        <section
          className="prose"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
      </main>
    </>
  ) : (
    <p>Loading...</p>
  );
}
