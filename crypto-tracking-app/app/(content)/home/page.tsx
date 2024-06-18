import Features from "@/app/components/features";
import HeroSection from "@/app/components/heroSection";

const HomePage = () => {
  return (
    <section className="row">
      <div className="col card">
        <HeroSection />
        <Features />
      </div>
    </section>
  );
};

export default HomePage;
