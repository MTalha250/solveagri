import Link from "next/link"; // Import Next.js Link component
import { useState, useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import AnimateToView from "../AnimateToView";
import { ProjectCategory } from "@/types/all-types"; // Assuming this is your defined Project type
import qs from "qs";
import axios from "axios";

const ProjectsCat = () => {
  const [projects, setProjects] = useState<ProjectCategory[]>([]); // State to store the projects fetched from Strapi
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch projects from Strapi API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/project-categories"; // Assuming your endpoint is /api/projects

        const query = qs.stringify({
          populate: {
            Image: {
              fields: ["url", "alternativeText"], // Fetch the project image URL and alt text
            },
          },
        });

        const url = `${baseUrl}${path}?${query}`;
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        });

        if (!Array.isArray(response.data.data)) {
          throw new Error("Unexpected API response structure");
        }

        setProjects(response.data.data); // Set fetched projects to state
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div>Error fetching projects: {error}</div>;
  }

  return (
    <div className="px-4 overflow-hidden md:px-20 xl:px-40 md:py-20 py-10 w-full">
      <AnimateToView>
        <h1 className="md:text-[40px] text-[30px] mb-3 text-white">
          Our Projects.
        </h1>
      </AnimateToView>
      <div className="flex px-2 mt-5">
        <div>
          <AnimateToView className="flex gap-4 w-full">
            <div className="md:block hidden w-[250px] mt-3 ml-[-30px] h-[1px] bg-white" />
            <p className="text-white md:text-2xl font-light">
              Our project prioritizes livestock well-being, modernizing farming
              practices, empowering farmers with training and resources, and
              promoting resilience. Together, let's build a thriving livestock
              community for a brighter future.
            </p>
          </AnimateToView>

          <div className="flex gap-8 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-12">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <Link
                    href={`/projects/category/${project.projCatId}`} // Redirect to category-based page
                    key={project.projCatId}
                    passHref
                  >
                    <div className="relative group cursor-pointer">
                      {/* Add consistent width and height to the container */}
                      <div className="w-[350px] h-[250px] md:w-[450px] md:h-[300px] overflow-hidden">
                        <img
                          src={project.Image?.url}
                          alt={project.Image?.alternativeText || project.Title}
                          className="w-full h-full object-cover transition duration-200 ease-in-out transform md:group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-DG cursor-pointer bg-opacity-50 flex flex-col justify-center items-center opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 p-6">
                        <h3 className="text-xl text-white font-medium mb-3 text-center">
                          {project.Title}
                        </h3>
                        <AiOutlineArrowUp className="text-white w-6 h-6 mt-auto mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out delay-200" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No projects available at the moment.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCat;
