'use client'
import { FaLinkedin } from "react-icons/fa";
import { useEffect } from "react";
import AnimateToView from "@/components/AnimateToView";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "Haroon M. K. Lodhi",
      designation: "Chairman & CEO",
      image: "/aboutus/Haroon-Lodhi.jpg",
      linkedIn: "https://www.linkedin.com/in/lodhi-haroon-65b8059/",
    },
    {
      name: "Asif Ashfaq",
      designation: "General Manager",
      image: "/aboutus/Asif-Ashfaq.jpg",
      linkedIn: "https://www.linkedin.com/in/asif-ashfaq-69886a11/",
    },
    {
      name: "Waseem Shaukat",
      designation: "Livestock Specialist",
      image: "/aboutus/ww.jpg",
      linkedIn: "https://www.linkedin.com/in/drwaseemshaukat/",
    },
    {
      name: "Mian Waqas Raza",
      designation: "Manager Sales & Marketing",
      image: "/aboutus/waqas1-2.png",
      linkedIn: "https://www.linkedin.com/in/waqas-raza-124a6270/",
    },
    {
      name: "Muhammad Arslan Ahmad",
      designation: "Finance & Accounts",
      image: "/aboutus/Arslan.jpg",
      linkedIn: "https://www.linkedin.com/in/muhammad-arslan-ahmad-41191a18b/",
    },
    {
      name: "Muhammad Rasheed",
      designation: "Program Manager",
      image: "/aboutus/1RASH.jpg",
      linkedIn:
        "https://www.linkedin.com/in/rasheed-muhammad-5073b1106/overlay/photo/",
    },
    {
      name: "Hafiz Wasi Muhammad Khan",
      designation: "Agriculture & Livestock Specialist",
      image: "/aboutus/HW-2.jpg",
      linkedIn:
        "https://www.linkedin.com/in/hafiz-wasi-muhammad-khan-3087bb18/",
    },
    {
      name: "Dr. Naveed Niazi",
      designation: "Business Development",
      image: "/aboutus/1516644796219.jpg",
      linkedIn: "https://www.linkedin.com/in/naveed-niazi-562a7136/",
    },
    {
      name: "Dr. Minahal Mubashar",
      designation: "Project Development",
      image: "/aboutus/dr-minahil-1.jpg",
      linkedIn: "https://www.linkedin.com/in/minahil-mubashar-86302b185/",
    },
  ];

  return (
    <div className="bg-DB px-4 xl:px-40 md:px-20 pt-40 pb-20 flex flex-col gap-20">
      <div className=" flex flex-col gap-12">
        <AnimateToView>
          <h1 className="text-4xl font-medium text-LG">
            "Your Agri Partner, Forever After!"
          </h1>
        </AnimateToView>
        <div className="flex flex-col-reverse lg:flex-row items-center md:items-start gap-8">
          <div className=" ">
            <h2 className="text-3xl font-medium text-indigo-50 mb-3">
              About Us
            </h2>
            <p className="text-gray-200">
              Solve Agri Pak is a leading Dairy Livestock Company in Pakistan,
              dedicated to being your premier partner in the thriving dairy
              industry. With 12 years of experience and a commitment to
              excellence, we provide a range of high-quality products, services,
              training, and consultancy solutions to empower and support dairy
              farmers nationwide.
              <br />
              <br />
              <span className="text-LG">Products:</span> We offer tailored products to meet the specific needs of
              dairy farmers, including Bovine Semen, Compound Feed, Minerals,
              Farm Mechanized Machinery, TMR Wagons, and Hygiene Solutions. Our
              products enable clients to achieve optimal productivity and
              profitability on their farms.
              <br />
              <br />
              <span className="text-LG">Services:</span> Our comprehensive services cover animal health
              management, nutrition consulting, breeding assistance, and farm
              management solutions. We prioritize the well-being of farmers,
              employing the latest practices to ensure farm productivity and
              longevity.
              <br />
              <br />
              <span className="text-LG">Training and Consultancy:</span> We provide training and consultancy
              services to enhance farmers' skills and improve farm operations.
              Through workshops, seminars, and personalized consultations, we
              cover topics such as animal husbandry, feeding practices, disease
              management, and farm management techniques.
              <br />
              <br />
              <span className="text-LG">Project Development:</span> In addition to our core offerings, we also
              specialize in project development for the dairy industry. We
              provide expertise in setting up dairy farms, establishing
              efficient processes, and implementing best practices. Our goal is
              to support the development of successful dairy projects that
              contribute to the growth and prosperity of the industry.
              <br />
              <br />
              At Solve Agri Pak, we are committed to fostering a thriving dairy
              industry in Pakistan. We deliver top-quality products,
              comprehensive services, and expert training and consultancy
              solutions to support the growth and success of dairy farms.
              Partner with us to unlock the full potential of your dairy farm.
              Contact us today to learn more about how we can assist you in
              achieving your goals.
              <br />
              <br />
              Solve Agri Pak, Your Agri Partner forever after.
            </p>
          </div>
          {/* <div className="w-full  h-full items-center justify-center">
            <img src="/aboutus/img.jpg" alt="" className="w-full min-w-[320px]" />
          </div> */}
        </div>
        {/* <AnimateToView>
          <p className="mt-10 text-indigo-50">
            What started as a knowledge transfer organization in 2010, with a
            diverse team of professionals having decades of experience, has now
            evolved as one of the most dynamic and trustworthy agribusiness
            partners in the industry having the most diverse portfolio. Today,
            Solve Agri Pak enjoys the status of a highly reputed solution
            provider in the industry with a wide range of products and services,
            representing some of the finest brands of the world, for all tiers
            of livestock & dairy farmers. Solve Agri Pak offers workable and
            sustainable solutions designed to cater to the needs of all
            stakeholders of the dairy, livestock and related agriculture sectors
            of Pakistan and beyond. We provide a range of products and services
            to public and private businesses looking for solutions to increase
            productivity, minimize costs, increase profit margins, alleviate
            poverty and develop infrastructure.
          </p>
        </AnimateToView>
        <AnimateToView>
          <p className="mt-10 text-indigo-50">
            Our uniqueness lies in providing the right combination of
            high-quality products and adequate knowledge backed with a high
            level of advisory services to ensure that our clients achieve
            maximum advantage of our offerings. The company provides
            consultancy, training, equipment, product supplies and community
            development services for the agribusiness sectors.
          </p>
        </AnimateToView> */}
      </div>

      <div className="h-0.5 w-1/2 bg-LG self-center" />

      <div className="flex flex-col gap-12">
  <h2 className="text-center text-3xl font-medium text-LG">
    Message from the chairman
  </h2>
  <div className="w-full flex flex-col lg:flex-row gap-12">
    <AnimateToView className="w-full flex flex-col items-center justify-center">
      <div className="relative h-[260px] w-[260px] border p-2 overflow-hidden">
        {/* Chairman's Image */}
        <img
          src="/aboutus/chairman.png"
          alt="chairman"
          className="w-full h-full object-cover"
        />

        {/* LinkedIn Icon inside the image at the bottom-right corner */}
        <a
          href="https://www.linkedin.com/in/lodhi-haroon-65b8059/"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 right-4 bg-LG p-2 hover:bg-white rounded-full shadow-lg"
        >
          <FaLinkedin className="text-2xl text-white hover:text-LG transition-colors duration-300" />
        </a>
      </div>

      {/* Chairman's Details */}
      <div className="flex flex-col items-center justify-center text-white mt-4">
        <p className="text-xl font-medium text-center">Haroon M. K. Lodhi</p>
        <p className="text-center text-LG text-sm">Chief Executive Officer</p>
      </div>
    </AnimateToView>

    <AnimateToView>
      <p className="w-full text-white text-center lg:text-start">
        Welcome to Solve Agri Pak! Our mission is to provide customized
        solutions for Livestock & Agriculture Value-added Enterprises. We are
        committed to the success of dairy, livestock, and agribusinesses.
        <br />
        <br />
        At Solve Agri Pak, we prioritize serving farmers, value chain players,
        processors, and consumers in the agribusiness sector. Our consultancy
        services support farm establishment, management, and value-added product
        development, while our agronomy support focuses on livestock farming.
        <br />
        <br />
        Through our Solve Agri & Dairy Institute (SADI), we offer comprehensive
        training and capacity-building services. This empowers livestock and
        dairy farmers, professionals, and agribusiness entrepreneurs with the
        latest techniques and skills.
        <br />
        <br />
        Our unique strength lies in our blend of local expertise and
        international exposure, earning the trust of renowned clients.
        <br />
        <br />
        At Solve Agri Pak, we are passionate about serving our clients. Together,
        we will drive the growth and success of the livestock and dairy farming
        industry.
        <br />
        <br />
        Thank you for choosing Solve Agri Pak.
        <br />
        <br />
        Best regards,
        <br />
        <br />
        <span className="text-LG font-medium">Haroon M. K. Lodhi</span>
      </p>
    </AnimateToView>
  </div>
</div>


      <div className="h-0.5 w-1/2 bg-LG self-center" />

      <div className="flex flex-col items-center justify-center xl:px-40">
        <AnimateToView className="flex text-white flex-col mb-10">
          <h2 className="text-3xl font-medium text-center">Our Core Team</h2>
          <h3 className="mt-2">A winning team; Our recipie for success</h3>
        </AnimateToView>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 justify-between gap-16">
  {team.map((member, index) => (
    <AnimateToView
      key={index}
      className="flex flex-col justify-center items-center"
    >
      {/* Parent div for image and LinkedIn icon with relative positioning */}
      <div className="relative w-full overflow-hidden">
        <img
          src={member.image}
          className="w-full h-full object-contain"
          alt={member.name}
        />

        {/* LinkedIn icon positioned at the bottom-right corner */}
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 right-4 bg-LG hover:bg-white p-2 rounded-full shadow-lg"
        >
          <FaLinkedin className="text-2xl text-white hover:text-LG transition-colors duration-300" />
        </a>
      </div>

      {/* Text content for the team member */}
      <div className="flex flex-col items-center justify-center text-white mt-4">
        <h2 className="text-xl font-medium text-center">{member.name}</h2>
        <p className="text-center">{member.designation}</p>
      </div>
    </AnimateToView>
  ))}
</div>

      </div>
    </div>
  );
};

export default AboutUs;
