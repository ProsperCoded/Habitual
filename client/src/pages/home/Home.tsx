import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <Hero />
    </main>
  );
}
