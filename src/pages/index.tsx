// src/pages/index.tsx
import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import SegmentButtons from '../components/SegmentButtons';
import PricingGrid from '../components/PricingGrid';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <>



      <Head>
        <title>Alina Popova | Scale Your Social Presence</title>
        <meta
          name="description"
          content="Alina Popova helps Beginners, Businesses, and Content Creators unlock explosive social growth and monetize their passion through tailored strategies."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <Hero />
        <SegmentButtons />
        <PricingGrid />
        <Features />
        <Testimonials />
      </Layout>
    </>
  );
}