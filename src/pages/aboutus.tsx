import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from "next/image";


const team = [
  
  {
    name: "Aaliyah Al‑Fahim",
    title: "Chief Growth Officer",
    location: "Dubai, UAE",
    avatar: "/images/aliyah.jpeg", // replace with real image path
  },
  {
    name: "Rufus Bright",
    title: "Founder & CEO",
    location: "Bangalore, India",
    avatar: "/images/Rufus_Bright.jpg", // replace with real image path
  },
  {
    name: "Priya Malhotra",
    title: "Lead Full‑Stack Engineer",
    location: "Mumbai, India",
    avatar: "/images/Priya.jpeg", // replace with real image path
  },
];


export default function AboutUsPage() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F1F9FF] via-[#ECF7FF] to-[#D8ECFF] dark:from-[#00171F] dark:via-[#012C46] dark:to-[#003459] py-28 mt-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="mb-8 text-5xl font-extrabold text-richblack dark:text-white">About Alina Popova</h1>
          <p className="mb-12 text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            At Alina Popova, we believe in empowering creators, businesses, and influencers to scale their social presence and monetize their passion. Our mission is to provide cutting-edge digital solutions that drive growth and engagement, transforming dreams into impactful online brands.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-white py-24 dark:bg-rich-black">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-4xl font-extrabold text-center text-richblack dark:text-white">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center">
            To empower individuals and brands to achieve their full potential through data-driven strategies, innovative tools, and personalized support, fostering lasting connections and impactful growth in the digital world.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-br from-[#ECF7FF] via-[#D8ECFF] to-[#C0E4FF] dark:from-[#012C46] dark:via-[#003459] dark:to-[#00171F] py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-8 text-4xl font-extrabold text-richblack dark:text-white">Meet Our Team</h2>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="relative h-40 w-40 rounded-full overflow-hidden shadow-lg mb-6">
                <Image
                  src={member.avatar}
                  alt={`${member.name} avatar`}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <h3 className="text-xl font-bold text-richblack dark:text-white">{member.name}</h3>
              <p className="text-cerulean dark:text-platinum">{member.title}</p>
              <p className="text-gray-700 dark:text-gray-400">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Call to Action */}
      <section className="bg-white py-24 dark:bg-rich-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-8 text-4xl font-extrabold text-richblack dark:text-white">Ready to Elevate Your Digital Journey?</h2>
          <p className="mb-12 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Join our community of ambitious creators, businesses, and influencers. Let's grow together.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-[#FCA311] px-14 py-4 text-lg font-bold text-white shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-[#FFBA33] focus:outline-none focus:ring-4 focus:ring-[#FCA311]/50"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
