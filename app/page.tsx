import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Bento from "@/components/Bento";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import PresentedBy from "@/components/PresentedBy";
import Lineup from "@/components/Lineup";
import Register from "@/components/Register";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Bento />
      <Timeline />
      <Gallery />
      <PresentedBy />
      <Lineup />
      <Register />
      <Faq />
      <Footer />
    </main>
  );
}
