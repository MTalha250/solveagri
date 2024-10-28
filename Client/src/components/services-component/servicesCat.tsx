"use client";

import Link from "next/link"; // Import Next.js Link component
import { useState, useEffect } from "react";
import AnimateToView from "../AnimateToView";
import { ServiceData } from "@/types/all-types";
import qs from "qs"; // Query string for URL construction
import { ArrowUpRight } from "lucide-react";

const ServiceCat = () => {
  const [services, setServices] = useState<ServiceData[]>([]); // State to store the services fetched from Strapi
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch services from Strapi API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/services";

        // Construct the query with 'populate' for fetching images
        const query = qs.stringify({
          populate: {
            serviceImage: {
              fields: ["url", "alternativeText"], // Fetch the image URL and alt text
            },
            heroImage: {
              fields: ["url", "alternativeText"], // Fetch the hero image URL and alt text
            },
          },
        });

        const url = `${baseUrl}${path}?${query}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        setServices(data.data); // Set fetched services to state
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchServices();
  }, []);

  if (error) {
    return <div>Error fetching services: {error}</div>;
  }

  return (
    <div className="px-4 md:px-20 xl:px-40 md:py-20 py-10 w-full">
      <AnimateToView>
        <h1 className="md:text-[40px] text-[30px] mb-3 text-DG">
          Our Services.
        </h1>
      </AnimateToView>
      <div className="flex flex-col gap-12 mt-5">
        <AnimateToView className="flex w-full gap-4">
          <div className="h-[1px] ml-[-30px] mt-3 w-40 bg-DG" />
          <p className="text-DG md:text-xl font-light">
            Our commitment is to provide dependable, high-quality product
            categories that address every facet of your livestock and dairy
            needs, no matter the scale of your operation. Our extensive
            selection includes specialized products, innovative equipment, and
            tailored solutions crafted for efficient livestock management and
            enhanced productivity. From nutritional supplements to advanced
            farming tools, we empower farmers, suppliers, and processors to
            optimize their processes and boost profitability across the board.
          </p>
        </AnimateToView>

        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div key={index} className="relative flex-col">
                <Link href={`/${service.documentId}`}>
                  <div className="w-full h-full rounded-lg overflow-hidden group cursor-pointer relative">
                    <img
                      src={service.serviceImage?.url}
                      alt={service.heroImage?.alternativeText || service.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Title Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                      <h1 className="text-white text-xl">{service.name}</h1>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No services available at the moment.</p>
          )}
        </div>

        {/* View All Services Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/x63rxb4y5tkeht4vsyymwf3a"
            className="border flex gap-2 border-green-600 text-white bg-[#000C36] py-3 px-12 rounded-full hover:bg-[#a8cf45] hover:text-white transition duration-300"
          >
            Learn More <ArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCat;
