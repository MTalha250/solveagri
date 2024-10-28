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

      <main className="flex flex-col gap-20 mb-40 bg-gray-50">
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <div className="h-screen flex items-center justify-center relative w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black opacity-50"></div>
              <img
                src={service?.heroImage?.url}
                alt={
                  service?.heroImage?.alternativeText || service?.heroHeadings
                }
                className="object-cover w-full h-full"
              />
              <h1 className="absolute top-[50%] left-1/2 -translate-x-1/2 text-3xl md:text-5xl text-white font-bold tracking-wide drop-shadow-md px-4 text-center">
                {service?.heroHeadings}
              </h1>
            </div>

            <div className="px-4 md:px-20 xl:px-40 w-full flex flex-col gap-20">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <img
                  src={service?.serviceImage?.url}
                  alt={
                    service?.serviceImage?.alternativeText ||
                    service?.heroHeadings
                  }
                  className="hidden lg:block w-[50%] rounded-lg shadow-lg"
                />
                <div className="flex flex-col gap-8 text-gray-800 lg:w-[50%]">
                  <section
                    className="text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: service?.content || "" }}
                  />
                  <section
                    className="text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: service?.advertisement || "",
                    }}
                  />
                  <section
                    className="text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: service?.about || "" }}
                  />
                </div>
              </div>
            </div>

            <section className="mt-20 px-4">
              <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">
                Our Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-20">
                {services.map((service, index) => (
                  <div
                    key={service.documentId}
                    className="bg-white w-full max-w-[300px] shadow-lg rounded-lg hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 cursor-pointer overflow-hidden"
                    onClick={() => router.push(`/${service.documentId}`)}
                  >
                    <img
                      src={service.serviceImage?.url}
                      alt={
                        service.serviceImage?.alternativeText || service.name
                      }
                      className="w-full h-40 object-cover"
                    />
                    <h3 className="text-xl text-center font-semibold mt-4 mb-4 px-4">
                      {service.name}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-screen flex items-center justify-center relative w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black opacity-50"></div>
              <img
                src={service?.ctaImage?.url}
                alt={service?.ctaImage?.alternativeText || service?.ctaText}
                className="object-cover w-[90%] h-[80%] rounded-lg shadow-lg"
              />
              <div className="absolute text-center text-white font-semibold drop-shadow-lg">
                <h1 className="text-3xl md:text-5xl mb-4">
                  {service?.ctaText}
                </h1>
                <p className="text-lg md:text-xl mb-8">{service?.ctaPara}</p>
                <Link
                  href="/contactus"
                  className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
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
