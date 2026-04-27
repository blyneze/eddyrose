import HeroSlider from "@/components/public/HeroSlider";
import BelongSection from "@/components/public/BelongSection";
import CurriculumGrid from "@/components/public/CurriculumGrid";
import SchoolStats from "@/components/public/SchoolStats";
import BeAnything from "@/components/public/BeAnything";
import InstagramFeed from "@/components/public/InstagramFeed";
import AcademyStages from "@/components/public/AcademyStages";

export default function PublicHome() {
  return (
    <>
      <HeroSlider />
      <BelongSection />
      <CurriculumGrid />
      <SchoolStats />
      <BeAnything />
      <InstagramFeed />
      <AcademyStages />
    </>
  );
}
