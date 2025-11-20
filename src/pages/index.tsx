import { ExamGrid } from "@/components/ExamGrid";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/navbar";
export default function index() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <ExamGrid />
        <Footer />
      </main>
    </div>
  );
}
