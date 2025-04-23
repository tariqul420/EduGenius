"use client";

import Image from "next/image";
import { useState } from "react";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close on click
  };

  const faqData = [
    {
      question: "What is EduGenius?",
      answer:
        "EduGenius is an online learning platform designed to offer a wide variety of courses, resources, and tools for students of all levels. Whether you're looking to enhance your skills or explore new fields, EduGenius has the perfect resources to support your educational journey.",
    },
    {
      question: "How can I sign up for EduGenius?",
      answer:
        "Signing up for EduGenius is easy! Simply click the 'Sign Up' button on the homepage, fill out the registration form with your details, and you're ready to get started! You'll have access to free and premium learning materials once you're registered.",
    },
    {
      question: "What courses does EduGenius offer?",
      answer:
        "EduGenius offers a variety of courses ranging from coding and design to business and soft skills development. We have something for everyone, whether you're a beginner or an expert looking to upgrade your skills.",
    },
    {
      question: "Do I need to pay for all the courses?",
      answer:
        "No, EduGenius offers both free and paid courses. You can explore numerous free resources, and if you want access to advanced content or certifications, you can opt for the paid plans.",
    },
    {
      question: "Can I access EduGenius on mobile devices?",
      answer:
        "Yes! EduGenius is fully optimized for mobile use. You can access your courses, track progress, and interact with the platform directly from your smartphone or tablet.",
    },
    {
      question: "How do I start a course?",
      answer:
        "Once you sign up or log in, browse our course catalog, choose the course you're interested in, and click on the 'Enroll' button. Some courses may require a payment or subscription, while others are free to access immediately.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes, EduGenius offers certificates for many of our courses, especially those that are paid or part of a learning path. After completing a course or program, you'll receive a certificate that you can add to your resume or LinkedIn profile.",
    },
    {
      question: "Can I get help if I have questions during a course?",
      answer:
        "Absolutely! EduGenius offers various support options, including course discussion forums, email support, and live chat. If you're having trouble, don’t hesitate to reach out, and we'll assist you.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "You can easily update your profile by logging into your account and visiting your profile settings. From there, you can update your personal information, profile picture, and preferences.",
    },
    {
      question: "What happens if I forget my password?",
      answer:
        "If you forget your password, you can click on the 'Forgot Password?' link on the login page. You’ll be prompted to enter your email address to receive a password reset link.",
    },
    {
      question: "How can I cancel my subscription?",
      answer:
        "If you'd like to cancel your subscription, go to the 'Subscription' section of your profile settings. From there, you can manage your plan and cancel it if necessary.",
    },
    {
      question: "How do I get in touch with EduGenius support?",
      answer:
        "You can contact our support team through the 'Contact Us' page on our website or by emailing us directly at support@edugenius.com. We're happy to assist with any inquiries you may have!",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-main mb-12 text-center text-4xl font-bold">
        Frequently Asked Questions (FAQ)
      </h1>
      <div className="grid grid-cols-4">
        <div className="col-span-4 lg:col-span-2">
          <Image
            src="/FAQs-cuate.png"
            alt="Hero Image"
            width={600}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="col-span-4 space-y-8 lg:col-span-2">
          {faqData.map((faq, index) => (
            <div key={index} className="space-y-5">
              <div
                onClick={() => toggleAnswer(index)}
                className="hover:border-main dark:bg-dark-bg flex cursor-pointer items-center justify-between rounded-lg border-2 border-gray-300 bg-white px-5 shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:text-white"
              >
                <h2 className="text-gray-800 dark:text-white">
                  {faq.question}
                </h2>
                <span className="text-main">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="dark:text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
