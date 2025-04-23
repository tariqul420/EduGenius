"use client"; // শুধু app directory এর জন্য, pages ব্যবহার করলে এটা লাগবে না
import Image from "next/image";
import Head from "next/head";

const partners = [
  {
    name: "Google for Education",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    description: "Empowering digital classrooms through Google Workspace & online tools.",
    link: "https://edu.google.com/"
  },
  {
    name: "Microsoft Learn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    description: "A proud collaborator bringing Microsoft-based learning into EduGenius.",
    link: "https://learn.microsoft.com/"
  },
  {
    name: "Coursera Partner",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Coursera_logo.svg",
    description: "Together we bring professional certifications from global universities.",
    link: "https://www.coursera.org/"
  },
  {
    name: "Udemy for Business",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Udemy_logo.svg",
    description: "Providing thousands of industry-standard courses to our users.",
    link: "https://business.udemy.com/"
  },
];

const PartnersPage = () => {
  return (
    <>
      <Head>
        <title>Partners & Collaborators | EduGenius</title>
      </Head>
      <section className="px-5 py-10 md:px-10 lg:px-20">
        <h1 className="text-3xl font-bold text-center mb-8">
          Our <span className="text-main">Partners & Collaborators</span>
        </h1>
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
          At EduGenius, we are proud to work alongside global leaders in education and technology to
          deliver the most relevant, up-to-date, and practical learning experiences.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl shadow hover:shadow-md transition duration-300 bg-white dark:bg-dark-bg p-5 border hover:border-main"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <h2 className="text-xl font-semibold">{partner.name}</h2>
              </div>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
                {partner.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default PartnersPage;
