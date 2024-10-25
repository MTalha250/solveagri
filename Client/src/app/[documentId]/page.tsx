"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ServiceData } from "@/types/all-types"; // Ensure this path is correct
import qs from "qs";
import Navbar from "@/components/navbar";
import Link from "next/link";

// Dynamic services data interface
interface ServicesDataType {
  [key: string]: ServiceData;
}

export default function ServicePage() {
  const params = useParams();
  const serviceId = Array.isArray(params?.documentId)
    ? params.documentId[0]
    : params?.documentId;
  const router = useRouter();

  const [service, setService] = useState<ServiceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceData[]>([]);

  useEffect(() => {
    if (serviceId) {
      fetchServices(serviceId);
    }
    fetchAllServices();
  }, [serviceId]);

  async function fetchServices(id: string) {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
      const path = `/api/services/${id}`;
      const url = new URL(path, baseUrl);

      url.search = qs.stringify({
        populate: {
          serviceImage: { fields: ["url", "alternativeText"] },
          heroImage: { fields: ["url", "alternativeText"] },
          ctaImage: { fields: ["url", "alternativeText"] },
        },
      });

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
      });
      if (!res.ok) throw new Error(`Failed to fetch service with id ${id}.`);

      const data = await res.json();
      setService(data.data);
    } catch (error: any) {
      console.error("Error fetching service:", error);
      setError(
        error.message || "An error occurred while fetching the service."
      );
    }
  }

  async function fetchAllServices() {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
      const path = `/api/services`;

      const url = new URL(path, baseUrl);
      url.search = qs.stringify({
        populate: { serviceImage: { fields: ["url", "alternativeText"] } },
      });

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
      });
      if (!res.ok) throw new Error(`Failed to fetch services.`);

      const data = await res.json();
      setServices(data.data);
    } catch (error: any) {
      console.error("Error fetching services:", error);
      setError(error.message || "An error occurred while fetching services.");
    }
  }

  return (
    <>
      <div className="fixed w-full" style={{ zIndex: "999" }}>
        <Navbar />
      </div>

      <main className="flex flex-col gap-20 mb-40">
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <div className="h-screen flex items-center justify-center relative w-full overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${service?.heroImage?.url}`}
                alt={
                  service?.heroImage?.alternativeText || service?.heroHeadings
                }
                className="object-cover w-full h-full"
              />
              <h1 className="absolute top-[50%] left-1/2 -translate-x-1/2 text-2xl md:text-5xl text-white font-semibold tracking-wide">
                {service?.heroHeadings}
              </h1>
            </div>

            <div className="px-4 md:px-20 xl:px-40 w-full flex flex-col gap-20">
              <div className="w-full flex gap-20">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${service?.serviceImage?.url}`}
                  alt={
                    service?.serviceImage?.alternativeText ||
                    service?.heroHeadings
                  }
                  className="hidden lg:block w-[50%]"
                />
                <div className="flex flex-col items-center justify-center gap-8">
                  <section
                    dangerouslySetInnerHTML={{ __html: service?.content || "" }}
                  />
                  <section
                    dangerouslySetInnerHTML={{
                      __html: service?.advertisement || "",
                    }}
                  />
                  <section
                    dangerouslySetInnerHTML={{ __html: service?.about || "" }}
                  />
                </div>
              </div>
            </div>

            <section className="mt-20">
              <h2 className="text-center text-3xl font-bold mb-8">
                Our Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 relative">
                {services.map((service, index) => (
                  <div
                    key={service.documentId}
                    className={`bg-white w-[80%] md:w-[60%] shadow-md rounded-lg hover:shadow-lg transition cursor-pointer random-position-${index}`}
                    onClick={() => router.push(`/${service.documentId}`)}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${service.serviceImage?.url}`}
                      alt={
                        service.serviceImage?.alternativeText || service.name
                      }
                      className="w-full h-40 object-cover rounded-t-md"
                    />
                    <h3 className="text-lg text-center font-semibold mt-4 mb-4">
                      {service.name}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-screen flex items-center justify-center relative w-full overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${service?.ctaImage?.url}`}
                alt={service?.ctaImage?.alternativeText || service?.ctaText}
                className="object-cover w-[90%] h-[80%]"
              />
              <h1 className="absolute top-[50%] left-1/2 -translate-x-1/2 text-2xl md:text-5xl text-white font-semibold">
                {service?.ctaText}
              </h1>
              <p className="absolute top-[70%] left-1/2 -translate-x-1/2 text-white font-semibold">
                {service?.ctaPara}
              </p>
              <a href="/contactus">
                <button className="absolute top-[78%] left-[50%] bg-LG p-2 rounded-xl">
                  Get Started
                </button>
              </a>
            </div>
          </>
        )}
      </main>

      <style jsx>{`
        /* Random positions for desktop */
        @media (min-width: 768px) {
          .random-position-0 {
            transform: translateY(-20px) translateX(-15px);
          }
          .random-position-1 {
            transform: translateY(30px) translateX(10px);
          }
          .random-position-2 {
            transform: translateY(-40px) translateX(5px);
          }
        }

        /* Single-column layout for mobile */
        @media (max-width: 768px) {
          .random-position-0,
          .random-position-1,
          .random-position-2 {
            transform: none;
            width: 90%;
          }
        }
      `}</style>
    </>
  );
}
